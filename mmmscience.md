# Marketing Mix Modeling (MMM) Science Documentation
# Watchtower ML Implementation

**Version:** 1.0
**Last Updated:** 2025-10-09

---

## Table of Contents

1. [Overview](#overview)
2. [Core Architecture](#core-architecture)
3. [Mathematical Foundations](#mathematical-foundations)
4. [Hierarchical Embeddings](#hierarchical-embeddings)
5. [Media Transformation & Adstock](#media-transformation--adstock)
6. [Saturation Curves](#saturation-curves)
7. [Pricing & Price Elasticity](#pricing--price-elasticity)
8. [Mixed Effects & External Factors](#mixed-effects--external-factors)
9. [Regularization & Economic Priors](#regularization--economic-priors)
10. [Training & Optimization](#training--optimization)
11. [Implementation Details](#implementation-details)

---

## Overview

The Watchtower ML library implements a sophisticated, differentiable Marketing Mix Model (MMM) using TensorFlow. The model is designed to:

- Decompose sales/revenue into various contributing factors (media, pricing, seasonality, external factors)
- Estimate ROI curves for marketing investments with diminishing returns
- Model carryover/adstock effects for advertising
- Handle hierarchical data structures (brands, products, regions)
- Incorporate economic priors to guide model learning
- Support counterfactual scenario analysis and budget optimization

### Key Design Principles

1. **Differentiable Programming**: All transformations are implemented as differentiable TensorFlow operations, enabling gradient-based optimization
2. **Hierarchical Embeddings**: Coefficients are learned as functions of hierarchical dimensions (e.g., brand, product, channel)
3. **Economic Priors**: Regularization terms enforce economically sensible behavior (e.g., concave saturation curves, positive ROI)
4. **Modular Architecture**: Components are composable layers that can be mixed and matched
5. **GPU Optimization**: Models are optimized for GPU training with efficient tensor operations

---

## Core Architecture

### Model Structure

The MMM is structured as follows:

```
EconomicNetwork
├── Impacts Layer (BaseImpacts)
│   ├── ROICurve (media investments)
│   │   ├── CurveCombiner (saturation curves)
│   │   │   ├── SigmoidCurve
│   │   │   ├── ConcavePolyCurve
│   │   │   ├── PiecewiseLinearCurve
│   │   │   └── MonoConcaveCurve
│   │   └── BetaGammaDecay (adstock)
│   ├── Pricing (price elasticity)
│   ├── Distribution (distribution effects)
│   ├── MonotonicPositiveUnbounded (mixed effects)
│   │   ├── global_me
│   │   ├── weather_me
│   │   ├── temperature_me
│   │   └── industry_trends
│   ├── LeadLagWrapper (holiday effects)
│   └── PeriodicSignal (seasonality)
└── Linear Baseline
```

### Network Flow

The model processes inputs through the following stages:

1. **Data Encoding**: Raw features are encoded into hierarchical indices and continuous values
2. **Hierarchical Lookup**: Indices are used to retrieve embeddings from learned hierarchical parameters
3. **Feature Transformation**: Continuous inputs go through transformation layers (curves, decay functions)
4. **Impact Calculation**: Each factor produces an additive or multiplicative impact
5. **Aggregation**: Impacts are combined with baseline to produce final predictions
6. **Loss Computation**: Multiple loss terms (prediction error, regularization, economic priors) are combined

---

## Mathematical Foundations

### Model Equation

The general form of the MMM can be expressed as:

$$
y_t = \text{baseline}_t \times \prod_{j} \text{mult}_j(x_{jt}) + \sum_{i} \text{add}_i(x_{it}) + \epsilon_t
$$

Where:
- $y_t$ is the target variable (e.g., sales, revenue) at time $t$
- $\text{baseline}_t$ is a learned baseline (e.g., from trend, seasonality)
- $\text{mult}_j(x_{jt})$ are multiplicative effects (e.g., pricing)
- $\text{add}_i(x_{it})$ are additive effects (e.g., media impacts)
- $\epsilon_t$ is the residual error

### Smoothing

To reduce noise and improve model stability, both target and signal data are smoothed using Gaussian convolution:

$$
\tilde{y}_t = \sum_{k=-r}^{r} w_k \cdot y_{t-k}
$$

Where $w_k$ are Gaussian weights:

$$
w_k = \exp\left(-\frac{k^2}{2\sigma^2}\right) \bigg/ \sum_{j=-r}^{r} \exp\left(-\frac{j^2}{2\sigma^2}\right)
$$

Parameters:
- Window radius for revenue: configurable (default: 4 weeks)
- Window radius for signals: configurable (default: 4 weeks)
- Standard deviation: $\sigma = \text{radius} / 2$

**Implementation**: `wt_ml/utils/layer_utils.py:rolling_mean()`, line 212

---

## Hierarchical Embeddings

### Concept

Rather than learning separate parameters for each unique entity, the model learns parameters as functions of hierarchical features. This provides:

1. **Parameter Sharing**: Similar entities share information
2. **Regularization**: Natural shrinkage toward hierarchical means
3. **Generalization**: Can extrapolate to unseen combinations
4. **Interpretability**: Parameters vary smoothly across hierarchy

### Mathematical Formulation

For a hierarchy with categorical features $c_1, c_2, \ldots, c_k$ and continuous features $x_1, \ldots, x_m$:

$$
\theta(c_1, \ldots, c_k, x_1, \ldots, x_m) = b + \sum_{i=1}^{k} \mathbf{W}_{c_i}^{(i)} + \sum_{j=1}^{m} x_j \cdot \mathbf{V}^{(j)}
$$

Where:
- $b$ is a bias term
- $\mathbf{W}_{c_i}^{(i)}$ is an embedding vector for category $c_i$ in hierarchy level $i$
- $\mathbf{V}^{(j)}$ is a weight vector for continuous feature $j$

### Regularization

The hierarchical embeddings are regularized to control their magnitude:

$$
\mathcal{L}_{\text{hier}} = \sum_{i} \lambda_i \cdot \left(\frac{\|\mathbf{W}^{(i)}\|_2^2}{\sigma_i^2 \cdot n_i} - 1\right)^2
$$

Where:
- $\sigma_i$ is the desired standard deviation for hierarchy level $i$
- $n_i$ is the number of unique categories in level $i$
- $\lambda_i$ is the regularization weight for level $i$

**Key Parameters**:
- `desired_stddev`: Target standard deviation (default: 0.10)
- `use_inv_sqrt`: Scale stddev by $1/\sqrt{n_i}$ (default: True)
- `use_l2_squared`: Use squared ratio instead of absolute (default: False)
- `raw_variable_scale`: Learning rate scale for embeddings (default: 1.0)

**Implementation**: `wt_ml/layers/hier_embedding.py:HierarchicalEmbedding`, line 33

---

## Media Transformation & Adstock

### Adstock Effect

Marketing activities have both immediate and delayed effects. The **adstock** (carryover) effect models how advertising impact decays over time.

### Beta-Gamma Decay Model

The model uses a sophisticated Beta-Gamma decay formulation:

$$
\text{impact}_t = \alpha_t + \sum_{\tau=1}^{L} \beta \cdot \gamma^{\tau} \cdot \alpha_{t-\tau}
$$

Where:
- $\alpha_t$ is the instant impact at time $t$
- $\beta \in [0, 1]$ controls the initial decay rate
- $\gamma \in [0, 1]$ controls the exponential decay factor
- $L$ is the decay length (default: 16 weeks)

### Total Impact Multiplier

To account for the total impact over all periods, we compute:

$$
M = 1 + \beta \cdot \frac{1 - \gamma^L}{1 - \gamma}
$$

This multiplier is applied to the instant impact to get the total long-term impact:

$$
\text{impact}_{\text{total},t} = M \cdot \alpha_t
$$

### Parameter Constraints

Both $\beta$ and $\gamma$ are learned through hierarchical embeddings and constrained:

**Beta (Initial Decay)**:
$$
\beta = \sigma(\text{emb}_\beta) \cdot (\beta_{\max} - \beta_{\min}) + \beta_{\min}
$$

Where:
- $\beta_{\min}$: default 0.01, range [0.00, 1.0]
- $\beta_{\max}$: default 1.0, range [$\beta_{\min}$, 1.0]

**Gamma (Exponential Decay)**:

For $\gamma_{\max} < 1$:
$$
\gamma = 1 - \frac{1}{T(\text{emb}_\gamma) \cdot \left(\frac{1}{1-\gamma_{\max}} - \frac{1}{1-\gamma_{\min}}\right) + \frac{1}{1-\gamma_{\min}}}
$$

For $\gamma_{\max} = 1$:
$$
\gamma = 1 - \frac{1}{\text{softplus}(\text{emb}_\gamma) + \frac{1}{1-\gamma_{\min}}}
$$

Where:
- $\gamma_{\min}$: default 0.01, range [0.00, 1.0]
- $\gamma_{\max}$: default 1.0, range [$\gamma_{\min}$, 1.0]
- $T(\cdot)$ is the `transform_softbounded` function

### Efficient Implementation

The cumulative sum is computed efficiently using an exponential moving average:

$$
\text{decayed}_t = \sum_{\tau=0}^{L-1} \beta \cdot \gamma^\tau \cdot \alpha_{t-\tau}
$$

Implemented via:
```python
exp_moving_avg(impact_instant, beta, gamma, decay_length=16)
```

This uses gathering and Einstein summation for GPU efficiency:

$$
\text{decayed} = \text{einsum}(\text{"btd...,b...d->bt..."}, \text{gathered}, \text{decay\_factor})
$$

**Implementation**: `wt_ml/layers/beta_gamma_decay.py:BetaGammaDecay`, line 34

---

## Saturation Curves

Marketing effectiveness exhibits **diminishing returns**: each additional dollar spent generates less incremental impact. The model implements multiple saturation curve options.

### 1. Sigmoid Curve

A smooth S-shaped saturation curve with slow decay at high spends:

$$
f(x) = a \cdot \frac{S(s \cdot x / (a \cdot y_0) + x_0) - y_0}{1 - y_0} + x^p \cdot s_{\text{slow}} \cdot s
$$

Where:
- $S(z) = 1/(1 + e^{-z})$ is the sigmoid function
- $a$ is the asymptote (upper bound)
- $s$ is the initial slope
- $x_0 = 0.7$ is a fixed offset
- $y_0 = S(x_0)$ is the corresponding y-offset
- $p = 0.8$ is the slow decay exponent
- $s_{\text{slow}} = 0.1 \cdot s \cdot y_0$ is the slow decay slope

**Parameters**:
- Asymptote $a$: learned per hierarchy, range [$a_{\min}$, $a_{\max}$]
  - `asymptote_lower_bound`: default 0.4, range [0.0, 1.0]
  - `asymptote_upper_bound`: default 2.4, range [1.0, 4.0]
- Initial slope $s$: learned per hierarchy, range [$s_{\min}$, $s_{\max}$]
  - `slope_lower_bound`: default 0.4, range [0.0, 1.0]
  - `slope_upper_bound`: default 1.9, range [1.0, 4.0]
- Slow decay exponent: `slowdecay_exp` = 0.8, range [0.5, 0.99]
- Slow decay weight: `slowdecay_slope_weight` = 0.1, range [0.0, 1.0]

The two terms (curvy impact + slow decay) ensure:
1. **Curvy Impact**: Captures sharp diminishing returns at low spends
2. **Slow Decay Impact**: Prevents complete saturation at very high spends

**Implementation**: `wt_ml/layers/sigmoid_curve.py:SigmoidCurve`, line 31

### 2. Concave Polynomial Curve

A simple power-law saturation curve:

$$
f(x) = (x + \epsilon)^p
$$

Where:
- $p \in [p_{\min}, 1.0]$ is the exponent (default $p_{\min} = 0.1$)
- $\epsilon$ is a small constant to avoid numerical issues

Properties:
- Concave: $f''(x) < 0$ for $0 < p < 1$
- Monotonic increasing: $f'(x) > 0$
- Passes through origin (approximately)

**Parameters**:
- `min_exponent`: default 0.1, range [0.01, 0.99]

**Implementation**: `wt_ml/layers/concave_poly_curve.py:ConcavePolyCurve`, line 20

### 3. Piecewise Linear Curve

A flexible piecewise linear curve with learned breakpoints:

$$
f(x) = \sum_{i=0}^{n} s_i \cdot \min(\max(x - p_i, 0), p_{i+1} - p_i)
$$

Where:
- $p_0, p_1, \ldots, p_n$ are percentile breakpoints (geometrically spaced)
- $s_i$ is the slope in segment $i$
- Slopes decay: $s_{i+1} = d_i \cdot s_i$ where $d_i \in [d_{\min}, d_{\max}]$

**Parameters**:
- `num_percentiles`: Number of breakpoints (default: 15, range [1, 31])
- Percentiles: geometrically spaced from 0.01 to 10.0
- Initial slope: learned, range [0.01, $s_{\max}$]
  - `initial_slope_range`: default 1.5, range [1.0, 10.0]
- Decay factors $d_i$: learned, range [$d_{\min}$, $d_{\max}$]
  - `d_min_value`: default 0.3, range [0.0, 0.98]
  - `d_max_value`: default 0.98, range [$d_{\min}$, 1.0]

**Implementation**: `wt_ml/layers/piecewise_linear_curve.py:PiecewiseLinearCurve`, line 25

### 4. Monotonic Concave Neural Network

A deep learning approach using monotonic neural networks:

$$
f(x) = h_3(h_2(h_1(x))) - h_3(h_2(h_1(0)))
$$

Where each $h_i$ is a monotonic increasing layer with non-negative weights and concave activation.

**Parameters**:
- `hidden_dims`: Number of hidden units (default: 4, choices: 2, 4, 8, 16)
- `activation`: Activation function (default: "softplus", choices: softplus, relu, elu, lrelu, smu)

The monotonic constraint is enforced by:
1. Non-negative weights: $W \geq 0$
2. Concave activation functions
3. Subtracting the value at zero to ensure $f(0) = 0$

**Implementation**: `wt_ml/layers/mono_concave_curve.py:MonoConcaveCurve`, line 8

### Curve Combiner

The `CurveCombiner` layer selects and applies the appropriate saturation curve based on hyperparameters. It supports all four curve types above.

---

## Pricing & Price Elasticity

### Price Elasticity Model

The pricing layer models how price changes affect sales volume and revenue. It uses a multiplicative power-law form:

$$
\text{volume}(p) = \frac{M}{(p + o)^e}
$$

Where:
- $p$ is the mean-normalized price
- $o$ is the offset parameter (learned)
- $e$ is the exponent parameter (learned)
- $M = (1 + o)^e$ is a normalization constant

The normalization ensures $\text{volume}(1) = 1$, i.e., no effect at average price.

### Revenue Impact

The revenue impact is:

$$
\text{revenue}(p) = \text{volume}(p) \times p = \frac{M \cdot p}{(p + o)^e}
$$

This multiplicative factor scales the baseline and all other additive impacts.

### Split Revenue Components (Optional)

When `split_revenue_components=True`, the model separates:

1. **Volume Effect**: How price affects quantity sold
   $$
   \text{volume\_impact} = \frac{M}{(p + o)^e}
   $$

2. **Conversion Effect**: Converting volume to revenue
   $$
   \text{conversion\_impact} = p
   $$

Both are tracked as separate signals for interpretability.

### Parameter Constraints

**Offset** $o$:
$$
o = \text{softplus}(\text{emb}_o \cdot s_o) + 0.01
$$

Where:
- `pre_softplus_scale` $s_o$: default 10.0
- Ensures $o > 0.01$ for numerical stability

**Exponent** $e$:
$$
e = S(\text{emb}_e / c_e) \cdot e_{\text{range}} + 1
$$

Where:
- $S(\cdot)$ is `monotonic_sigmoid`
- `exponent_compression_factor` $c_e$: default 4.0
- `exponent_expansion_factor` $e_{\text{range}}$: default 4.0
- Range: $e \in [1, 5]$ by default

The exponent $e > 1$ ensures that price increases reduce revenue (elastic demand).

### Initialization

The bias is initialized to create a sensible starting state:
```python
bias_initializer = np.tile([[0.6, 0.6]], (n_instances, 1))
```

This roughly corresponds to:
- $o \approx 2.0$
- $e \approx 2.0$

Which gives a price elasticity curve where doubling price roughly halves revenue.

**Implementation**: `wt_ml/layers/pricing.py:Pricing`, line 34

---

## Mixed Effects & External Factors

### Monotonic Positive Unbounded Layer

Many external factors (weather, economic indicators, trends) have monotonic effects on sales. The model uses a `MonotonicPositiveUnbounded` layer to model these.

### Transformation

For input signal $x$, the impact is:

$$
\text{impact}(x) = \theta(x) \cdot x
$$

Where $\theta(x)$ is a coefficient learned via hierarchical embedding.

The layer ensures:
1. **Monotonicity**: Impact increases (or decreases) monotonically with $x$
2. **Positivity**: Coefficients are constrained to be positive (or negative) as appropriate
3. **Unbounded**: No artificial ceiling on the effect size

### Examples

**Global Economic Effects** (`global_me`):
- GDP growth, unemployment, consumer confidence
- Learned coefficients quantify sensitivity to each indicator

**Weather Effects** (`weather_me`, `temperature_me`):
- Rainfall, temperature deviations
- Beer sales often increase with hot weather

**Industry Trends** (`industry_national_trend_me`, `industry_regional_trend_me`):
- Overall market growth/decline
- Captures rising tide / falling tide effects

**Price Ratio** (`price_ratio`):
- Relative price vs. competitors
- Captures share-stealing / share-loss effects

### Holiday Effects with Lead/Lag

The `LeadLagWrapper` extends mixed effects to capture anticipation and aftermath:

$$
\text{impact}_t = \sum_{\tau=-L}^{L} w_\tau \cdot \theta(x_{t-\tau}) \cdot x_{t-\tau}
$$

Where $w_\tau$ are smoothing weights (e.g., Gaussian).

This captures:
- **Lead**: Consumers stock up before holidays
- **Lag**: Post-holiday spending decline

**Implementation**: Mixed effects in `wt_ml/layers/` (various files)

---

## Regularization & Economic Priors

The model incorporates several regularization terms to ensure economically sensible behavior.

### 1. Hierarchical Regularization

As described in the [Hierarchical Embeddings](#hierarchical-embeddings) section, this regularizes embedding magnitudes:

$$
\mathcal{L}_{\text{hier}} = \lambda_{\text{hier}} \sum_{i} \text{penalty}_i \cdot \left(\frac{\|\mathbf{W}^{(i)}\|_2^2}{\sigma_i^2 \cdot n_i} - 1\right)^2
$$

**Parameter**: `hier_lambda` (default: 1e-4, range [1e-6, 1e-2])

### 2. ROI Curve Shape Regularization

Encourages saturation curves to have the desired shape (concave, monotonic increasing).

**Linear Section Loss**:

Encourages a nearly linear initial section:

$$
\mathcal{L}_{\text{linear}} = \sum \frac{f'(0) - f'(x_{\min})}{f'(0) + \epsilon}
$$

**Curvy Section Loss**:

Encourages diminishing returns at high spends:

$$
\mathcal{L}_{\text{curvy}} = \sum \left(1 - \frac{f'(x_{\max}) - f'(0)}{f'(0) + \epsilon}\right)
$$

Where:
- $x_{\min} = \text{investment\_scale} / 4$
- $x_{\max} = \text{investment\_scale} \times 2$

Derivatives are computed using `tf.GradientTape`.

**Parameter**: `curve_shape_lambda` (default: 0.1, range [1e-10, 1e4])

**Implementation**: `wt_ml/layers/roi_curve.py:ROICurve.__call__()`, line 259

### 3. Overall ROI Regularization

Encourages the average ROI across all observed data points to be near a target value (default 1.1):

$$
\mathcal{L}_{\text{roi}} = \lambda_{\text{roi}} \sum_{b,v} \left[\log\left(\frac{\sum_t \text{impact}_{btv}}{\sum_t \text{spend}_{btv} + \epsilon}\right) - \log(1.1)\right]^2
$$

This prevents the model from learning unrealistic ROIs (e.g., 100x returns or negative returns).

**Parameters**:
- `overall_roi_lambda`: default 0.01, range [1e-5, 1e1]
- Target ROI: 1.1 (10% return)

**Implementation**: `wt_ml/layers/roi_curve.py:ROICurve.__call__()`, line 296

### 4. Soft Bound Regularization

The `transform_softbounded` function encourages learned parameters to stay within reasonable bounds:

$$
\mathcal{L}_{\text{soft}} = \sum \left[\text{softplus}\left(\frac{|x - \mu| - \delta}{\text{scale}}\right)\right]^2
$$

Where:
- $\mu = (\text{max} + \text{min}) / 2$ is the midpoint
- $\delta = \mu - \text{min}$ is the threshold
- scale: controls the softness (default: 0.1)

This creates a loss of 0 when $x \in [\text{min}, \text{max}]$ and a smooth penalty outside this range.

**Implementation**: `wt_ml/utils/layer_utils.py:transform_softbounded()`, line 106

### 5. Auxiliary Loss Scaling

All auxiliary losses (regularization, priors) are scaled by a global factor:

$$
\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{pred}} + \lambda_{\text{hier}} \mathcal{L}_{\text{hier}} + \lambda_{\text{aux}} \sum_{i} \mathcal{L}_{\text{aux},i}
$$

**Parameter**: `aux_lambda` (default: 1.0, range [1e-3, 1.0])

---

## Training & Optimization

### Loss Function

The total loss combines multiple components:

$$
\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{pred}} + \lambda_{\text{hier}} \mathcal{L}_{\text{hier}} + \lambda_{\text{aux}} \sum_{i} w_i \mathcal{L}_{\text{aux},i}
$$

Where:
- $\mathcal{L}_{\text{pred}}$: Prediction error (MSE, RMSE, MAPE, etc.)
- $\mathcal{L}_{\text{hier}}$: Hierarchical regularization
- $\mathcal{L}_{\text{aux},i}$: Auxiliary losses (curve shape, ROI, soft bounds, etc.)
- $w_i$: Per-loss multipliers

### Optimizer

The model uses Adam optimizer with learning rate scheduling.

**Typical Hyperparameters**:
- Initial learning rate: 1e-3 to 1e-2
- Learning rate decay: exponential or step-based
- Gradient clipping: applied to prevent exploding gradients

### Smoothing

Data smoothing is applied during training:

**Revenue Smoothing**:
- Window size: $2 \times \text{radius} + 1$ (default: 9 weeks)
- Gaussian weights: $w_k \propto \exp(-k^2 / (2\sigma^2))$
- $\sigma = \text{radius} / 2$ (default: 2.0)

**Signal Smoothing**:
- Same as revenue smoothing
- Applied to all input signals

The smoothed target $\tilde{y}$ is used during training, but the original $y$ is used for inference.

**Implementation**: `wt_ml/networks/economic_network.py:EconomicNetwork`, line 316

### Masking

The model supports flexible masking:

1. **No Prediction Mask**: Excludes certain time periods from prediction (e.g., future forecast periods)
2. **No Train Mask**: Excludes certain time periods from training loss (e.g., outliers, data quality issues)
3. **Feature Masks**: Masks specific features/signals

Masks are binary tensors (0 = exclude, 1 = include) applied during loss computation.

### Checkpointing

The model saves checkpoints during training:

```
model_dir/
├── checkpoints/
│   ├── initial_checkpoint/
│   ├── checkpoint_100/
│   ├── checkpoint_200/
│   └── ...
├── model.index
├── model.data-00000-of-00001
└── trackers.pkl
```

Checkpoints include:
- Model weights
- Optimizer state
- Tracked metrics/curves

### Walk-Forward Optimization (WFO)

For time-series validation, the model supports walk-forward optimization:

1. Train on historical data up to time $T$
2. Forecast for $T+1$ to $T+k$
3. Slide the window forward
4. Repeat

This mimics production deployment and prevents look-ahead bias.

**Implementation**: `wt_ml/cml/scripts/run_wfo.py`

---

## Implementation Details

### Numerical Stability

The implementation includes several tricks for numerical stability:

**1. Softplus Overflow/Underflow Protection**

The standard `tf.nn.softplus` can overflow for large positive inputs and underflow for large negative inputs. The implementation uses a custom `softplus`:

$$
\text{softplus}(x) = \begin{cases}
x + \log(1 + e^{-x}) & \text{if } x > 0 \\
\log(1 + e^x) & \text{otherwise}
\end{cases}
$$

Scaled by $N = 2^{16}$ for additional precision on CPU.

**Implementation**: `wt_ml/utils/layer_utils.py:softplus()`, line 32

**2. Monotonic Sigmoid Stability**

Similarly, a custom `monotonic_sigmoid` prevents overflow:

$$
\sigma(x) = \begin{cases}
\frac{N}{N + e^{-x} / N} & \text{if } x \geq 0 \\
1 - \frac{N}{N + e^{x} / N} & \text{otherwise}
\end{cases}
$$

**Implementation**: `wt_ml/utils/layer_utils.py:monotonic_sigmoid()`, line 360

**3. Epsilon Constants**

Small constants are added to denominators to prevent division by zero:

```python
EPSILON = 1e-8  # from wt_core.globals
```

**4. Clipping and Safe Operations**

- `tf.math.divide_no_nan`: Returns 0 instead of NaN for 0/0
- `tf.math.reciprocal_no_nan`: Returns 0 instead of Inf for 1/0
- `clip(x, lo, hi)`: Bounded values

### Efficient Tensor Operations

**1. Exponential Moving Average**

The adstock calculation uses an efficient implementation:

```python
decay_range = tf.range(decay_length)
indices = tf.range(num_time)[:, None] - decay_range
decay_factor = beta[:, None] * gamma[:, None] ** decay_range
gathered = tf.gather(padded_impact, indices, axis=1)
result = tf.einsum("btd...,b...d->bt...", gathered, decay_factor)
```

This avoids explicit loops and leverages tensor operations for GPU efficiency.

**Implementation**: `wt_ml/utils/layer_utils.py:exp_moving_avg()`, line 265

**2. Rolling Mean with Convolution**

When `center=True`, rolling mean uses 1D convolution:

```python
weights = tf.reshape(smoothing_weights, [-1, 1, 1])
smoothed = tf.nn.convolution(
    data * mask, weights, padding="SAME"
) / (tf.nn.convolution(mask, weights, padding="SAME") + EPSILON)
```

**Implementation**: `wt_ml/utils/layer_utils.py:rolling_mean()`, line 212

**3. Einstein Summation**

Complex tensor operations use `tf.einsum` for clarity and efficiency:

```python
# Weighted sum over hierarchical dimensions
result = tf.einsum("c...f,c...->...f", embeddings, weights)
```

### GPU Optimization

The model is designed for efficient GPU training:

1. **Batch Processing**: All operations are vectorized over batches, time, and hierarchical dimensions
2. **TensorFlow XLA**: Computation graphs are compiled for GPU
3. **Mixed Precision**: Supports mixed precision training (FP16/FP32)
4. **HDF5 Data Format**: Inputs are converted to HDF5 for fast GPU loading

### Activation Functions

Several custom and standard activations are used:

- **Softplus**: $\text{softplus}(x) = \log(1 + e^x)$
  - Smooth approximation of ReLU
  - Used for positive constraints
- **Sigmoid**: $\sigma(x) = 1 / (1 + e^{-x})$
  - Used for bounded parameters
- **Monotonic Sigmoid**: Custom stable version of sigmoid
- **ReLU, ELU, LeakyReLU, SMU**: Used in neural network layers

### TensorFlow Extensions

The codebase uses `tf.experimental.ExtensionType` for structured tensors:

```python
class ROICurveInput(tf.experimental.ExtensionType):
    spends: tf.Tensor
    multiplicative_impact: tf.Tensor
    hierarchy: Mapping[str, tf.Tensor]
    mask: Optional[tf.Tensor]
```

This provides:
- Type safety
- Named fields
- Automatic shape inference
- Better error messages

### Trackers and Curve Visualization

The model includes a tracking system for curve visualization:

```python
model.tracked["roicurve"] = make_roi_tracker(...)
model.tracked["price_elasticity"] = make_price_tracker(...)
model.run_all_trackers()  # Evaluates curves at sampled points
```

Trackers evaluate transformations at various input values to visualize:
- ROI curves
- Saturation curves
- Price elasticity curves
- Mixed effect curves

**Implementation**: `wt_ml/networks/economic_network.py:add_curve_trackers()`, line 516

---

## Appendix: Key Equations Reference

### Adstock (Beta-Gamma Decay)

$$
\text{impact}_t = \alpha_t + \sum_{\tau=1}^{L} \beta \cdot \gamma^{\tau} \cdot \alpha_{t-\tau}
$$

$$
M = 1 + \beta \cdot \frac{1 - \gamma^L}{1 - \gamma}
$$

### Sigmoid Saturation

$$
f(x) = a \cdot \frac{S(s \cdot x / (a \cdot y_0) + x_0) - y_0}{1 - y_0} + x^{0.8} \cdot (0.1 \cdot s \cdot y_0)
$$

### Price Elasticity

$$
\text{revenue}(p) = \frac{(1 + o)^e \cdot p}{(p + o)^e}
$$

### Hierarchical Embedding

$$
\theta(c_1, \ldots, c_k, x_1, \ldots, x_m) = b + \sum_{i=1}^{k} \mathbf{W}_{c_i}^{(i)} + \sum_{j=1}^{m} x_j \cdot \mathbf{V}^{(j)}
$$

### Hierarchical Regularization

$$
\mathcal{L}_{\text{hier}} = \sum_{i} \lambda_i \cdot \left(\frac{\|\mathbf{W}^{(i)}\|_2^2}{\sigma_i^2 \cdot n_i} - 1\right)^2
$$

### Soft Bound Regularization

$$
\mathcal{L}_{\text{soft}} = \left[\text{softplus}\left(\frac{|x - \mu| - \delta}{\text{scale}}\right)\right]^2
$$

Where $\mu = (\text{max} + \text{min}) / 2$ and $\delta = \mu - \text{min}$.

---

## Appendix: File Reference

### Core Layers

- **Beta-Gamma Decay**: `wt_ml/layers/beta_gamma_decay.py`
- **Sigmoid Curve**: `wt_ml/layers/sigmoid_curve.py`
- **ROI Curve**: `wt_ml/layers/roi_curve.py`
- **Concave Poly Curve**: `wt_ml/layers/concave_poly_curve.py`
- **Piecewise Linear**: `wt_ml/layers/piecewise_linear_curve.py`
- **Monotonic Concave**: `wt_ml/layers/mono_concave_curve.py`
- **Curve Combiner**: `wt_ml/layers/curve_combiner.py`
- **Pricing**: `wt_ml/layers/pricing.py`
- **Hierarchical Embedding**: `wt_ml/layers/hier_embedding.py`
- **Distribution**: `wt_ml/layers/distribution.py`
- **Mixed Effects**: Various layers in `wt_ml/layers/`

### Networks

- **Economic Network**: `wt_ml/networks/economic_network.py`
- **Model Builder**: `wt_ml/networks/model.py`
- **Multi-Network**: `wt_ml/networks/multi_network.py`

### Utilities

- **Layer Utils**: `wt_ml/utils/layer_utils.py` (softplus, sigmoid, rolling_mean, exp_moving_avg, etc.)
- **Module Base**: `wt_ml/module/module.py`
- **Data Pipeline**: `wt_ml/dataset/data_pipeline.py`
- **Data Processing**: `wt_ml/dataset/data_processing_utils.py`

### Training

- **Training Module**: `wt_ml/module/` (optimizer, callbacks, etc.)
- **Walk-Forward Optimization**: `wt_ml/cml/scripts/run_wfo.py`

---

## Conclusion

This document provides a comprehensive overview of the MMM science implemented in the Watchtower ML library. The model combines:

1. **Hierarchical Bayesian Structure**: Parameters are learned as functions of hierarchical features with automatic regularization
2. **Economic Theory**: Diminishing returns, price elasticity, carryover effects
3. **Statistical Rigor**: Multiple regularization terms enforce sensible behavior
4. **Engineering Excellence**: GPU-optimized, numerically stable, modular architecture
5. **Flexibility**: Multiple curve options, customizable hierarchies, extensible layers

The result is a production-grade MMM that can decompose sales drivers, estimate ROI, and support data-driven marketing decisions.

---

**End of Document**

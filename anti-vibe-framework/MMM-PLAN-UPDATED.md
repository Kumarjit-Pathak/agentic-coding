# 🧪 Marketing Mix Modeling - UPDATED Implementation Plan
## Keras 3.x + Python 3.13 + Pure Python (.py) Scripts

---

## 🎯 Updated Architecture

### Tech Stack Changes

**Previous Plan:**
- ❌ Jupyter Notebooks
- ❌ TensorFlow directly
- ❌ Python 3.9+

**NEW Plan:**
- ✅ Pure Python (.py) scripts with CLI
- ✅ Keras 3.x SDK (https://keras.io/api/)
- ✅ Python 3.13.3
- ✅ Clean, modular code structure
- ✅ Visualizations saved to files (PNG/HTML)

---

## 📂 Updated Project Structure

```
mmm-marketing-analytics/
├── src/
│   ├── data/
│   │   ├── __init__.py
│   │   ├── kaggle_loader.py          # Kaggle data download
│   │   ├── preprocessor.py           # Data cleaning & validation
│   │   └── data_splitter.py          # Train/test split
│   │
│   ├── eda/
│   │   ├── __init__.py
│   │   ├── exploratory_analysis.py   # Main EDA script
│   │   ├── visualizer.py             # Plotting utilities
│   │   └── statistical_summary.py    # Stats & correlations
│   │
│   ├── features/
│   │   ├── __init__.py
│   │   ├── adstock.py                # Beta-gamma decay
│   │   ├── saturation.py             # Saturation curves
│   │   ├── seasonality.py            # Seasonal features
│   │   ├── price_elasticity.py       # Price transformations
│   │   └── hierarchical.py           # Hierarchical encoding
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   ├── mmm_model.py              # Core MMM using Keras
│   │   ├── layers/
│   │   │   ├── __init__.py
│   │   │   ├── roi_curve_layer.py    # Custom Keras layer
│   │   │   ├── adstock_layer.py      # Custom Keras layer
│   │   │   └── hierarchical_layer.py # Custom Keras layer
│   │   ├── trainer.py                # Training script
│   │   └── evaluator.py              # Model evaluation
│   │
│   ├── curves/
│   │   ├── __init__.py
│   │   ├── roi_extractor.py          # Extract ROI curves
│   │   └── curve_plotter.py          # Visualize curves
│   │
│   ├── simulator/
│   │   ├── __init__.py
│   │   ├── scenario_engine.py        # What-if analysis
│   │   ├── optimizer.py              # Budget optimization
│   │   └── cli.py                    # Interactive CLI
│   │
│   └── utils/
│       ├── __init__.py
│       ├── config.py                 # Configuration management
│       └── logging.py                # Logging utilities
│
├── scripts/
│   ├── 01_download_data.py           # Run: python scripts/01_download_data.py
│   ├── 02_run_eda.py                 # Run: python scripts/02_run_eda.py
│   ├── 03_engineer_features.py       # Run: python scripts/03_engineer_features.py
│   ├── 04_train_model.py             # Run: python scripts/04_train_model.py
│   ├── 05_generate_curves.py         # Run: python scripts/05_generate_curves.py
│   ├── 06_run_simulator.py           # Run: python scripts/06_run_simulator.py
│   └── run_full_pipeline.py          # Run entire pipeline
│
├── tests/
│   ├── test_data_pipeline.py
│   ├── test_features.py
│   ├── test_model.py
│   └── test_simulator.py
│
├── config/
│   ├── model_config.yaml             # Model hyperparameters
│   ├── data_config.yaml              # Data pipeline settings
│   └── viz_config.yaml               # Visualization settings
│
├── data/
│   ├── raw/                          # Kaggle downloads
│   ├── processed/                    # Cleaned data
│   └── features/                     # Engineered features
│
├── outputs/
│   ├── figures/                      # All generated plots
│   │   ├── eda/                      # EDA visualizations
│   │   ├── roi_curves/               # ROI curve plots
│   │   └── simulations/              # Simulation results
│   ├── models/                       # Trained model artifacts
│   │   ├── mmm_model.keras           # Keras 3.x format
│   │   ├── weights.h5                # Model weights
│   │   └── training_history.json    # Training metrics
│   └── reports/
│       ├── eda_report.html           # Interactive HTML report
│       ├── model_report.html         # Model performance
│       └── simulation_report.html    # Scenarios
│
├── requirements.txt                  # Python 3.13 dependencies
├── pyproject.toml                    # Modern Python packaging
├── setup.py
├── README.md
└── .env.example
```

---

## 🐍 Python 3.13 Features Used

```python
# Modern type hints (PEP 695)
type BrandRegionKey = tuple[str, str]
type ROICurveDict = dict[str, dict[BrandRegionKey, callable]]

# Pattern matching (PEP 636)
match curve_type:
    case "sigmoid":
        return SigmoidSaturation(params)
    case "polynomial":
        return PolynomialSaturation(params)
    case _:
        raise ValueError(f"Unknown curve: {curve_type}")

# Generic type syntax (PEP 695)
def transform[T](data: T, func: callable) -> T:
    return func(data)
```

---

## 🎨 Keras 3.x Integration

### Custom Layers with Keras 3.x

```python
import keras
from keras import layers, ops

class AdstockLayer(layers.Layer):
    """Beta-Gamma adstock transformation as Keras layer"""

    def __init__(self, max_lag: int = 16, **kwargs):
        super().__init__(**kwargs)
        self.max_lag = max_lag

    def build(self, input_shape):
        # Learnable parameters
        self.beta = self.add_weight(
            name="beta",
            shape=(1,),
            initializer="uniform",
            constraint=keras.constraints.UnitNorm()
        )
        self.gamma = self.add_weight(
            name="gamma",
            shape=(1,),
            initializer="uniform",
            constraint=keras.constraints.UnitNorm()
        )

    def call(self, inputs):
        # Implement adstock transformation
        decayed = ops.zeros_like(inputs)
        for lag in range(self.max_lag):
            shifted = ops.roll(inputs, shift=lag, axis=1)
            decay = self.beta * ops.power(self.gamma, lag)
            decayed = decayed + decay * shifted
        return inputs + decayed


class ROICurveLayer(layers.Layer):
    """Saturation curve for diminishing returns"""

    def __init__(self, curve_type: str = "sigmoid", **kwargs):
        super().__init__(**kwargs)
        self.curve_type = curve_type

    def build(self, input_shape):
        # Learnable asymptote and slope
        self.asymptote = self.add_weight(
            name="asymptote",
            shape=(1,),
            initializer=keras.initializers.Constant(2.0)
        )
        self.slope = self.add_weight(
            name="slope",
            shape=(1,),
            initializer=keras.initializers.Constant(1.0)
        )

    def call(self, inputs):
        # Sigmoid saturation
        x_norm = inputs / self.asymptote
        return self.asymptote * ops.sigmoid(self.slope * x_norm)
```

### Complete MMM Model

```python
import keras
from keras import layers, Model

class MarketingMixModel(Model):
    """Complete MMM using Keras 3.x Functional API"""

    def __init__(self,
                 n_channels: int,
                 n_brands: int,
                 n_regions: int,
                 **kwargs):
        super().__init__(**kwargs)

        # Components
        self.adstock = AdstockLayer(max_lag=16)
        self.saturation = ROICurveLayer(curve_type="sigmoid")
        self.hierarchical = HierarchicalEmbeddingLayer(
            hierarchy_dims={"brand": n_brands, "region": n_regions}
        )

        # Dense layers for baseline
        self.baseline_net = keras.Sequential([
            layers.Dense(64, activation="relu"),
            layers.Dense(32, activation="relu"),
            layers.Dense(1)
        ])

    def call(self, inputs):
        media_spend = inputs["media"]
        price = inputs["price"]
        external = inputs["external"]
        hierarchy = inputs["hierarchy"]

        # Media transformation
        adstocked = self.adstock(media_spend)
        saturated = self.saturation(adstocked)

        # Hierarchical coefficients
        coeffs = self.hierarchical(hierarchy)

        # Media impact
        media_impact = ops.sum(saturated * coeffs, axis=-1)

        # Baseline + effects
        baseline = self.baseline_net(external)
        prediction = baseline + media_impact

        return prediction
```

---

## 🔄 Updated Workflow

### CLI-Based Execution (No Notebooks!)

```bash
# Step 1: Download data from Kaggle
python scripts/01_download_data.py \
    --dataset subhagatoadak/mmm-weekly-data-geoindia \
    --output data/raw/

# Step 2: Run EDA (generates plots automatically)
python scripts/02_run_eda.py \
    --input data/raw/mmm_data.csv \
    --output outputs/figures/eda/ \
    --report outputs/reports/eda_report.html

# Step 3: Feature engineering
python scripts/03_engineer_features.py \
    --input data/raw/mmm_data.csv \
    --output data/processed/features.parquet \
    --config config/feature_config.yaml

# Step 4: Train model
python scripts/04_train_model.py \
    --data data/processed/features.parquet \
    --config config/model_config.yaml \
    --output outputs/models/ \
    --epochs 1000

# Step 5: Generate ROI curves
python scripts/05_generate_curves.py \
    --model outputs/models/mmm_model.keras \
    --output outputs/figures/roi_curves/ \
    --format png

# Step 6: Run simulator (interactive CLI)
python scripts/06_run_simulator.py \
    --model outputs/models/mmm_model.keras \
    --interactive

# Or run entire pipeline
python scripts/run_full_pipeline.py --all
```

---

## 📋 Agent Configuration

### Agent 1: Data Pipeline Agent
**Tech Stack:** Python 3.13 + Pandas + Kaggle API

**Generates:**
```python
# src/data/kaggle_loader.py
import kagglehub
from pathlib import Path

class KaggleDataLoader:
    def __init__(self, credentials_path: str | Path):
        self.credentials_path = Path(credentials_path)

    def download_dataset(self,
                        dataset: str,
                        output_dir: str | Path = "data/raw/") -> Path:
        """Download dataset from Kaggle using kagglehub"""
        # Implementation with progress bars, validation, etc.
        ...
```

```python
# scripts/01_download_data.py
import argparse
from src.data.kaggle_loader import KaggleDataLoader

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dataset", required=True)
    parser.add_argument("--output", default="data/raw/")
    args = parser.parse_args()

    loader = KaggleDataLoader(credentials_path="../kaggle.json")
    path = loader.download_dataset(args.dataset, args.output)
    print(f"✓ Data downloaded to: {path}")

if __name__ == "__main__":
    main()
```

---

### Agent 2: EDA Agent
**Tech Stack:** Python 3.13 + Pandas + Matplotlib + Seaborn + Plotly

**Generates:**
```python
# src/eda/exploratory_analysis.py
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path

class MMMExploratoryAnalysis:
    def __init__(self, data: pd.DataFrame):
        self.data = data
        self.figures: dict[str, plt.Figure] = {}

    def analyze_sales_trends(self) -> plt.Figure:
        """Generate sales trends by brand and region"""
        fig, axes = plt.subplots(2, 2, figsize=(15, 10))
        # Implementation...
        return fig

    def analyze_spend_distribution(self) -> plt.Figure:
        """Marketing spend by channel"""
        # Implementation...

    def correlation_analysis(self) -> plt.Figure:
        """Correlation heatmap"""
        # Implementation...

    def run_all_analyses(self, output_dir: Path) -> None:
        """Run all 20+ EDA analyses and save plots"""
        analyses = [
            self.analyze_sales_trends,
            self.analyze_spend_distribution,
            self.correlation_analysis,
            # ... 17 more
        ]

        for i, analysis_func in enumerate(analyses, 1):
            fig = analysis_func()
            fig.savefig(output_dir / f"{i:02d}_{analysis_func.__name__}.png",
                       dpi=300, bbox_inches='tight')
            plt.close(fig)
```

```python
# scripts/02_run_eda.py
import argparse
from pathlib import Path
import pandas as pd
from src.eda.exploratory_analysis import MMMExploratoryAnalysis

def main():
    parser = argparse.ArgumentParser(
        description="Run EDA on MMM data and generate visualizations"
    )
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--output", type=Path, default="outputs/figures/eda/")
    parser.add_argument("--report", type=Path, default="outputs/reports/eda.html")
    args = parser.parse_args()

    print("📊 Running Exploratory Data Analysis...")

    # Load data
    df = pd.read_csv(args.input)
    print(f"✓ Loaded {len(df):,} rows")

    # Run EDA
    eda = MMMExploratoryAnalysis(df)
    args.output.mkdir(parents=True, exist_ok=True)
    eda.run_all_analyses(args.output)

    print(f"✓ Generated 20+ visualizations in {args.output}")

    # Generate HTML report
    eda.generate_html_report(args.report)
    print(f"✓ HTML report saved to {args.report}")

if __name__ == "__main__":
    main()
```

---

### Agent 3: Feature Engineering Agent
**Tech Stack:** Python 3.13 + NumPy + Pandas

**Generates:**
```python
# src/features/adstock.py
import numpy as np
from numpy.typing import NDArray

def beta_gamma_decay(
    x: NDArray[np.float32],
    beta: float = 0.5,
    gamma: float = 0.8,
    max_lag: int = 16
) -> NDArray[np.float32]:
    """
    Apply adstock transformation with Beta-Gamma decay.

    Args:
        x: Input signal (time series)
        beta: Immediate decay rate [0, 1]
        gamma: Exponential decay factor [0, 1]
        max_lag: Maximum lag periods

    Returns:
        Transformed signal with carryover effects
    """
    result = np.copy(x)

    for lag in range(1, max_lag + 1):
        decay_factor = beta * (gamma ** lag)
        result += decay_factor * np.roll(x, lag)

    return result
```

```python
# scripts/03_engineer_features.py
import argparse
from pathlib import Path
import pandas as pd
from src.features import adstock, saturation, seasonality

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--config", type=Path)
    args = parser.parse_args()

    print("🔧 Engineering features...")

    df = pd.read_csv(args.input)

    # Apply transformations
    df_features = df.copy()

    # Adstock for media channels
    for channel in ["tv", "digital", "print", "ooh"]:
        df_features[f"{channel}_adstock"] = adstock.beta_gamma_decay(
            df[channel].values,
            beta=0.5,
            gamma=0.8
        )

    # Saturation
    for channel in ["tv", "digital", "print", "ooh"]:
        df_features[f"{channel}_saturated"] = saturation.sigmoid_curve(
            df_features[f"{channel}_adstock"].values
        )

    # Save
    df_features.to_parquet(args.output, index=False)
    print(f"✓ Features saved to {args.output}")

if __name__ == "__main__":
    main()
```

---

### Agent 4: Model Training Agent
**Tech Stack:** Python 3.13 + Keras 3.x

**Generates:**
```python
# src/models/mmm_model.py
import keras
from keras import layers, Model, ops
import numpy as np

class MarketingMixModel(Model):
    """
    Marketing Mix Model using Keras 3.x.

    Architecture:
        Sales = Baseline × Price_effect +
                Σ(Media_channel_impact) +
                Seasonality +
                External_factors
    """

    def __init__(self,
                 n_channels: int = 4,
                 n_brands: int = 5,
                 n_regions: int = 4,
                 adstock_max_lag: int = 16,
                 **kwargs):
        super().__init__(**kwargs)

        # Store config
        self.config = {
            "n_channels": n_channels,
            "n_brands": n_brands,
            "n_regions": n_regions,
            "adstock_max_lag": adstock_max_lag
        }

        # Hierarchical embeddings for ROI coefficients
        self.brand_embeddings = self.add_weight(
            name="brand_embeddings",
            shape=(n_brands, n_channels),
            initializer="glorot_uniform",
            trainable=True
        )

        self.region_embeddings = self.add_weight(
            name="region_embeddings",
            shape=(n_regions, n_channels),
            initializer="glorot_uniform",
            trainable=True
        )

        # Adstock parameters (per channel)
        self.beta = self.add_weight(
            name="beta",
            shape=(n_channels,),
            initializer=keras.initializers.Constant(0.5),
            constraint=keras.constraints.UnitNorm()
        )

        self.gamma = self.add_weight(
            name="gamma",
            shape=(n_channels,),
            initializer=keras.initializers.Constant(0.8),
            constraint=keras.constraints.UnitNorm()
        )

        # Saturation parameters (per channel)
        self.asymptote = self.add_weight(
            name="asymptote",
            shape=(n_channels,),
            initializer=keras.initializers.Constant(2.0)
        )

        self.slope = self.add_weight(
            name="slope",
            shape=(n_channels,),
            initializer=keras.initializers.Constant(1.0)
        )

        # Baseline network
        self.baseline_net = keras.Sequential([
            layers.Dense(64, activation="relu", name="baseline_1"),
            layers.Dense(32, activation="relu", name="baseline_2"),
            layers.Dense(16, activation="relu", name="baseline_3"),
            layers.Dense(1, name="baseline_output")
        ])

    def call(self, inputs):
        """
        Forward pass.

        Args:
            inputs: dict with keys:
                - "media_spend": shape (batch, time, n_channels)
                - "price": shape (batch, time, 1)
                - "external": shape (batch, time, n_external_features)
                - "brand_id": shape (batch,)
                - "region_id": shape (batch,)

        Returns:
            Predicted sales: shape (batch, time, 1)
        """
        media = inputs["media_spend"]
        price = inputs["price"]
        external = inputs["external"]
        brand_id = inputs["brand_id"]
        region_id = inputs["region_id"]

        # 1. Apply adstock (carryover effects)
        media_adstocked = self._apply_adstock(media)

        # 2. Apply saturation (diminishing returns)
        media_saturated = self._apply_saturation(media_adstocked)

        # 3. Get hierarchical coefficients
        brand_coeff = ops.take(self.brand_embeddings, brand_id, axis=0)
        region_coeff = ops.take(self.region_embeddings, region_id, axis=0)
        coefficients = (brand_coeff + region_coeff) / 2.0

        # 4. Calculate media impact
        media_impact = ops.sum(
            media_saturated * ops.expand_dims(coefficients, 1),
            axis=-1,
            keepdims=True
        )

        # 5. Baseline from external factors
        baseline = self.baseline_net(external)

        # 6. Price elasticity (multiplicative)
        price_effect = ops.power(price, -1.5)  # Elastic demand

        # 7. Combine
        prediction = baseline * price_effect + media_impact

        return prediction

    def _apply_adstock(self, x):
        """Apply adstock transformation"""
        # Implementation using ops.roll and weighted sum
        ...

    def _apply_saturation(self, x):
        """Apply saturation curve"""
        # Sigmoid saturation
        return self.asymptote * ops.sigmoid(self.slope * x / self.asymptote)
```

```python
# scripts/04_train_model.py
import argparse
from pathlib import Path
import pandas as pd
import keras
from src.models.mmm_model import MarketingMixModel
from src.utils.config import load_config

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", type=Path, required=True)
    parser.add_argument("--config", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--epochs", type=int, default=1000)
    args = parser.parse_args()

    print("🏋️ Training MMM Model...")

    # Load config
    config = load_config(args.config)

    # Load data
    df = pd.read_parquet(args.data)

    # Prepare inputs
    X, y = prepare_model_inputs(df)

    # Create model
    model = MarketingMixModel(
        n_channels=config["n_channels"],
        n_brands=config["n_brands"],
        n_regions=config["n_regions"]
    )

    # Compile
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=0.001),
        loss="mse",
        metrics=["mae", "mape"]
    )

    # Train
    history = model.fit(
        X, y,
        epochs=args.epochs,
        validation_split=0.2,
        callbacks=[
            keras.callbacks.EarlyStopping(patience=50, restore_best_weights=True),
            keras.callbacks.ModelCheckpoint(
                args.output / "best_model.keras",
                save_best_only=True
            ),
            keras.callbacks.CSVLogger(args.output / "training_log.csv")
        ],
        verbose=1
    )

    # Save final model
    model.save(args.output / "mmm_model.keras")
    print(f"✓ Model saved to {args.output}")

if __name__ == "__main__":
    main()
```

---

### Agent 5: Curve Estimation Agent

**Generates:**
```python
# scripts/05_generate_curves.py
import argparse
from pathlib import Path
import keras
import numpy as np
import matplotlib.pyplot as plt
from src.curves.roi_extractor import ROICurveExtractor

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--format", default="png")
    args = parser.parse_args()

    print("📈 Generating ROI Curves...")

    # Load trained model
    model = keras.models.load_model(args.model)

    # Extract curves
    extractor = ROICurveExtractor(model)
    roi_curves = extractor.extract_all_curves(
        channels=["TV", "Digital", "Print", "OOH"],
        brands=["Brand_A", "Brand_B", "Brand_C", "Brand_D", "Brand_E"],
        regions=["North", "South", "East", "West"]
    )

    # Generate plots
    args.output.mkdir(parents=True, exist_ok=True)

    for channel in roi_curves:
        for brand in roi_curves[channel]:
            for region in roi_curves[channel][brand]:
                fig = plot_roi_curve(
                    curve=roi_curves[channel][brand][region],
                    title=f"{channel} ROI - {brand} - {region}"
                )

                filename = f"roi_{channel}_{brand}_{region}.{args.format}"
                fig.savefig(args.output / filename, dpi=300)
                plt.close(fig)

    print(f"✓ Generated 60+ ROI curve plots in {args.output}")

if __name__ == "__main__":
    main()
```

---

### Agent 6: Simulator Agent

**Generates:**
```python
# src/simulator/scenario_engine.py
import keras
import numpy as np
from dataclasses import dataclass

@dataclass
class SimulationResult:
    predicted_sales: float
    incremental_sales: float
    roi: float
    channel_contributions: dict[str, float]

class MarketingSimulator:
    """Interactive simulator for what-if analysis"""

    def __init__(self, model: keras.Model):
        self.model = model

    def simulate_scenario(self,
                         spend_allocation: dict[str, float],
                         brand: str,
                         region: str) -> SimulationResult:
        """
        Simulate marketing impact for given spend allocation.

        Args:
            spend_allocation: {"TV": 1000000, "Digital": 500000, ...}
            brand: Brand name
            region: Region name

        Returns:
            SimulationResult with predictions and insights
        """
        # Prepare model inputs
        inputs = self._prepare_inputs(spend_allocation, brand, region)

        # Predict
        prediction = self.model.predict(inputs, verbose=0)

        # Calculate contributions
        contributions = self._decompose_contributions(inputs)

        return SimulationResult(
            predicted_sales=float(prediction),
            incremental_sales=float(prediction - self.baseline),
            roi=float(prediction / sum(spend_allocation.values())),
            channel_contributions=contributions
        )

    def optimize_budget(self,
                       total_budget: float,
                       constraints: dict,
                       brand: str,
                       region: str) -> dict[str, float]:
        """
        Find optimal budget allocation using scipy.optimize.

        Args:
            total_budget: Total available budget
            constraints: Min/max for each channel
            brand: Brand name
            region: Region name

        Returns:
            Optimal allocation: {"TV": amount, "Digital": amount, ...}
        """
        from scipy.optimize import minimize

        def objective(allocation):
            spend_dict = dict(zip(self.channels, allocation))
            result = self.simulate_scenario(spend_dict, brand, region)
            return -result.predicted_sales  # Negative for maximization

        # Constraints: sum = total_budget, individual min/max
        # Implementation...

        optimal = minimize(objective, x0=initial_guess, constraints=...)
        return dict(zip(self.channels, optimal.x))
```

```python
# scripts/06_run_simulator.py
import argparse
from pathlib import Path
import keras
from src.simulator.scenario_engine import MarketingSimulator

def interactive_mode(simulator: MarketingSimulator):
    """Interactive CLI for scenario analysis"""
    print("\n" + "="*60)
    print("🎮 MARKETING BUDGET SIMULATOR")
    print("="*60)

    while True:
        print("\nOptions:")
        print("  1. Simulate scenario")
        print("  2. Optimize budget")
        print("  3. Compare scenarios")
        print("  4. Exit")

        choice = input("\nChoose option (1-4): ")

        match choice:
            case "1":
                run_simulation(simulator)
            case "2":
                run_optimization(simulator)
            case "3":
                compare_scenarios(simulator)
            case "4":
                print("👋 Goodbye!")
                break
            case _:
                print("❌ Invalid option")

def run_simulation(simulator: MarketingSimulator):
    print("\n📊 SCENARIO SIMULATION")

    # Get inputs
    brand = input("Brand (Brand_A/Brand_B/...): ")
    region = input("Region (North/South/East/West): ")

    spend = {}
    for channel in ["TV", "Digital", "Print", "OOH"]:
        amount = float(input(f"{channel} spend: $"))
        spend[channel] = amount

    # Simulate
    result = simulator.simulate_scenario(spend, brand, region)

    # Display results
    print("\n" + "─"*60)
    print("RESULTS:")
    print("─"*60)
    print(f"Predicted Sales: ${result.predicted_sales:,.0f}")
    print(f"ROI: {result.roi:.2f}x")
    print("\nChannel Contributions:")
    for ch, contrib in result.channel_contributions.items():
        print(f"  {ch}: ${contrib:,.0f}")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", type=Path, required=True)
    parser.add_argument("--interactive", action="store_true")
    args = parser.parse_args()

    # Load model
    model = keras.models.load_model(args.model)
    simulator = MarketingSimulator(model)

    if args.interactive:
        interactive_mode(simulator)
    else:
        # Batch mode
        run_predefined_scenarios(simulator)

if __name__ == "__main__":
    main()
```

---

## 🎯 Updated Agent Workflow

```python
# examples/mmm-analytics/run.py

from orchestrator import AntiVibeOrchestrator, ProjectConfig

config = ProjectConfig(
    name="mmm-marketing-analytics",
    description="Marketing Mix Modeling with Keras 3.x and Python 3.13",

    techStack={
        "language": "Python 3.13",
        "ml_framework": "Keras 3.x",
        "data": "Pandas + NumPy",
        "viz": "Matplotlib + Seaborn + Plotly",
    },

    features=[
        # Data Pipeline
        "Kaggle API integration for automatic data download",
        "Data validation and quality checks",
        "Missing value imputation",
        "Outlier detection and handling",

        # EDA
        "20+ exploratory visualizations (trends, distributions, correlations)",
        "Statistical summary tables",
        "Seasonality decomposition plots",
        "Interactive HTML EDA report",

        # Feature Engineering
        "Beta-Gamma adstock transformation (16 week lag)",
        "Sigmoid saturation curves for diminishing returns",
        "Hierarchical Bayesian embeddings (brand × region × channel)",
        "Price elasticity features",
        "Seasonal indicator features",

        # Modeling (Keras 3.x)
        "Custom Keras layers for adstock and saturation",
        "Hierarchical coefficient learning",
        "Regularization with economic priors",
        "Training with early stopping",
        "Model checkpointing",
        "Training history visualization",

        # ROI Curves
        "Extract learned ROI curves from model",
        "Generate 60+ curve plots (channels × brands × regions)",
        "Marginal ROI calculation",
        "Confidence interval estimation",
        "Efficiency frontier visualization",

        # Simulator
        "Interactive CLI for what-if analysis",
        "Budget optimization using scipy.optimize",
        "Scenario comparison tool",
        "Sensitivity analysis",
        "Export recommendations to CSV/JSON",

        # Code Quality
        "Type hints with Python 3.13 syntax",
        "PEP8 compliant code",
        "Comprehensive docstrings",
        "Unit tests with pytest",
        "Integration tests for full pipeline"
    ]
)
```

---

## 📦 Dependencies (requirements.txt)

```txt
# Core ML
keras>=3.0.0
tensorflow>=2.16.0  # Backend for Keras
numpy>=1.26.0
scipy>=1.11.0

# Data
pandas>=2.1.0
pyarrow>=14.0.0  # For parquet support

# Kaggle
kagglehub>=0.2.0

# Visualization
matplotlib>=3.8.0
seaborn>=0.13.0
plotly>=5.18.0

# CLI
typer>=0.9.0  # Beautiful CLI
rich>=13.7.0  # Rich terminal output

# Config
pyyaml>=6.0
python-dotenv>=1.0.0

# Testing
pytest>=7.4.0
pytest-cov>=4.1.0

# Utilities
tqdm>=4.66.0  # Progress bars
loguru>=0.7.0  # Better logging
```

---

## ⚡ Execution Speed

**With 8 Specialized Agents:**

```
Planning Agent:           5 min  ← Sequential (must go first)
──────────────────────────────────────
Data Pipeline Agent:      5 min  ← Sequential (needs plan)
──────────────────────────────────────
EDA Agent:               5 min  ┐
Feature Agent:           5 min  ├─ PARALLEL!
Doc Agent (initial):     3 min  ┘
──────────────────────────────────────
Model Training Agent:     8 min  ← Sequential (needs features)
──────────────────────────────────────
Curve Agent:             6 min  ┐
Simulator Agent:         6 min  ├─ PARALLEL!
Test Agent:              5 min  ┘
──────────────────────────────────────
Integration:             2 min  ← Sequential (combines all)

TOTAL: ~45 minutes
```

**vs Traditional:** 200+ hours (99.6% time savings!)

---

## 🎯 Success Criteria

After generation, you should be able to:

```bash
# Clone and setup
git clone <repo>
cd mmm-marketing-analytics
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

# Run entire pipeline
python scripts/run_full_pipeline.py

# Or step by step
python scripts/01_download_data.py
python scripts/02_run_eda.py
python scripts/03_engineer_features.py
python scripts/04_train_model.py
python scripts/05_generate_curves.py
python scripts/06_run_simulator.py --interactive

# Check outputs
ls outputs/figures/eda/        # 20+ EDA plots
ls outputs/figures/roi_curves/  # 60+ ROI curves
ls outputs/models/              # Trained model

# Run tests
pytest tests/ -v --cov=src
```

---

## 🚀 Ready to Implement?

**If you approve**, I'll create:

1. ✅ Updated Python-based orchestrator for ML projects
2. ✅ 8 specialized MMM agents
3. ✅ Example configuration file
4. ✅ Run script: `python examples/mmm-analytics/run.py`
5. ✅ All generated code will use Keras 3.x + Python 3.13

**Shall I proceed with implementation?** 🎯

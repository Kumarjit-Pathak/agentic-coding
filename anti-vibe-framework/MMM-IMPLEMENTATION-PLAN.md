# 🧪 Marketing Mix Modeling (MMM) Implementation Plan

## Executive Summary

This document outlines the plan to add a **data science/ML example** to the anti-vibe framework, specifically for **Marketing Mix Modeling (MMM)** based on academic research and real-world implementation.

---

## 🎯 Project Goal

Create a complete, production-ready MMM pipeline that:
1. ✅ Downloads data from Kaggle automatically
2. ✅ Performs comprehensive EDA with visualizations
3. ✅ Implements MMM model based on Watchtower ML science
4. ✅ Generates curve estimations for each investment by brand/region
5. ✅ Creates an interactive simulator for what-if analysis
6. ✅ Produces clean, readable, well-documented code

---

## 📊 Key Differences from API Examples

| Aspect | API Examples | MMM Example |
|--------|--------------|-------------|
| **Output** | REST API server | Jupyter notebooks + Python modules |
| **Tech Stack** | Express/Fastify + DB | Python + TensorFlow + Pandas |
| **Structure** | Routes/Controllers | Data pipeline + Model + Simulator |
| **User Interaction** | HTTP endpoints | Interactive notebooks + CLI |
| **Deliverables** | API code | Notebooks + Trained models + Reports |

---

## 🏗️ Architecture Design

### Component Overview

```
mmm-project/
├── data/
│   ├── raw/                    # Downloaded from Kaggle
│   ├── processed/              # Cleaned and transformed
│   └── external/               # External data sources
│
├── notebooks/
│   ├── 01_data_download.ipynb        # Kaggle data ingestion
│   ├── 02_eda.ipynb                  # Exploratory data analysis
│   ├── 03_feature_engineering.ipynb  # Feature creation
│   ├── 04_model_training.ipynb       # MMM model training
│   ├── 05_curve_estimation.ipynb     # ROI curve visualization
│   └── 06_simulator.ipynb            # What-if simulator
│
├── src/
│   ├── data/
│   │   ├── kaggle_loader.py          # Kaggle API integration
│   │   └── preprocessor.py           # Data cleaning
│   ├── features/
│   │   ├── adstock.py                # Adstock transformation
│   │   ├── saturation.py             # Saturation curves
│   │   └── seasonality.py            # Seasonal decomposition
│   ├── models/
│   │   ├── mmm_model.py              # Core MMM implementation
│   │   ├── hierarchical_embedding.py # Hierarchical Bayesian
│   │   └── price_elasticity.py       # Price effects
│   ├── visualization/
│   │   ├── eda_plots.py              # EDA visualizations
│   │   └── curve_plots.py            # ROI curve plots
│   └── simulator/
│       ├── scenario_analyzer.py      # What-if analysis
│       └── optimizer.py              # Budget optimization
│
├── tests/
│   ├── test_data_loading.py
│   ├── test_preprocessing.py
│   ├── test_model.py
│   └── test_simulator.py
│
├── config/
│   ├── model_config.yaml             # Model hyperparameters
│   └── data_config.yaml              # Data pipeline config
│
├── outputs/
│   ├── figures/                      # Generated plots
│   ├── models/                       # Trained model artifacts
│   └── reports/                      # HTML/PDF reports
│
├── requirements.txt
├── setup.py
└── README.md
```

---

## 🤖 Agent Specialization for MMM

### Agent 1: Data Pipeline Agent
**Role:** Data Engineer specializing in Kaggle & ETL

**Responsibilities:**
- Generate Kaggle data download code
- Create data validation functions
- Build preprocessing pipeline
- Handle missing values and outliers

**Output Files:**
- `src/data/kaggle_loader.py`
- `src/data/preprocessor.py`
- `src/data/validator.py`
- `notebooks/01_data_download.ipynb`

---

### Agent 2: EDA Agent
**Role:** Data Scientist specializing in exploratory analysis

**Responsibilities:**
- Generate comprehensive EDA notebooks
- Create visualization functions
- Statistical summaries
- Correlation analysis
- Time series decomposition

**Output Files:**
- `notebooks/02_eda.ipynb`
- `src/visualization/eda_plots.py`
- `outputs/reports/eda_report.html`

**Required Visualizations:**
- Sales trends by brand/region
- Marketing spend distribution
- Correlation heatmaps
- Seasonality patterns
- Outlier detection plots

---

### Agent 3: Feature Engineering Agent
**Role:** ML Engineer specializing in feature transformation

**Responsibilities:**
- Implement adstock/decay transformations (Beta-Gamma)
- Create saturation curve functions
- Build seasonality features
- Price elasticity calculations
- Hierarchical encoding

**Output Files:**
- `src/features/adstock.py`
- `src/features/saturation.py`
- `src/features/seasonality.py`
- `src/features/hierarchical.py`
- `notebooks/03_feature_engineering.ipynb`

**Key Functions:**
```python
def beta_gamma_decay(x, beta, gamma, length=16):
    """Adstock transformation with carryover effects"""

def sigmoid_saturation(x, asymptote, slope):
    """Diminishing returns transformation"""

def hierarchical_embedding(brand, region, channel):
    """Hierarchical Bayesian embeddings"""
```

---

### Agent 4: Model Training Agent
**Role:** ML Engineer specializing in statistical modeling

**Responsibilities:**
- Implement MMM model architecture
- Training loop with regularization
- Hyperparameter tuning
- Model validation
- Coefficient interpretation

**Output Files:**
- `src/models/mmm_model.py`
- `src/models/trainer.py`
- `src/models/evaluator.py`
- `notebooks/04_model_training.ipynb`
- `config/model_config.yaml`

**Core Model Equation:**
```
Sales_t = Baseline_t × Pricing_effect_t +
          Σ(Media_impact_i,t) +
          Σ(External_factors_j,t) +
          ε_t
```

---

### Agent 5: Curve Estimation Agent
**Role:** Data Scientist specializing in ROI analysis

**Responsibilities:**
- Generate ROI curves for each channel
- Visualize saturation effects
- Calculate marginal returns
- Brand/region specific curves
- Confidence intervals

**Output Files:**
- `src/visualization/curve_plots.py`
- `notebooks/05_curve_estimation.ipynb`
- `outputs/figures/roi_curves/`

**Required Visualizations:**
- ROI curves by channel (TV, Digital, Print, etc.)
- ROI curves by brand
- ROI curves by region
- Marginal ROI plots
- Budget efficiency frontiers

---

### Agent 6: Simulator Agent
**Role:** Data Scientist specializing in scenario analysis

**Responsibilities:**
- Interactive what-if simulator
- Budget reallocation optimizer
- Scenario comparison
- Sensitivity analysis
- Export results

**Output Files:**
- `src/simulator/scenario_analyzer.py`
- `src/simulator/optimizer.py`
- `notebooks/06_simulator.ipynb`
- `outputs/scenarios/`

**Simulator Features:**
```python
# What-if analysis
simulator.change_investment(
    channel="TV",
    brand="Brand A",
    region="North",
    new_spend=1_500_000  # vs current 1_000_000
)
simulator.predict_impact()  # Shows incremental sales

# Optimization
optimal_budget = simulator.optimize_allocation(
    total_budget=10_000_000,
    constraints={
        "min_tv": 0.3,  # At least 30% on TV
        "max_digital": 0.5  # At most 50% on digital
    }
)
```

---

### Agent 7: Testing Agent
**Role:** QA Engineer specializing in ML testing

**Responsibilities:**
- Unit tests for data pipeline
- Integration tests for model
- Simulation validation tests
- Performance tests
- Documentation tests

**Output Files:**
- `tests/test_*.py`
- `tests/fixtures/`
- `pytest.ini`

---

### Agent 8: Documentation Agent
**Role:** Technical Writer specializing in ML documentation

**Responsibilities:**
- README with setup instructions
- Model documentation
- API reference for modules
- User guide for simulator
- Academic paper citations

**Output Files:**
- `README.md`
- `docs/MODEL_DOCUMENTATION.md`
- `docs/SIMULATOR_GUIDE.md`
- `docs/API_REFERENCE.md`

---

## 🔄 Workflow Design

### Sequential vs Parallel Execution

```
PHASE 1: Foundation (Sequential)
├─ Planning Agent
└─ Data Pipeline Agent

PHASE 2: Analysis (Parallel)
├─ EDA Agent
├─ Feature Engineering Agent
└─ Documentation Agent (initial)

PHASE 3: Modeling (Sequential - depends on Phase 2)
├─ Model Training Agent
└─ Curve Estimation Agent

PHASE 4: Application (Parallel)
├─ Simulator Agent
├─ Testing Agent
└─ Documentation Agent (final)

PHASE 5: Integration (Sequential)
└─ Main orchestrator combines all outputs
```

---

## 📋 Configuration Template

### `mmm_config.py`

```python
from dataclasses import dataclass
from typing import List, Dict

@dataclass
class MMMProjectConfig:
    # Project metadata
    name: str = "mmm-marketing-analytics"
    description: str = "Marketing Mix Modeling with ROI optimization"

    # Data source
    kaggle_dataset: str = "subhagatoadak/mmm-weekly-data-geoindia"
    kaggle_credentials_path: str = "../kaggle.json"

    # Tech stack
    ml_framework: str = "TensorFlow 2.x"
    data_framework: str = "Pandas + NumPy"
    viz_framework: str = "Matplotlib + Seaborn + Plotly"
    notebook_framework: str = "Jupyter Lab"

    # Model specifications
    model_features: List[str] = [
        "Adstock transformation (Beta-Gamma decay)",
        "Saturation curves (Sigmoid, Polynomial, Piecewise)",
        "Hierarchical Bayesian embeddings",
        "Price elasticity modeling",
        "Seasonality decomposition",
        "External factors (weather, holidays, trends)",
        "Regularization with economic priors"
    ]

    # Analysis requirements
    required_outputs: List[str] = [
        "Comprehensive EDA with 20+ visualizations",
        "ROI curves by channel/brand/region",
        "Contribution analysis (waterfall charts)",
        "Budget optimization recommendations",
        "Interactive simulator notebook",
        "Model performance metrics (R², MAPE, etc.)",
        "Confidence intervals for predictions"
    ]

    # Customization options
    customizable_params: Dict[str, str] = {
        "adstock_length": "Number of weeks for carryover (default: 16)",
        "saturation_curve": "Curve type: sigmoid/poly/piecewise/neural",
        "hierarchy_levels": "Brand/Region/Channel structure",
        "regularization_strength": "L2 penalty weight",
        "training_epochs": "Number of optimization iterations"
    }

    # Output specifications
    output_path: str = "./output/mmm-marketing-analytics"
```

---

## 🎨 Implementation Details

### Data Pipeline Flow

```python
# Step 1: Download from Kaggle
kaggle_loader.download_dataset(
    dataset="subhagatoadak/mmm-weekly-data-geoindia",
    credentials="../kaggle.json"
)

# Step 2: Load and validate
df_raw = pd.read_csv("data/raw/mmm_data.csv")
validator.check_schema(df_raw)
validator.check_quality(df_raw)

# Step 3: Preprocess
df_clean = preprocessor.clean(df_raw)
df_clean = preprocessor.handle_missing(df_clean)
df_clean = preprocessor.detect_outliers(df_clean)

# Step 4: Feature engineering
df_features = feature_engineer.create_adstock(df_clean)
df_features = feature_engineer.create_saturation(df_features)
df_features = feature_engineer.encode_hierarchy(df_features)

# Step 5: Train/test split (time-based)
train, test = split_time_series(df_features, test_weeks=13)
```

---

### Model Training Flow

```python
# Initialize model
mmm = MarketingMixModel(
    channels=["TV", "Digital", "Print", "OOH"],
    hierarchy=["brand", "region"],
    adstock_max_lag=16,
    saturation_curve="sigmoid"
)

# Configure training
mmm.compile(
    optimizer="Adam",
    learning_rate=0.001,
    loss="mse",
    regularization={
        "hierarchical": 0.0001,
        "curve_shape": 0.1,
        "roi_target": 1.1
    }
)

# Train
history = mmm.fit(
    X_train, y_train,
    validation_data=(X_val, y_val),
    epochs=1000,
    callbacks=[
        EarlyStopping(patience=50),
        ModelCheckpoint("best_model.h5"),
        CurveTracker()  # Track ROI curves during training
    ]
)

# Evaluate
metrics = mmm.evaluate(X_test, y_test)
print(f"R²: {metrics['r2']:.3f}")
print(f"MAPE: {metrics['mape']:.2f}%")
```

---

### Curve Estimation Flow

```python
# Extract learned curves
roi_curves = mmm.get_roi_curves()

# Plot by channel
for channel in ["TV", "Digital", "Print"]:
    plt.figure(figsize=(10, 6))

    # Plot curves for each brand/region
    for brand in brands:
        for region in regions:
            curve = roi_curves[channel][brand][region]
            spend_range = np.linspace(0, max_spend, 100)
            impact = curve(spend_range)

            plt.plot(spend_range, impact,
                    label=f"{brand}-{region}")

    plt.xlabel("Marketing Spend")
    plt.ylabel("Incremental Sales")
    plt.title(f"{channel} ROI Curve")
    plt.legend()
    plt.grid(True)
    plt.savefig(f"outputs/figures/roi_{channel}.png")
```

---

### Simulator Interface

```python
# Initialize simulator
sim = MarketingSimulator(mmm_model)

# Current state
current_spend = {
    ("TV", "Brand A", "North"): 1_000_000,
    ("Digital", "Brand A", "North"): 500_000,
    # ... more
}

current_sales = sim.predict(current_spend)
print(f"Current Sales: ${current_sales:,.0f}")

# What-if scenario
scenario_1 = current_spend.copy()
scenario_1[("TV", "Brand A", "North")] = 1_500_000  # +50%
scenario_1[("Digital", "Brand A", "North")] = 400_000  # -20%

new_sales = sim.predict(scenario_1)
delta = new_sales - current_sales
roi = delta / (500_000 - 100_000)  # Incremental sales / incremental spend

print(f"Scenario 1 Sales: ${new_sales:,.0f}")
print(f"Incremental Sales: ${delta:,.0f}")
print(f"Marginal ROI: {roi:.2f}x")

# Optimize allocation
optimal = sim.optimize(
    total_budget=10_000_000,
    constraints={
        "TV": {"min": 0.2, "max": 0.5},
        "Digital": {"min": 0.3, "max": 0.6}
    },
    objective="maximize_sales"
)

print("Optimal Allocation:")
for key, value in optimal.items():
    print(f"  {key}: ${value:,.0f}")
```

---

## 📦 Deliverables Checklist

### Code Artifacts
- [ ] 6 interactive Jupyter notebooks
- [ ] 15+ Python modules (clean, PEP8 compliant)
- [ ] Configuration files (YAML/JSON)
- [ ] Requirements.txt with pinned versions
- [ ] setup.py for package installation

### Documentation
- [ ] README with quickstart
- [ ] Model documentation with equations
- [ ] Simulator user guide
- [ ] API reference
- [ ] Academic paper citations

### Outputs
- [ ] 50+ EDA visualizations
- [ ] ROI curves (3 channels × 5 brands × 4 regions = 60+ plots)
- [ ] Model performance report
- [ ] Trained model files (.h5 or .pb)
- [ ] Simulation scenarios

### Tests
- [ ] Unit tests (>80% coverage)
- [ ] Integration tests
- [ ] Validation tests
- [ ] Performance benchmarks

---

## 🚀 Implementation Timeline

### Phase 1: Planning & Setup (Agent outputs in 5 min)
- Project structure generation
- Requirements file
- Configuration templates
- Initial README

### Phase 2: Data Pipeline (Agent outputs in 5 min)
- Kaggle integration code
- Data validation
- Preprocessing pipeline
- Data download notebook

### Phase 3: EDA (Agent outputs in 5 min)
- EDA notebook with 20+ plots
- Statistical analysis
- Visualization utilities
- EDA report generation

### Phase 4: Feature Engineering (Agent outputs in 5 min)
- Adstock transformation
- Saturation curves
- Hierarchical encoding
- Feature engineering notebook

### Phase 5: Model Training (Agent outputs in 6 min)
- MMM model implementation
- Training pipeline
- Hyperparameter configs
- Model training notebook

### Phase 6: Curve Estimation (Agent outputs in 5 min)
- ROI curve extraction
- Visualization generation
- Curve analysis notebook
- 60+ curve plots

### Phase 7: Simulator (Agent outputs in 6 min)
- Scenario analyzer
- Budget optimizer
- Interactive simulator notebook
- CLI tool

### Phase 8: Testing & Docs (Agent outputs in 5 min)
- Comprehensive test suite
- Final documentation
- User guides
- Deployment instructions

**Total Time: ~45 minutes** (vs 200+ hours manual)

---

## 🎯 Success Criteria

### Code Quality
- ✅ PEP8 compliant
- ✅ Type hints throughout
- ✅ Docstrings for all functions
- ✅ <15 line functions (mostly)
- ✅ No code duplication

### Model Quality
- ✅ R² > 0.85 on test set
- ✅ MAPE < 10% on test set
- ✅ Economically sensible coefficients
- ✅ Stable ROI curves
- ✅ Passes validation checks

### Usability
- ✅ One-command setup
- ✅ Interactive notebooks work out-of-box
- ✅ Simulator is intuitive
- ✅ Clear documentation
- ✅ Easy to customize

### Completeness
- ✅ All 6 notebooks functional
- ✅ All visualizations generated
- ✅ Trained model included
- ✅ Tests pass
- ✅ Documentation complete

---

## 🔧 Next Steps

### Step 1: Review This Plan
- [ ] Confirm approach is sound
- [ ] Adjust any requirements
- [ ] Add/remove agents as needed

### Step 2: Create MMM Agents
- [ ] Define agent roles in orchestrator
- [ ] Create specific prompt templates
- [ ] Configure parallel/sequential flow

### Step 3: Test with Simple Example
- [ ] Run with basic configuration
- [ ] Verify outputs are correct
- [ ] Iterate on agent prompts

### Step 4: Full Implementation
- [ ] Generate complete MMM project
- [ ] Validate all outputs
- [ ] Test notebooks manually
- [ ] Deploy and document

---

## 💡 Innovation Highlights

This MMM example showcases:

1. **Data Science Integration** - First ML/DS example in framework
2. **Academic Rigor** - Based on published research
3. **Production-Ready** - Not a toy model, actually useful
4. **Interactive** - Jupyter notebooks + CLI
5. **Customizable** - Users can adjust parameters
6. **Visual** - 100+ high-quality plots
7. **Actionable** - Simulator provides business insights

---

## 📚 References

- **Dataset**: Kaggle - MMM Weekly Data GeoIndia
- **Science**: Watchtower ML - Hierarchical Bayesian MMM
- **Frameworks**: TensorFlow, Pandas, Matplotlib, Jupyter
- **Inspiration**: Jin et al. (2017), Bayesian Methods for Media Mix Modeling

---

**Ready to implement?** Let me know if you want to proceed with creating the agents!
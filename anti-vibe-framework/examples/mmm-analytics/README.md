# 🧪 Marketing Mix Modeling (MMM) Analytics

## Complete Data Science Pipeline Generator

This example generates a **production-ready Marketing Mix Modeling pipeline** using:
- **Keras 3.x** for deep learning
- **Python 3.13** with modern syntax
- **Multi-agent orchestration** for code generation
- **Academic research** (Bayesian hierarchical MMM)

---

## 🎯 What Gets Generated

### **60+ Python Files** (.py, not notebooks!)

```
mmm-marketing-analytics/
├── src/                           # Source code (15+ modules)
│   ├── data/                      # Data pipeline
│   ├── eda/                       # Exploratory analysis
│   ├── features/                  # Feature engineering
│   ├── models/                    # Keras models
│   ├── curves/                    # ROI extraction
│   └── simulator/                 # What-if simulator
│
├── scripts/                       # 7 CLI scripts
│   ├── 01_download_data.py
│   ├── 02_run_eda.py
│   ├── 03_engineer_features.py
│   ├── 04_train_model.py
│   ├── 05_generate_curves.py
│   ├── 06_run_simulator.py
│   └── run_full_pipeline.py
│
├── tests/                         # Pytest test suite
├── config/                        # YAML configurations
├── outputs/                       # Generated outputs
│   ├── figures/                   # 100+ visualizations
│   └── models/                    # Trained models
└── requirements.txt               # Python dependencies
```

---

## ⚡ Quick Start

### **Step 1: Generate the Project**

```bash
# From anti-vibe-framework directory
npm run example:mmm-analytics

# Or directly:
python examples/mmm-analytics/run.py
```

**Time:** ~45 minutes
**Agents working:** 6 specialized agents
**Files created:** 60+

---

### **Step 2: Set Up Environment**

```bash
cd output/mmm-marketing-analytics

# Create virtual environment with Python 3.13
python3.13 -m venv venv

# Activate
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

---

### **Step 3: Copy Kaggle Credentials**

```bash
# Copy kaggle.json to project
cp ../../../kaggle.json ./
```

---

### **Step 4: Run the Pipeline**

```bash
# Option A: Run complete pipeline
python scripts/run_full_pipeline.py

# Option B: Step-by-step
python scripts/01_download_data.py
python scripts/02_run_eda.py
python scripts/03_engineer_features.py
python scripts/04_train_model.py --epochs 1000
python scripts/05_generate_curves.py
python scripts/06_run_simulator.py --interactive
```

---

## 🎨 What Each Script Does

### 📥 **Script 1: Download Data**

```bash
python scripts/01_download_data.py \
    --dataset subhagatoadak/mmm-weekly-data-geoindia \
    --output data/raw/
```

**Does:**
- Downloads from Kaggle using kagglehub
- Validates data schema
- Creates data dictionary
- Saves to data/raw/

**Output:**
- data/raw/mmm_data.csv
- data/raw/data_dictionary.json

---

### 📊 **Script 2: Run EDA**

```bash
python scripts/02_run_eda.py \
    --input data/raw/mmm_data.csv \
    --output outputs/figures/eda/ \
    --report outputs/reports/eda_report.html
```

**Does:**
- Generates 20+ visualizations
- Statistical summaries
- Correlation analysis
- Seasonality decomposition
- Creates interactive HTML report

**Output:**
- 20+ PNG plots in outputs/figures/eda/
- outputs/reports/eda_report.html

**Visualizations:**
1. Sales trends by brand
2. Sales trends by region
3. Marketing spend over time
4. Spend distribution by channel
5. Sales vs TV spend scatter
6. Sales vs Digital spend scatter
7. Sales vs Print spend scatter
8. Sales vs OOH spend scatter
9. Correlation heatmap
10. Brand performance comparison
11. Regional performance comparison
12. Seasonality decomposition
13. Price distribution
14. Outlier detection
15. Box plots for all channels
16. Time series decomposition
17. Weekly patterns
18. Holiday effects
19. External factors impact
20. Summary statistics tables

---

### 🔧 **Script 3: Engineer Features**

```bash
python scripts/03_engineer_features.py \
    --input data/raw/mmm_data.csv \
    --output data/processed/features.parquet \
    --config config/feature_config.yaml
```

**Does:**
- Adstock transformation (16-week carryover)
- Saturation curves
- Seasonal features
- Price elasticity
- Hierarchical encoding

**Output:**
- data/processed/features.parquet
- data/processed/feature_metadata.json

**Features Created:**
- tv_adstocked, digital_adstocked, print_adstocked, ooh_adstocked
- tv_saturated, digital_saturated, print_saturated, ooh_saturated
- week_of_year, is_holiday, season
- price_normalized, price_index
- brand_region_channel_id

---

### 🏋️ **Script 4: Train Model**

```bash
python scripts/04_train_model.py \
    --data data/processed/features.parquet \
    --config config/model_config.yaml \
    --output outputs/models/ \
    --epochs 1000
```

**Does:**
- Loads prepared features
- Builds Keras 3.x MMM model
- Trains with callbacks (EarlyStopping, Checkpointing)
- Evaluates on test set
- Saves trained model

**Output:**
- outputs/models/mmm_model.keras
- outputs/models/training_history.csv
- outputs/models/evaluation_metrics.json

**Model Metrics:**
- R² score
- MAPE (Mean Absolute Percentage Error)
- MAE (Mean Absolute Error)
- RMSE (Root Mean Squared Error)

---

### 📈 **Script 5: Generate ROI Curves**

```bash
python scripts/05_generate_curves.py \
    --model outputs/models/mmm_model.keras \
    --output outputs/figures/roi_curves/ \
    --format png
```

**Does:**
- Loads trained model
- Extracts learned ROI curves
- Generates 60+ curve visualizations
- Creates efficiency frontiers
- Calculates marginal ROIs

**Output:**
- 60+ PNG plots (one per channel/brand/region combo)
- Interactive Plotly HTML files
- outputs/reports/roi_curves_summary.html

**Curves:**
- 4 channels × 5 brands × 4 regions = 80 curves
- Each showing diminishing returns
- Optimal spend ranges highlighted

---

### 🎮 **Script 6: Run Simulator**

```bash
python scripts/06_run_simulator.py --interactive
```

**Does:**
- Loads trained model
- Interactive CLI for what-if analysis
- Budget optimization
- Scenario comparison

**Example Session:**
```
🎮 MARKETING BUDGET SIMULATOR
====================================

Options:
  1. Simulate scenario
  2. Optimize budget
  3. Compare scenarios
  4. Exit

Choose option: 1

Brand: Brand_A
Region: North
TV spend: $1500000
Digital spend: $800000
Print spend: $200000
OOH spend: $100000

RESULTS:
──────────────────────────────────
Predicted Sales: $4,567,890
Total Spend: $2,600,000
ROI: 1.76x
Incremental vs baseline: $1,234,567

Channel Contributions:
  TV: $2,456,789 (53.8%)
  Digital: $1,678,901 (36.8%)
  Print: $234,567 (5.1%)
  OOH: $197,633 (4.3%)
```

---

## 🎯 Key Features

### ✅ **Automated Data Download**
```python
# No manual Kaggle downloads!
from src.data.kaggle_loader import KaggleDataLoader

loader = KaggleDataLoader(credentials_path="./kaggle.json")
data_path = loader.download("subhagatoadak/mmm-weekly-data-geoindia")
```

### ✅ **Comprehensive EDA**
20+ publication-quality visualizations automatically generated and saved.

### ✅ **Feature Engineering**
```python
from src.features.adstock import beta_gamma_decay

# Apply adstock transformation
tv_adstocked = beta_gamma_decay(
    tv_spend,
    beta=0.5,  # Immediate decay
    gamma=0.8,  # Exponential decay
    max_lag=16  # 16 weeks carryover
)
```

### ✅ **Keras 3.x Model**
```python
import keras
from src.models.mmm_model import MarketingMixModel

# Create model
model = MarketingMixModel(
    n_channels=4,
    n_brands=5,
    n_regions=4
)

# Compile
model.compile(
    optimizer=keras.optimizers.Adam(0.001),
    loss="mse",
    metrics=["mae", "mape"]
)

# Train
history = model.fit(X_train, y_train, epochs=1000)

# Save
model.save("mmm_model.keras")
```

### ✅ **ROI Curve Extraction**
```python
from src.curves.roi_extractor import ROICurveExtractor

extractor = ROICurveExtractor(model)
curves = extractor.extract_all_curves()

# Get specific curve
tv_curve_brand_a_north = curves["TV"]["Brand_A"]["North"]

# Evaluate at different spend levels
spend_levels = [0, 500k, 1M, 1.5M, 2M]
impacts = [tv_curve(s) for s in spend_levels]
```

### ✅ **Interactive Simulator**
```python
from src.simulator.scenario_engine import MarketingSimulator

sim = MarketingSimulator.load("outputs/models/mmm_model.keras")

# Simulate scenario
result = sim.simulate_scenario(
    spend={"TV": 1.5M, "Digital": 800k, ...},
    brand="Brand_A",
    region="North"
)

# Optimize budget
optimal = sim.optimize_budget(
    total_budget=10M,
    constraints={"TV": {"min": 0.2, "max": 0.5}}
)
```

---

## 📊 Expected Outputs

### After Running Pipeline:

```
outputs/
├── figures/
│   ├── eda/
│   │   ├── 01_sales_trends.png
│   │   ├── 02_spend_distribution.png
│   │   ├── 03_sales_vs_tv.png
│   │   └── ... (20+ plots)
│   │
│   └── roi_curves/
│       ├── roi_TV_Brand_A_North.png
│       ├── roi_TV_Brand_A_South.png
│       └── ... (60+ curves)
│
├── models/
│   ├── mmm_model.keras            # Trained model
│   ├── training_history.csv       # Loss over epochs
│   └── evaluation_metrics.json    # R², MAPE, etc.
│
└── reports/
    ├── eda_report.html            # Interactive EDA
    ├── roi_curves_summary.html    # All curves
    └── model_report.html          # Model performance
```

---

## 🔬 Technical Details

### Model Architecture

```python
class MarketingMixModel(keras.Model):
    """
    Hierarchical Bayesian MMM with:
    - Adstock (carryover effects)
    - Saturation (diminishing returns)
    - Hierarchical embeddings (brand × region × channel)
    """

    Components:
    - AdstockLayer: Beta-gamma decay
    - SaturationLayer: Sigmoid curve
    - HierarchicalEmbedding: Learned coefficients
    - Baseline: Dense network for trend/externals
```

### Data Flow

```
Raw Data (Kaggle)
  ↓
Preprocessing (cleaning, validation)
  ↓
Feature Engineering (adstock, saturation, seasonality)
  ↓
Model Training (Keras 3.x, 1000 epochs)
  ↓
Evaluation (R², MAPE on test set)
  ↓
Curve Extraction (60+ ROI curves)
  ↓
Simulator (interactive what-if analysis)
```

---

## 🎯 Use Cases

### 1. **Marketing Budget Optimization**
Find the optimal allocation across channels to maximize sales.

### 2. **ROI Measurement**
Understand which channels drive the most incremental sales.

### 3. **Scenario Planning**
Answer questions like:
- "What if we increase TV spend by 20%?"
- "Should we shift budget from Print to Digital?"
- "What's the saturation point for each channel?"

### 4. **Performance Tracking**
Monitor marketing effectiveness over time.

---

## 🚀 How to Run

```bash
# 1. Generate the project
npm run example:mmm-analytics

# 2. Set up Python environment
cd output/mmm-marketing-analytics
python3.13 -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

# 3. Copy Kaggle credentials
cp ../../../kaggle.json ./

# 4. Run the pipeline
python scripts/run_full_pipeline.py

# 5. Explore results
open outputs/reports/eda_report.html
open outputs/figures/roi_curves/
python scripts/06_run_simulator.py --interactive
```

---

## 📚 What You Learn

By exploring this generated project:

1. **Marketing Analytics**
   - ROI measurement
   - Attribution modeling
   - Budget optimization

2. **Machine Learning**
   - Custom Keras layers
   - Hierarchical models
   - Regularization techniques

3. **Data Science**
   - EDA best practices
   - Feature engineering
   - Time series modeling

4. **Software Engineering**
   - Clean code structure
   - Type hints
   - Testing
   - CLI tools

---

## 🎨 Customization

Edit `run.py` to customize:

```python
project_config = MLProjectConfig(
    # Change dataset
    kaggle_dataset="your-custom-dataset",

    # Adjust features
    features=[
        # Add more transformations
        "Different saturation curves",
        "Additional external factors",
        # ...
    ],

    # Modify tech stack
    tech_stack={
        "ml_framework": "PyTorch",  # Instead of Keras
        # ...
    }
)
```

---

## 📖 Documentation

Generated project includes:
- README with setup instructions
- Model architecture documentation
- Mathematical equations explained
- Simulator user guide
- API reference for all modules

---

## 🎉 Why This Is Special

**Traditional approach:**
- 200+ hours of manual coding
- Copy-pasting from multiple sources
- Debugging mathematical implementations
- Creating visualizations from scratch

**This framework:**
- 45 minutes of generation
- Production-ready code
- Tested implementations
- Beautiful visualizations
- Complete documentation

**Time saved: 99.6%** 🚀

---

## 🆘 Troubleshooting

### Python 3.13 not found

```bash
# Check Python version
python3 --version

# Install Python 3.13
# Visit: https://www.python.org/downloads/
```

### Kaggle API errors

```bash
# Verify kaggle.json exists
cat kaggle.json

# Should contain:
# {"username":"your-username","key":"your-key"}
```

### Keras 3.x issues

```bash
# Make sure you have the right version
pip install --upgrade keras>=3.0.0
```

---

**Ready to generate your MMM project?** 🎯

Run:
```bash
npm run example:mmm-analytics
```

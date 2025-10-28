"""
Marketing Mix Modeling (MMM) Analytics Generator

This script generates a complete MMM data science project using multi-agent orchestration.
"""

import os
import sys
import asyncio
from pathlib import Path

# Add parent directory to path to import orchestrator
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from src.python_orchestrator import PythonMLOrchestrator, MLProjectConfig
from dotenv import load_dotenv

# Load environment variables
env_path = Path(__file__).parent.parent.parent / ".env"
load_dotenv(env_path)


async def main():
    # Verify API key
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        print("❌ Error: ANTHROPIC_API_KEY not found in .env file")
        print("\nPlease create a .env file with:")
        print("ANTHROPIC_API_KEY=your_key_here")
        sys.exit(1)

    # 🧪 Marketing Mix Modeling Project Configuration
    project_config = MLProjectConfig(
        name="mmm-marketing-analytics",
        description="""
        Complete Marketing Mix Modeling (MMM) pipeline for analyzing marketing effectiveness
        and optimizing budget allocation across channels, brands, and regions.

        Based on academic research (Bayesian hierarchical MMM) and implemented using
        Keras 3.x with Python 3.13.
        """,

        tech_stack={
            "language": "Python 3.13",
            "ml_framework": "Keras 3.x (https://keras.io/)",
            "backend": "TensorFlow 2.16+ (as Keras backend)",
            "data": "Pandas 2.x + NumPy",
            "visualization": "Matplotlib + Seaborn + Plotly",
            "optimization": "SciPy",
            "cli": "Typer + Rich",
            "testing": "Pytest",
        },

        features=[
            # ═══════════════════════════════════════════════════════
            # DATA PIPELINE
            # ═══════════════════════════════════════════════════════
            "Kaggle API integration for automatic dataset download",
            "Data validation and quality checks (missing values, outliers, schema)",
            "Data preprocessing and cleaning pipeline",
            "Train/validation/test time-based split (respect temporal order)",
            "Data export to optimized parquet format",

            # ═══════════════════════════════════════════════════════
            # EXPLORATORY DATA ANALYSIS
            # ═══════════════════════════════════════════════════════
            "Sales trends visualization (by brand, region, time)",
            "Marketing spend distribution analysis",
            "Channel effectiveness preliminary analysis",
            "Correlation heatmaps (sales vs all marketing channels)",
            "Seasonality decomposition and visualization",
            "Brand performance comparison plots",
            "Regional performance comparison plots",
            "Scatter plots: Sales vs each marketing channel",
            "Box plots: Spend distribution by channel",
            "Time series decomposition (trend, seasonal, residual)",
            "Outlier detection and visualization",
            "Statistical summary tables (mean, median, std, etc.)",
            "Distribution plots for all continuous variables",
            "Interactive HTML report with all EDA visualizations",

            # ═══════════════════════════════════════════════════════
            # FEATURE ENGINEERING
            # ═══════════════════════════════════════════════════════
            "Beta-Gamma adstock transformation (marketing carryover effects, 16 week lag)",
            "Sigmoid saturation curves (diminishing returns modeling)",
            "Polynomial saturation curves (alternative formulation)",
            "Piecewise linear saturation (flexible curve fitting)",
            "Hierarchical encoding (brand × region × channel combinations)",
            "Seasonal indicator features (week of year, holidays)",
            "Price normalization and elasticity features",
            "Lag features for external factors",
            "Rolling statistics (moving averages, rolling sums)",

            # ═══════════════════════════════════════════════════════
            # MODEL ARCHITECTURE (Keras 3.x)
            # ═══════════════════════════════════════════════════════
            "Custom Keras layer: AdstockLayer (carryover effects)",
            "Custom Keras layer: SaturationLayer (diminishing returns)",
            "Custom Keras layer: HierarchicalEmbedding (brand/region/channel coefficients)",
            "Main MarketingMixModel (keras.Model subclass)",
            "Baseline network (Dense layers for trend and external factors)",
            "Price elasticity component (multiplicative effect)",
            "Media impact aggregation across channels",

            # ═══════════════════════════════════════════════════════
            # TRAINING & OPTIMIZATION
            # ═══════════════════════════════════════════════════════
            "Model training with Adam optimizer",
            "Early stopping callback (patience=50)",
            "Model checkpointing (save best model)",
            "Learning rate scheduling (ReduceLROnPlateau)",
            "Training history logging to CSV",
            "Regularization with economic priors (positive ROI, concave curves)",
            "Multiple loss metrics (MSE, MAE, MAPE)",
            "Training visualization (loss curves, metrics over epochs)",

            # ═══════════════════════════════════════════════════════
            # MODEL EVALUATION
            # ═══════════════════════════════════════════════════════
            "Model evaluation on test set (R², MAPE, MAE)",
            "Prediction vs actual plots",
            "Residual analysis",
            "Channel contribution decomposition",
            "Feature importance analysis",

            # ═══════════════════════════════════════════════════════
            # ROI CURVE ESTIMATION
            # ═══════════════════════════════════════════════════════
            "Extract learned ROI curves from trained model",
            "Generate curves for all channel × brand × region combinations (60+ curves)",
            "Visualize saturation effects",
            "Calculate marginal ROI at different spend levels",
            "Identify optimal spend ranges (before saturation)",
            "Create efficiency frontier plots",
            "Confidence intervals for curves (if applicable)",
            "Export curves to interactive Plotly HTML",

            # ═══════════════════════════════════════════════════════
            # SIMULATOR & OPTIMIZATION
            # ═══════════════════════════════════════════════════════
            "Interactive CLI for what-if scenario analysis",
            "Budget allocation optimizer (constrained optimization)",
            "Scenario comparison tool (side-by-side analysis)",
            "Sensitivity analysis (impact of ±10%, ±20% changes)",
            "Channel reallocation recommendations",
            "Export simulation results to CSV/JSON",
            "Batch scenario runner for multiple what-if cases",

            # ═══════════════════════════════════════════════════════
            # CODE QUALITY & TESTING
            # ═══════════════════════════════════════════════════════
            "Type hints using Python 3.13 syntax (| for unions, type aliases)",
            "Comprehensive docstrings (Google style)",
            "PEP8 compliant code",
            "Unit tests for all data functions (pytest)",
            "Integration tests for model pipeline",
            "Model validation tests",
            "Simulator tests with mock data",
            "Code coverage reporting (>80% target)",

            # ═══════════════════════════════════════════════════════
            # DOCUMENTATION
            # ═══════════════════════════════════════════════════════
            "README with quickstart guide",
            "Model architecture documentation",
            "Mathematical equations explained",
            "Simulator user guide",
            "API reference for all modules",
            "Academic paper citations",
            "Configuration guide (all hyperparameters explained)",
        ],

        kaggle_dataset="subhagatoadak/mmm-weekly-data-geoindia",
        kaggle_credentials=str(Path(__file__).parent.parent.parent.parent / "kaggle.json"),

        output_path=str(Path(__file__).parent.parent.parent / "output" / "mmm-marketing-analytics"),
    )

    # Create orchestrator
    orchestrator = PythonMLOrchestrator(
        api_key=api_key,
        config={
            "model": "claude-sonnet-4-5-20250929",
            "max_tokens": 8000,
            "verbose": True,
        }
    )

    # Build the project!
    try:
        await orchestrator.build_ml_project(project_config)

        print("\n" + "=" * 70)
        print("\n🧪 MMM ANALYTICS PROJECT - READY FOR DATA SCIENCE!\n")
        print("📖 NEXT STEPS:")
        print("\n1. Navigate to the output:")
        print(f"   cd output/mmm-marketing-analytics")

        print("\n2. Create Python 3.13 virtual environment:")
        print("   python3.13 -m venv venv")
        print("   # On Windows: venv\\Scripts\\activate")
        print("   # On Mac/Linux: source venv/bin/activate")

        print("\n3. Install dependencies:")
        print("   pip install -r requirements.txt")

        print("\n4. Set up Kaggle credentials:")
        print("   # Copy kaggle.json to the project")
        print("   cp ../../kaggle.json ./")

        print("\n5. Run the complete pipeline:")
        print("   python scripts/run_full_pipeline.py")

        print("\n   OR run step-by-step:")
        print("   python scripts/01_download_data.py")
        print("   python scripts/02_run_eda.py")
        print("   python scripts/03_engineer_features.py")
        print("   python scripts/04_train_model.py --epochs 1000")
        print("   python scripts/05_generate_curves.py")
        print("   python scripts/06_run_simulator.py --interactive")

        print("\n6. Explore outputs:")
        print("   # EDA visualizations")
        print("   open outputs/figures/eda/")
        print("   open outputs/reports/eda_report.html")

        print("\n   # ROI curves")
        print("   open outputs/figures/roi_curves/")

        print("\n   # Trained model")
        print("   ls outputs/models/mmm_model.keras")

        print("\n7. Run tests:")
        print("   pytest tests/ -v --cov=src")

        print("\n💡 PRO TIP:")
        print("   The simulator is interactive! Try:")
        print("   python scripts/06_run_simulator.py --interactive")
        print("\n" + "=" * 70 + "\n")

    except Exception as error:
        print(f"\n❌ Build failed: {error}")
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())

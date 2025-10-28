import kagglehub

# Download latest version
path = kagglehub.dataset_download("subhagatoadak/mmm-weekly-data-geoindia")

print("Path to dataset files:", path)
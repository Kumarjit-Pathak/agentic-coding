# 🔒 Security Setup - Protecting Your API Keys

## ⚠️ IMPORTANT: Never Commit Secrets!

This framework uses sensitive credentials:
- **ANTHROPIC_API_KEY** - Your Claude API key
- **kaggle.json** - Your Kaggle API credentials

**These must NEVER be committed to git!**

---

## ✅ What's Protected (Already Configured)

The `.gitignore` file is pre-configured to protect:

```bash
# Environment variables & API Keys
.env                    # ← Your Anthropic API key
.env.local
.env.*.local

# Kaggle credentials (NEVER commit this!)
kaggle.json            # ← Your Kaggle API credentials
.kaggle/               # ← Kaggle config directory
```

---

## 📝 What's Safe to Commit

These example files are safe (and should be committed):

```bash
# Template files (no real credentials)
.env.example           # Shows structure, no real key
kaggle.json.example    # Shows format, no real credentials
```

---

## 🔧 Setup Instructions

### For New Users (Cloning the Repo):

**Step 1: Clone the repository**
```bash
git clone <repo-url>
cd anti-vibe-framework
```

**Step 2: Create .env from example**
```bash
cp .env.example .env
```

**Step 3: Add your Anthropic API key**
```bash
# Edit .env
# Replace 'your-key-here' with your actual key from:
# https://console.anthropic.com/
```

Your `.env` should look like:
```bash
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
```

**Step 4: Create kaggle.json (if using MMM example)**
```bash
cp kaggle.json.example kaggle.json
```

**Step 5: Add your Kaggle credentials**
```bash
# Edit kaggle.json
# Get your credentials from: https://www.kaggle.com/settings
```

Your `kaggle.json` should look like:
```json
{
  "username": "your-actual-username",
  "key": "your-actual-kaggle-api-key"
}
```

---

## ✅ Verification

### Check that secrets are ignored:

```bash
# This should NOT show .env or kaggle.json
git status

# This should show they're ignored
git check-ignore .env kaggle.json
# Output should be:
# .env
# kaggle.json
```

### Verify example files are tracked:

```bash
# This SHOULD show these files
git add .env.example kaggle.json.example
git status
# Should show them as staged (green)
```

---

## 🚨 What Happens If You Commit Secrets?

**If you accidentally commit .env or kaggle.json:**

### Immediate Actions:

**1. Revoke the compromised keys immediately!**
```bash
# Anthropic API Key:
# Go to https://console.anthropic.com/
# Delete the exposed key
# Generate a new one

# Kaggle API:
# Go to https://www.kaggle.com/settings
# Regenerate your API token
```

**2. Remove from git history** (if already pushed)
```bash
# WARNING: This rewrites history!
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env kaggle.json" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (coordinate with team first!)
git push origin --force --all
```

**3. Update your .env and kaggle.json with new keys**

---

## 📋 Pre-Commit Checklist

Before every commit, check:

- [ ] `git status` shows NO .env or kaggle.json
- [ ] `.env.example` exists and has no real keys
- [ ] `kaggle.json.example` exists and has no real credentials
- [ ] `.gitignore` includes .env and kaggle.json
- [ ] You haven't added files with `git add .` blindly

---

## 🛡️ Additional Security Best Practices

### 1. Use Environment-Specific Keys

```bash
# Development
.env.development

# Production
.env.production

# All should be gitignored!
```

### 2. Rotate Keys Regularly

- Change API keys every 3-6 months
- Especially if they're shared across team

### 3. Use Key Management Tools

For production:
- AWS Secrets Manager
- HashiCorp Vault
- Azure Key Vault
- Google Secret Manager

### 4. Limit Key Permissions

- Use read-only keys when possible
- Set spending limits on API keys
- Monitor usage regularly

---

## 🎯 Framework-Specific Security

### .env File

**What it contains:**
```bash
ANTHROPIC_API_KEY=sk-ant-...     # For Claude API calls
MODEL=claude-sonnet-4-5-20250929  # Optional: model selection
MAX_TOKENS=4096                   # Optional: token limit
VERBOSE=true                      # Optional: logging
```

**Never commit this!** Already in .gitignore ✅

---

### kaggle.json File

**What it contains:**
```json
{
  "username": "your-kaggle-username",
  "key": "a1b2c3d4e5f6g7h8i9j0..."
}
```

**Used for:**
- MMM Analytics example
- Downloading datasets from Kaggle
- Authentication with Kaggle API

**Never commit this!** Now in .gitignore ✅

---

## 📚 Example Files (Safe to Commit)

### .env.example
```bash
# Safe - no real keys
ANTHROPIC_API_KEY=your_key_here
MODEL=claude-sonnet-4-5-20250929
MAX_TOKENS=4096
```

### kaggle.json.example
```json
{
  "username": "your-kaggle-username",
  "key": "your-kaggle-api-key-here"
}
```

---

## ✅ Quick Security Check

Run this to verify your setup:

```bash
# Should show .env and kaggle.json are ignored
git status --ignored | grep -E "\\.env|kaggle\\.json"

# Should output:
# .env
# kaggle.json
```

If you see them, you're protected! ✅

---

## 🎓 Teaching Security to New Users

When sharing this framework, remind users:

```
⚠️  SECURITY CHECKLIST:

Before running examples:
1. ✅ Create .env from .env.example
2. ✅ Add your real API keys
3. ✅ Create kaggle.json from kaggle.json.example (for MMM)
4. ✅ Verify .gitignore includes these files

Before committing:
1. ✅ Run 'git status' - NO .env or kaggle.json should appear
2. ✅ Never use 'git add .' blindly
3. ✅ Review files before committing
4. ✅ Double-check no secrets in code

If you expose keys:
1. ⚠️  Revoke them IMMEDIATELY
2. ⚠️  Generate new ones
3. ⚠️  Remove from git history if pushed
```

---

## 🎉 Summary

✅ **.gitignore updated** to include:
- .env (all variants)
- kaggle.json
- .kaggle/ directory

✅ **Example files created**:
- .env.example (safe to commit)
- kaggle.json.example (safe to commit)

✅ **Security documented**:
- Setup instructions
- Verification steps
- Incident response
- Best practices

**Your credentials are now protected!** 🔒

---

## 🚀 Next Steps for Users

```bash
# 1. Copy example files
cp .env.example .env
cp kaggle.json.example kaggle.json

# 2. Add real credentials
# Edit .env - add your Anthropic key
# Edit kaggle.json - add your Kaggle credentials

# 3. Verify they're ignored
git status  # Should NOT show .env or kaggle.json

# 4. You're ready!
npm run example:mmm-analytics
```

**Stay safe! Never commit secrets!** 🔒

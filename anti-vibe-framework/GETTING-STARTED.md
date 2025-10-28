# 🚀 Getting Started with Anti-Vibe Framework

## What's Available

The framework includes **5 production-ready examples**:

| Example | Type | Language | Time | Best For |
|---------|------|----------|------|----------|
| Todo API | Backend | TypeScript | 4 min | Learning basics |
| Meme Generator | Backend | TypeScript | 5 min | Fun projects |
| Game Leaderboard | Backend | TypeScript | 5 min | Gaming/Real-time |
| Quiz Platform | Backend | TypeScript | 6 min | Education |
| **MMM Analytics** | Data Science | **Python 3.13** | 45 min | **ML/Business** |

---

## 5-Minute Quick Start

### Step 1: Install Dependencies (1 minute)

```bash
cd anti-vibe-framework
npm install
```

### Step 2: Configure API Key (1 minute)

```bash
# Copy the example
cp .env.example .env

# Edit .env and add your Anthropic API key
# Get your key from: https://console.anthropic.com/
```

Your `.env` should look like:
```bash
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

### Step 3: Test Your Setup (1 minute)

```bash
npm run test-setup
```

You should see:
```
🔍 Testing Anti-Vibe Framework Setup
==================================================

1. Checking .env file...
  ✓ .env file found
  ✓ API key loaded

2. Testing Anthropic API connection...
  ✓ API connection successful
  ✓ Model: claude-sonnet-4-5-20250929

3. Checking Node.js version...
  ✓ Node.js v20.x.x (>= 18 required)

4. Checking TypeScript...
  ✓ TypeScript installed

✅ ALL TESTS PASSED!
```

### Step 4: Build Your First Project (2 minutes)

```bash
npm run example:todo-api
```

Watch the magic happen:
```
🎯 ANTI-VIBE FRAMEWORK: Building todo-api

📋 PHASE 1: PLANNING (Thinking Mode)
  ✓ Architecture planned
  ✓ File structure defined
  ✓ Dependencies identified

⚡ PHASE 2: PARALLEL GENERATION
  ✓ Database Agent: 4 files generated
  ✓ API Agent: 8 files generated
  ✓ Test Agent: 5 files generated

📚 PHASE 3: DOCUMENTATION
  ✓ Docs Agent: 4 files generated

💾 PHASE 4: SAVING FILES
  ✓ 21 files saved to output/todo-api

🎉 SUCCESS!
```

### Step 5: Explore Your Generated Project

```bash
cd output/todo-api
ls -la

# You'll see:
# src/          - All source code
# tests/        - Complete test suite
# docs/         - API documentation
# README.md     - Setup instructions
# package.json  - Dependencies
```

---

## What Just Happened?

In less than 5 minutes, you:

1. ✅ Installed the framework
2. ✅ Configured your API key
3. ✅ Generated a complete REST API
4. ✅ Got database schema, API endpoints, tests, and docs
5. ✅ Everything is production-ready

**Traditional development time:** 8-40 hours
**Your time:** 4 minutes
**Time saved:** 99.2%

---

## Next Steps

### Option A: Use the Generated Project

```bash
cd output/todo-api

# Install dependencies
npm install

# Set up database
npx prisma migrate dev

# Run the server
npm run dev

# In another terminal, run tests
npm test
```

### Option B: Create Your Own Project

1. Copy an example:
   ```bash
   cp examples/todo-api/run.ts examples/my-project/run.ts
   ```

2. Modify the config:
   ```typescript
   const projectConfig: ProjectConfig = {
     name: "my-awesome-api",
     description: "What your API does",
     techStack: {
       backend: "Express.js with TypeScript",
       database: "PostgreSQL",
     },
     features: [
       "Your feature 1",
       "Your feature 2",
       // ...
     ],
   };
   ```

3. Run it:
   ```bash
   ts-node examples/my-project/run.ts
   ```

### Option C: Dive Deep

Read these guides:
1. [TUTORIAL-TO-IMPLEMENTATION.md](./TUTORIAL-TO-IMPLEMENTATION.md) - Deep dive into how it works
2. [Full Tutorial](../vibe-coding-complete-tutorial.md) - Learn the principles
3. [src/orchestrator.ts](./src/orchestrator.ts) - Read the source code

---

## Common Issues & Solutions

### "ANTHROPIC_API_KEY not found"

**Solution:**
```bash
# Make sure .env exists
ls -la .env

# If not, create it
echo "ANTHROPIC_API_KEY=your_key_here" > .env
```

### "API connection failed"

**Possible causes:**
1. Invalid API key → Get a new one from https://console.anthropic.com/
2. No internet → Check your connection
3. API key expired → Generate a new one

### "Node version too old"

**Solution:**
```bash
# Check current version
node --version

# If < 18, upgrade using nvm:
nvm install 18
nvm use 18
```

### "Files not generated"

**Solution:**
```bash
# Check output directory permissions
ls -la output/

# Try running with verbose mode
DEBUG=true npm run example:todo-api
```

---

## Understanding the Output

### File Structure

```
output/my-project/
├── src/
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── controllers/    # Business logic
│   ├── middleware/     # Auth, validation, etc.
│   ├── utils/          # Helper functions
│   └── index.ts        # Main entry point
├── tests/
│   ├── unit/           # Unit tests
│   └── integration/    # API tests
├── docs/
│   ├── API.md          # API documentation
│   └── SETUP.md        # Setup guide
├── database/
│   └── schema.sql      # Database schema
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
└── README.md           # Project README
```

### What Each Agent Created

- **Planning Agent**: package.json, project structure
- **Database Agent**: schema.sql, models, migrations
- **API Agent**: routes, controllers, middleware
- **Test Agent**: Unit tests, integration tests
- **Docs Agent**: README, API docs, setup guide

---

## Examples to Try

We have **5 production-ready examples** - 4 backend APIs and 1 data science pipeline!

### Backend Examples (TypeScript):

### 1. Meme Generator API (Fun & Social)

```bash
npm run example:meme-generator
```

**Features:**
- Image upload and meme generation
- Text overlay on images
- Social features (likes, comments, shares)
- Trending algorithm
- MongoDB database

**Time:** 5 minutes
**Files:** 29
**Perfect for:** Fun projects, learning image processing

---

### 2. Game Leaderboard API (Real-time & Fast)

```bash
npm run example:game-leaderboard
```

**Features:**
- High-performance ranking system
- Real-time updates via WebSockets
- ELO rating system
- Achievement tracking
- PostgreSQL + Redis caching

**Time:** 5 minutes
**Files:** 32
**Perfect for:** Gaming projects, competitive platforms

---

### 3. Quiz Platform API (Feature-Rich)

```bash
npm run example:quiz-platform
```

**Features:**
- Quiz creation and management
- Timed quizzes with scoring
- Question bank system
- Leaderboards and achievements
- Advanced analytics

**Time:** 6 minutes
**Files:** 35
**Perfect for:** Education platforms, training systems

---

### Data Science Example (Python 3.13):

### 4. Marketing Mix Modeling (MMM) Analytics (Advanced!)

```bash
npm run example:mmm-analytics
```

**Features:**
- Complete ML pipeline using Keras 3.x
- Kaggle data integration
- 20+ EDA visualizations
- Feature engineering (adstock, saturation)
- Trained ML model
- 60+ ROI curve plots
- Interactive budget simulator

**Time:** 45 minutes
**Files:** 60+
**Perfect for:** Business analytics, ML projects, data science portfolios

**What's special:**
- First Data Science example!
- Pure Python scripts (no notebooks)
- Production ML code
- Interactive CLI simulator
- Based on academic research

---

## Tips for Success

### 1. Be Specific in Your Config

**❌ Vague:**
```typescript
features: ["user stuff", "data things"]
```

**✅ Specific:**
```typescript
features: [
  "User registration with email verification",
  "JWT-based authentication with refresh tokens",
  "Password reset via email",
  "Role-based access control (admin, user)"
]
```

### 2. Choose Appropriate Tech Stack

Match your familiarity:
- **Beginner**: Express + SQLite
- **Intermediate**: Express + PostgreSQL
- **Advanced**: Fastify + PostgreSQL + Redis

### 3. Start Small, Then Expand

```typescript
// First iteration
features: ["Basic CRUD operations"]

// After success, expand
features: [
  "Basic CRUD operations",
  "User authentication",
  "Image uploads",
  "Real-time notifications"
]
```

### 4. Review Generated Code

```bash
# Don't just accept it blindly
cd output/my-project
cat src/index.ts    # Understand the main file
cat tests/*.test.ts # Check the tests
cat README.md       # Read the docs
```

### 5. Iterate and Improve

```bash
# Generate
npm run example:my-api

# Review output
cd output/my-api

# Not happy? Adjust config and regenerate
cd ../..
# Edit examples/my-api/run.ts
npm run example:my-api
```

---

## What to Do Next

### Immediate (Next Hour)

- [x] Run test-setup
- [x] Generate your first project
- [ ] Explore the generated code
- [ ] Read the generated README
- [ ] Try running the generated tests

### Short Term (This Week)

- [ ] Customize a project config
- [ ] Generate a project you actually need
- [ ] Deploy the generated project
- [ ] Read TUTORIAL-TO-IMPLEMENTATION.md
- [ ] Share your experience

### Long Term (This Month)

- [ ] Create a custom agent
- [ ] Contribute an example project
- [ ] Help improve the framework
- [ ] Teach others to stop vibe coding

---

## Get Help

- **Questions?** Open an issue
- **Found a bug?** Report it
- **Want to contribute?** Pull requests welcome!
- **Need inspiration?** Check the examples/

---

## The Manifesto

Before you go, repeat after me:

```
I solemnly swear:
✋ I will plan before I code
✋ I will use structured approaches
✋ I will leverage specialized agents
✋ I will never vibe code again*

*Except for quick scripts under 20 lines
```

Now go build something amazing! 🚀

---

---

## Quick Reference: All Examples

```bash
# Backend APIs (TypeScript + Express/Fastify)
npm run example:todo-api              # 4 min - Simple CRUD
npm run example:meme-generator         # 5 min - Image processing + social
npm run example:game-leaderboard       # 5 min - Real-time + performance
npm run example:quiz-platform          # 6 min - Education + analytics

# Data Science / ML (Python 3.13 + Keras 3.x)
npm run example:mmm-analytics          # 45 min - Complete ML pipeline

# Utilities
npm run test-setup                     # Verify installation
npm run clean                          # Clean output directory
```

---

## Example Selection Guide

**Choose based on your goal:**

- 🎓 **Learning?** → Start with `todo-api`
- 😂 **Fun project?** → Try `meme-generator`
- 🎮 **Gaming?** → Use `game-leaderboard`
- 📚 **Education?** → Go with `quiz-platform`
- 🧪 **Data Science/ML?** → Run `mmm-analytics`

---

**Pro tip:** Bookmark this page. You'll reference it often as you learn the framework.

**Remember:** This framework doesn't just generate code. It teaches you HOW to think about software architecture, task decomposition, and systematic development.

Happy building! 😊

import { AntiVibeOrchestrator, ProjectConfig } from "../../src/orchestrator";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("❌ Error: ANTHROPIC_API_KEY not found in .env file");
    process.exit(1);
  }

  // 🧠 Quiz Platform API Configuration
  const projectConfig: ProjectConfig = {
    name: "quiz-platform-api",
    description: "Interactive quiz platform API with timed quizzes, scoring, leaderboards, and social features",

    techStack: {
      backend: "Express.js with TypeScript",
      database: "PostgreSQL with JSON fields for quiz data",
      testing: "Jest with integration tests",
    },

    features: [
      // Quiz Creation & Management
      "Create quizzes with multiple choice questions",
      "Support for true/false questions",
      "Image-based questions support",
      "Quiz categories and tags (Science, History, Pop Culture, etc)",
      "Quiz difficulty levels (Easy, Medium, Hard, Expert)",
      "Public and private quiz visibility",
      "Quiz drafts and publishing workflow",
      "Clone/duplicate existing quizzes",

      // Question Bank System
      "Reusable question bank/library",
      "Import questions from question bank to quizzes",
      "Random question selection from bank",
      "Question versioning and history",
      "Bulk question import (CSV/JSON)",

      // Quiz Taking Experience
      "Timed quizzes with countdown timer",
      "Pause and resume quiz support",
      "Progress saving (return later)",
      "Question randomization",
      "Answer shuffling to prevent cheating",
      "Instant feedback vs. end-of-quiz results",
      "Explanations for correct/incorrect answers",

      // Scoring System
      "Points per question (configurable)",
      "Time-based scoring bonuses",
      "Penalty for wrong answers (optional)",
      "Passing score thresholds",
      "Grade calculation (A, B, C, D, F)",
      "Score normalization across difficulty levels",

      // Leaderboards & Competition
      "Quiz-specific leaderboards",
      "Category leaderboards",
      "Global user rankings",
      "Fastest completion time tracking",
      "Perfect score hall of fame",
      "Weekly quiz champions",

      // User Features
      "User authentication with JWT",
      "User profiles with quiz history",
      "Favorite/bookmark quizzes",
      "Follow quiz creators",
      "Personal statistics dashboard",
      "Achievement badges (quiz master, speed demon, etc)",

      // Social & Sharing
      "Share quiz results on social media",
      "Challenge friends to beat your score",
      "Quiz comments and ratings",
      "Create quiz collections/playlists",
      "Collaborative quiz creation",

      // Advanced Features
      "Quiz templates for quick creation",
      "Adaptive difficulty (AI-powered question selection)",
      "Practice mode vs. test mode",
      "Certificate generation for passed quizzes",
      "Quiz scheduling (available from/to dates)",
      "Attempt limits per user",

      // Analytics
      "Quiz performance analytics for creators",
      "Question difficulty analysis",
      "Common wrong answers tracking",
      "User engagement metrics",
      "Completion rate tracking",

      // API Features
      "Rate limiting for quiz attempts",
      "Pagination for quiz lists",
      "Advanced search and filtering",
      "WebSocket for live quiz events",
      "Export quiz results to PDF/CSV"
    ],

    outputPath: path.join(__dirname, "../../output/quiz-platform-api"),
  };

  const orchestrator = new AntiVibeOrchestrator({
    apiKey,
    verbose: true,
    maxTokens: 4096,
    thinkingBudget: 3000,
  });

  try {
    await orchestrator.buildProject(projectConfig);

    console.log("\n" + "=".repeat(70));
    console.log("\n🧠 QUIZ PLATFORM API - TEST YOUR KNOWLEDGE!\n");
    console.log("📖 NEXT STEPS:");
    console.log("\n1. Navigate to the output:");
    console.log(`   cd output/quiz-platform-api`);
    console.log("\n2. Install dependencies:");
    console.log("   npm install");
    console.log("\n3. Set up the database:");
    console.log("   npx prisma generate");
    console.log("   npx prisma migrate dev");
    console.log("\n4. Run the server:");
    console.log("   npm run dev");
    console.log("\n5. Create your first quiz:");
    console.log("   curl -X POST http://localhost:3000/api/quizzes \\");
    console.log("     -H 'Content-Type: application/json' \\");
    console.log("     -H 'Authorization: Bearer YOUR_JWT_TOKEN' \\");
    console.log("     -d '{");
    console.log('       "title": "Programming Knowledge Test",');
    console.log('       "category": "Technology",');
    console.log('       "difficulty": "Medium",');
    console.log('       "questions": [');
    console.log('         {');
    console.log('           "text": "What does API stand for?",');
    console.log('           "options": ["A", "B", "C", "D"],');
    console.log('           "correctAnswer": 0');
    console.log("         }");
    console.log("       ]");
    console.log("     }'");
    console.log("\n6. Take a quiz:");
    console.log("   curl http://localhost:3000/api/quizzes/:id/take");
    console.log("\n7. Check the leaderboard:");
    console.log("   curl http://localhost:3000/api/leaderboards/quiz/:id");
    console.log("\n8. Run the tests:");
    console.log("   npm test");
    console.log("\n💡 PRO TIP: Import sample quizzes from the generated seed data!");
    console.log("\n" + "=".repeat(70) + "\n");

  } catch (error) {
    console.error("\n❌ Build failed:", error);
    process.exit(1);
  }
}

main().catch(console.error);

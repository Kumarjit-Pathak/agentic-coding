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

  // 🏆 Game Leaderboard API Configuration
  const projectConfig: ProjectConfig = {
    name: "game-leaderboard-api",
    description: "High-performance REST API for game leaderboards, player rankings, and competitive matchmaking",

    techStack: {
      backend: "Fastify with TypeScript (for blazing speed!)",
      database: "PostgreSQL with optimized indexes for fast queries",
      testing: "Jest with benchmark tests",
    },

    features: [
      // Core Leaderboard Features
      "Submit player scores with automatic ranking",
      "Global leaderboards with pagination",
      "Regional leaderboards (by country/region)",
      "Friend leaderboards (compare with friends only)",
      "Multiple game support (one API, many games)",

      // Time-based Rankings
      "Daily leaderboards (resets every 24 hours)",
      "Weekly leaderboards (Monday reset)",
      "Monthly leaderboards",
      "All-time leaderboards",
      "Season-based leaderboards with season management",

      // Player Profiles
      "Comprehensive player profiles with stats",
      "Player performance history and graphs",
      "Personal best scores tracking",
      "Win/loss ratios and streaks",
      "Player level and experience points (XP) system",

      // Achievements System
      "Achievement definitions and tracking",
      "Unlock achievements based on score milestones",
      "Rare/epic/legendary achievement tiers",
      "Achievement notifications",
      "Player achievement showcases",

      // Anti-Cheat & Verification
      "Score verification system with checksums",
      "Cheat detection (basic anomaly detection)",
      "Flag suspicious scores for review",
      "Admin moderation tools",
      "Score replay validation support",

      // Matchmaking
      "Skill-based matchmaking (ELO rating system)",
      "Find players of similar skill level",
      "Matchmaking queue management",
      "Ranked and casual game modes",

      // Social Features
      "Player following and friends system",
      "Compare stats with specific players",
      "Challenge other players",
      "In-game messages and notifications",

      // Performance & Caching
      "Redis caching for hot leaderboards",
      "Optimized database queries with indexes",
      "Leaderboard snapshot system",
      "Rate limiting for score submission",
      "Batch score updates for efficiency",

      // Analytics
      "Player retention analytics",
      "Score distribution analytics",
      "Game difficulty balancing insights",
      "Peak play time tracking",

      // API Features
      "WebSocket support for real-time rank updates",
      "Pagination with cursor-based navigation",
      "Filtering and sorting options",
      "Bulk operations for game developers",
      "Webhook support for score events"
    ],

    outputPath: path.join(__dirname, "../../output/game-leaderboard-api"),
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
    console.log("\n🏆 GAME LEADERBOARD API - LET THE COMPETITION BEGIN!\n");
    console.log("📖 NEXT STEPS:");
    console.log("\n1. Navigate to the output:");
    console.log(`   cd output/game-leaderboard-api`);
    console.log("\n2. Install dependencies:");
    console.log("   npm install");
    console.log("\n3. Set up the database:");
    console.log("   npx prisma generate");
    console.log("   npx prisma migrate dev");
    console.log("\n4. Start Redis (for caching):");
    console.log("   # Make sure Redis is running locally or set REDIS_URL in .env");
    console.log("   redis-server");
    console.log("\n5. Run the server:");
    console.log("   npm run dev");
    console.log("\n6. Submit a test score:");
    console.log("   curl -X POST http://localhost:3000/api/scores \\");
    console.log("     -H 'Content-Type: application/json' \\");
    console.log("     -d '{\"gameId\":\"my-game\",\"playerId\":\"player123\",\"score\":9999,\"metadata\":{\"level\":10}}'");
    console.log("\n7. Check the leaderboard:");
    console.log("   curl http://localhost:3000/api/leaderboards/my-game/global");
    console.log("\n8. Run the tests:");
    console.log("   npm test");
    console.log("\n💡 PRO TIP: Check out the WebSocket endpoints for real-time updates!");
    console.log("\n" + "=".repeat(70) + "\n");

  } catch (error) {
    console.error("\n❌ Build failed:", error);
    process.exit(1);
  }
}

main().catch(console.error);

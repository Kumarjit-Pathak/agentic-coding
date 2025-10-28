import { AntiVibeOrchestrator, ProjectConfig } from "../../src/orchestrator";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../../.env") });

async function main() {
  // Verify API key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("❌ Error: ANTHROPIC_API_KEY not found in .env file");
    console.error("\nPlease create a .env file with:");
    console.error("ANTHROPIC_API_KEY=your_key_here");
    process.exit(1);
  }

  // Project configuration
  const projectConfig: ProjectConfig = {
    name: "todo-api",
    description: "A complete REST API for managing todos with user authentication",

    techStack: {
      backend: "Express.js with TypeScript",
      database: "PostgreSQL with Prisma ORM",
      testing: "Jest with Supertest",
    },

    features: [
      "User registration and authentication (JWT)",
      "Create, read, update, delete todos",
      "Mark todos as complete/incomplete",
      "Filter todos by status (all, active, completed)",
      "Assign due dates and priorities to todos",
      "Input validation and error handling",
      "API rate limiting",
      "Comprehensive test coverage",
    ],

    outputPath: path.join(__dirname, "../../output/todo-api"),
  };

  // Create orchestrator
  const orchestrator = new AntiVibeOrchestrator({
    apiKey,
    verbose: true,
    maxTokens: 4096,
    thinkingBudget: 3000,
  });

  // Build the project!
  try {
    await orchestrator.buildProject(projectConfig);

    console.log("\n" + "=".repeat(70));
    console.log("\n📖 NEXT STEPS:");
    console.log("\n1. Navigate to the output:");
    console.log(`   cd output/todo-api`);
    console.log("\n2. Install dependencies:");
    console.log("   npm install");
    console.log("\n3. Set up the database:");
    console.log("   npx prisma migrate dev");
    console.log("\n4. Run the server:");
    console.log("   npm run dev");
    console.log("\n5. Run the tests:");
    console.log("   npm test");
    console.log("\n" + "=".repeat(70) + "\n");

  } catch (error) {
    console.error("\n❌ Build failed:", error);
    process.exit(1);
  }
}

main().catch(console.error);

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

  // 🎨 Meme Generator API Configuration
  const projectConfig: ProjectConfig = {
    name: "meme-generator-api",
    description: "A hilarious REST API for creating, storing, and sharing memes with custom captions",

    techStack: {
      backend: "Express.js with TypeScript",
      database: "MongoDB with Mongoose",
      testing: "Jest with Supertest",
    },

    features: [
      // Core Meme Features
      "Upload custom images as meme templates",
      "Add top text and bottom text to memes (classic meme format)",
      "Generate memes with preset popular templates",
      "Save generated memes to user gallery",

      // Social Features
      "Like and favorite memes",
      "Comment on memes with threaded replies",
      "Share memes via unique shareable URLs",
      "Meme leaderboard (most liked memes of the day/week/all-time)",

      // Discovery & Organization
      "Browse meme categories (wholesome, dank, spicy, relatable, etc)",
      "Search memes by caption text or template name",
      "Tag system for meme organization",
      "Trending memes algorithm based on likes and recency",

      // Image Processing
      "Automatic image resizing and optimization",
      "Image cropping and fitting to meme format",
      "Text overlay with customizable fonts and colors",
      "Watermark support for meme creators",

      // User Features
      "User authentication with JWT",
      "User profiles with meme creation statistics",
      "Follow favorite meme creators",
      "User meme collections/albums",

      // API Features
      "Rate limiting to prevent spam",
      "Image validation (size, format, content)",
      "NSFW content filtering (basic)",
      "Export memes in multiple formats (JPG, PNG, WebP)",
      "Random meme endpoint for inspiration",

      // Analytics
      "Track meme views and engagement",
      "Meme creation analytics for users",
      "Popular template tracking"
    ],

    outputPath: path.join(__dirname, "../../output/meme-generator-api"),
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
    console.log("\n😂 MEME GENERATOR API - READY TO MAKE PEOPLE LOL!\n");
    console.log("📖 NEXT STEPS:");
    console.log("\n1. Navigate to the output:");
    console.log(`   cd output/meme-generator-api`);
    console.log("\n2. Install dependencies:");
    console.log("   npm install");
    console.log("\n3. Set up MongoDB:");
    console.log("   # Make sure MongoDB is running locally or set MONGODB_URI in .env");
    console.log("\n4. Run the server:");
    console.log("   npm run dev");
    console.log("\n5. Start creating memes:");
    console.log("   curl -X POST http://localhost:3000/api/memes/generate \\");
    console.log("     -H 'Content-Type: application/json' \\");
    console.log("     -d '{\"template\":\"distracted-boyfriend\",\"topText\":\"Vibe Coding\",\"bottomText\":\"Structured Coding\"}'");
    console.log("\n6. Run the tests:");
    console.log("   npm test");
    console.log("\n💡 PRO TIP: Check out the generated API docs for all endpoints!");
    console.log("\n" + "=".repeat(70) + "\n");

  } catch (error) {
    console.error("\n❌ Build failed:", error);
    process.exit(1);
  }
}

main().catch(console.error);

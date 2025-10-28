import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

async function testSetup() {
  console.log(chalk.bold.cyan("\n🔍 Testing Anti-Vibe Framework Setup\n"));
  console.log(chalk.gray("=".repeat(60)));

  // Test 1: Check .env file
  console.log(chalk.yellow("\n1. Checking .env file..."));
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.log(chalk.red("  ❌ ANTHROPIC_API_KEY not found"));
    console.log(chalk.gray("\n  Please create a .env file with:"));
    console.log(chalk.gray("  ANTHROPIC_API_KEY=your_key_here\n"));
    process.exit(1);
  }

  if (!apiKey.startsWith("sk-ant-")) {
    console.log(chalk.red("  ❌ API key format looks incorrect"));
    console.log(chalk.gray("  It should start with 'sk-ant-'\n"));
    process.exit(1);
  }

  console.log(chalk.green("  ✓ .env file found"));
  console.log(chalk.green(`  ✓ API key loaded (${apiKey.substring(0, 15)}...)`));

  // Test 2: Test API connection
  console.log(chalk.yellow("\n2. Testing Anthropic API connection..."));

  try {
    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: "Respond with exactly: 'API connection successful!'",
        },
      ],
    });

    const response = message.content[0];
    if (response.type === "text" && response.text.includes("successful")) {
      console.log(chalk.green("  ✓ API connection successful"));
      console.log(chalk.green(`  ✓ Model: ${message.model}`));
    } else {
      console.log(chalk.yellow("  ⚠️  API responded but unexpectedly"));
      console.log(chalk.gray(`  Response: ${response.type === "text" ? response.text : "N/A"}`));
    }
  } catch (error) {
    console.log(chalk.red("  ❌ API connection failed"));
    if (error instanceof Error) {
      console.log(chalk.red(`  Error: ${error.message}`));
    }
    console.log(chalk.gray("\n  Possible issues:"));
    console.log(chalk.gray("  - Invalid API key"));
    console.log(chalk.gray("  - Network connectivity"));
    console.log(chalk.gray("  - API key permissions\n"));
    process.exit(1);
  }

  // Test 3: Check Node version
  console.log(chalk.yellow("\n3. Checking Node.js version..."));
  const nodeVersion = process.version;
  const major = parseInt(nodeVersion.slice(1).split(".")[0]);

  if (major >= 18) {
    console.log(chalk.green(`  ✓ Node.js ${nodeVersion} (>= 18 required)`));
  } else {
    console.log(chalk.red(`  ❌ Node.js ${nodeVersion} (>= 18 required)`));
    console.log(chalk.gray("  Please upgrade Node.js\n"));
    process.exit(1);
  }

  // Test 4: Check TypeScript
  console.log(chalk.yellow("\n4. Checking TypeScript..."));
  try {
    require.resolve("typescript");
    console.log(chalk.green("  ✓ TypeScript installed"));
  } catch {
    console.log(chalk.red("  ❌ TypeScript not found"));
    console.log(chalk.gray("  Run: npm install\n"));
    process.exit(1);
  }

  // Success!
  console.log(chalk.gray("\n" + "=".repeat(60)));
  console.log(chalk.bold.green("\n✅ ALL TESTS PASSED!\n"));
  console.log(chalk.cyan("You're ready to use the Anti-Vibe Framework!\n"));
  console.log(chalk.gray("Try running an example:"));
  console.log(chalk.white("  npm run example:todo-api\n"));
}

testSetup().catch((error) => {
  console.error(chalk.red("\n❌ Setup test failed:"), error);
  process.exit(1);
});

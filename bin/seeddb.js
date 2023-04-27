// load .env data into process.env
require("dotenv").config();

// other dependencies
const fs = require("fs");
const chalk = require("chalk");
const db = require("../db/connection");

const runSeedFiles = async () => {
  console.log(chalk.cyan(`-> Loading Seeds ...`));
  const seedFilenames = fs.readdirSync("./db/seeds").sort();

  for (const fn of seedFilenames) {
    const sql = fs.readFileSync(`./db/seeds/${fn}`, "utf8");
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await db.query(sql);
  }
};

const runSeedDB = async () => {
  try {
    process.env.DB_HOST &&
      console.log(
        `-> Connecting to PG on ${process.env.DB_HOST} as ${process.env.DB_USER}...`
      );

    await runSeedFiles();
    process.exit();
  } catch (err) {
    console.error(chalk.red(`Failed due to error: ${err}`));
    process.exit();
  }
};

runSeedDB();

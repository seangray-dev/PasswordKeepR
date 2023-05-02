// load .env data into process.env
require("dotenv").config();

// other dependencies
const fs = require("fs");
const chalk = require("chalk");
const db = require("../db/connection");
const crypto = require("crypto");

const ENCRYPTION_KEY = process.env.CRYPTO_KEY;
const IV_LENGTH = 16;

const encrypt = (text) => {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

const runSeedFiles = async () => {
  console.log(chalk.cyan(`-> Loading Seeds ...`));
  const seedFilenames = fs.readdirSync("./db/seedsJS").sort();

  for (const fn of seedFilenames) {
    const sqlModule = require(`../db/seedsJS/${fn}`);
    const sql = sqlModule.generateSql(encrypt);
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

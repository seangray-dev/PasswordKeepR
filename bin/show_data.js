// load .env data into process.env
require("dotenv").config();

const chalk = require("chalk");
const db = require("../db/connection");

const fetchAll = async (tableName) => {
  const { rows } = await db.query(`SELECT * FROM ${tableName};`);
  return rows;
};

const displayData = async () => {
  const tableNames = [
    "categories",
    "organizations",
    "users",
    "websites",
    "user_passwords",
    "org_passwords",
  ];

  for (const tableName of tableNames) {
    console.log(
      chalk.cyan(`\n-> Fetching data from table: ${chalk.green(tableName)}\n`)
    );

    const rows = await fetchAll(tableName);
    console.table(rows);
  }
};

const showData = async () => {
  try {
    console.log(
      chalk.cyan(
        "-> Connecting to PG on",
        process.env.DB_HOST,
        "as",
        process.env.DB_USER,
        "..."
      )
    );

    await displayData();

    process.exit();
  } catch (err) {
    console.error(chalk.red(`Failed due to error: ${err}`));
    process.exit();
  }
};

showData();

const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.DATABASE_URL;

const db = new pg.Pool({
    connectionString,
    ssl: { rejectUnauthorized: process.env.NODE_ENV === 'development' },
});

module.exports = db;
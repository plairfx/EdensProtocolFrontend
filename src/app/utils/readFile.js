// @ts-nocheck
"use server";
import { getCommitments } from "../../../zk-utils/generate_witness";
import { Pool } from "pg";

// Create connection to Railway PostgreSQL
const pool = new Pool({
  connectionString:
    "postgresql://postgres:GBSfshSQbfFyiboiSpmDDwJZOYrhKbpp@postgres.railway.internal:5432/railway",
  ssl: { rejectUnauthorized: false },
});

export async function loadFromFile(params) {
  try {
    // Fetch CSV data from PostgreSQL instead of filesystem
    const csvName =
      params == "1" ? "edenpl-deposited.csv" : "edenpllink-deposited.csv";

    const result = await pool.query(
      "SELECT csv_data FROM generated_csvs WHERE filename = $1",
      [csvName]
    );

    if (result.rows.length === 0) {
      throw new Error(`CSV file ${csvName} not found in database`);
    }

    const csvData = result.rows[0].csv_data;
    const commitments = getCommitments(csvData);
    return commitments;
  } catch (error) {
    console.error("Error loading CSV:", error);
    throw error;
  }
}

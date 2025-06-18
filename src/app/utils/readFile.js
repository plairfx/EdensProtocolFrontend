// @ts-nocheck
"use server";

import { readFileSync } from "fs";
import { getCommitments } from "../../../zk-utils/generate_witness";

export async function loadFromFile(string) {
  const csvData = readFileSync(
    "/home/administrator/frontend-EP/edenfrontend/dwindexer/generated_csv/EdenPL/edenpl-deposited.csv"
  );
  const csvData2 = readFileSync(
    "/home/administrator/frontend-EP/edenfrontend/dwindexer/generated_csv/EdenPLLINK/edenpllink-deposited.csv",
    "utf8"
  );

  if (string == "11155111") {
    const commitments = getCommitments(csvData);
    return commitments;
  } else {
    const commitments = getCommitments(csvData2);
    return commitments;
  }
}

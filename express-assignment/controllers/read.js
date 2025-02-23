import fs from "fs";
// import { dataFile } from "../index.js";

const reader = async (dataFile) => {
  const data = await fs.readFileSync(dataFile, "utf-8");
  const result = JSON.parse(data);
  return result;
};

export default reader;

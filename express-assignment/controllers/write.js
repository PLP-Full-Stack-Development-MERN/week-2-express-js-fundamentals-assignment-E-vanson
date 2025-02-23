import fs from "fs";
// import { dataFile } from "../index.js";
import { productsDataFile } from "../index.js";
import { userDataFile } from "../index.js";

export const userWriter = async (data) => {
  try {
    let users = [];

    try {
      const data = await fs.readFileSync(userDataFile, "utf-8");
      users = JSON.parse(data) || [];
      if (!Array.isArray(users)) {
        users = [];
      }
    } catch (error) {
      console.log("Error writing to the file", error);
    }

    users.push(data);

    await fs.writeFileSync(userDataFile, JSON.stringify(users, null, 2));
    console.log("User created successfully");
  } catch (error) {
    console.log("Error writing to file", error);
  }
};

export const productsWriter = async (data) => {
  try {
    let products = [];

    try {
      const data = await fs.readFileSync(userDataFile, "utf-8");
      products = JSON.parse(data) || [];
      if (!Array.isArray(products)) {
        products = [];
      }
    } catch (error) {
      console.log("Error writing to the file", error);
    }

    products.push(data);

    await fs.writeFileSync(userDataFile, JSON.stringify(products, null, 2));
    console.log("User created successfully");
  } catch (error) {
    console.log("Error writing to file", error);
  }
};

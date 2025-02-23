import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";

import userRoutes from './routes/userRoutes.js';
import { createUser, getUsers, getUser, updateUser, deleteUser } from "./controllers/userController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const userDataFile = path.join(__dirname, "data", "users.json");
export const productsDataFile = path.join(__dirname, "data", "products.json");

dotenv.config()

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); 

app.post("/createUser", (req, res) => {
     try {
       createUser(req, res);
     } catch (error) {
       res.status(500).send({ message: error.message });
       console.log("err");
     }
})

app.get("/getUsers", (req, res) => {
  try {
    getUsers(req, res);
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log("err");
  }
});

app.get("/getUser/:id", (req, res) => {
  try { 
    getUser(req, res);
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log("err");
  }
});

app.post("/updateUser/:id", (req, res) => {  
    try {
    updateUser(req, res); 
  } catch (error) {
    res.status(500).send({ message: error.message });
  } 
});

app.delete("/deleteUser/:id", (req, res) => {
  try {
    deleteUser(req, res);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const PORT = 5001;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
}); 
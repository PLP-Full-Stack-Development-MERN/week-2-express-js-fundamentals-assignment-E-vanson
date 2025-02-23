import fs from 'fs';
import { userDataFile } from '../index.js';
import { userWriter } from './write.js';
import { v4 as uuidv4 } from 'uuid';
import reader from './read.js';


export const createUser = async (req, res) => {
    console.log("Create user endpoint hit: ");
    const { fullName, email, username, age } = req.body;

    try {
        const users = await reader(userDataFile);
        const user = await users.find((user) => user.email === email);

        if (user) {
            return res
              .status(401)
              .json({
                msg: "User Account Already Exists!!!",
              });            
        }

        const newUser = {
            id: uuidv4(),
            fullName: fullName,
            email: email,
            age: age,
            username: username
        }

        await userWriter(newUser);
        return res.status(201).send(newUser);
    } catch (error) {
         return res.status(501).json({ err: error.message });
    }
}

export const getUsers = async (req, res) => {
    const users = await reader(userDataFile);

    try {
        if (!users) {
            return res
              .status(404)
              .json({
                msg: "No Users found!!!",
              });
        }

        res.status(200).json({ users: users});
    } catch (error) {
        res            
      .status(500)
      .json({ msg: "Error fetch users", error: error.message });      
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const users = await reader(userDataFile);
        const user = await users.find((user) => user.id === id);

        if (!user) {
            return res.status(404).json({
              msg: `No Users found of id: ${id}!!!`,
            });
        }

        return res.status(200).json({ user: user });
    } catch (error) {
        res            
      .status(500)
      .json({ msg: "Error fetching user", error: error.message });          
    }
}

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
 
  try {
      const users = await reader(userDataFile);
      const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ msg: "User account not found" });
    }
      const user = users[userIndex];
      
      Object.keys(updates).forEach((key) => {
          if (updates[key] !== undefined) {
              user[key] = updates[key]
          }
      })
    
    fs.writeFileSync(userDataFile, JSON.stringify(users, null, 2), "utf-8");

    return res.status(200).json({
      msg: "User updated successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const users = await reader(userDataFile);
        const updateUsers = await users.filter((user) => user.id !== id);

        fs.writeFileSync(userDataFile, JSON.stringify(updateUsers, null, 2), "utf-8");
        return res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
         console.error("Error updating user:", error);
         return res.status(500).json({ msg: "Internal server error" });
    }
}
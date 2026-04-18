import exp from 'express';
import { UserModel } from '../models/UserModel.js';
import { ArticleModel } from '../models/ArticleModel.js';
import { verifyToken } from '../middlewares/VerifyToken.js';

export const adminApp = exp.Router();

// 1. GET all users (Users and Authors)
adminApp.get("/users", verifyToken("ADMIN"), async (req, res) => {
    // Find all users who are NOT admins
    const usersList = await UserModel.find({ role: { $ne: "ADMIN" } }).select("-password");
    res.status(200).json({ message: "All users and authors", payload: usersList });
});

// 2. Block or Unblock a User/Author
adminApp.put("/user-status", verifyToken("ADMIN"), async (req, res) => {
    // Get userId and the new status from the body
    const { userId, isUserActive } = req.body;

    // Update the users status
    const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { isUserActive: isUserActive },
        { new: true }
    ).select("-password");

    if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
    }

    const statusMessage = isUserActive ? "activated" : "blocked";
    res.status(200).json({ 
        message: `User has been ${statusMessage} successfully`, 
        payload: updatedUser 
    });
});

// 3. GET all articles (So Admin can monitor content)
adminApp.get("/articles", verifyToken("ADMIN"), async (req, res) => {
    const articles = await ArticleModel.find();
    res.status(200).json({ message: "All articles", payload: articles });
});
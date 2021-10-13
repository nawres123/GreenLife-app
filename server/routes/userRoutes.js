import express from 'express';
const Router = express.Router();
import {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    updateUser,
    getUserById
} from '../controlers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

Router.route('/').post(registerUser);
Router.post('/login', authUser);
Router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

Router.route("/")
    .get(admin, getUsers);
Router.route("/:id")
    .get(admin, getUserById)
    .put(admin, updateUser)
    .delete(admin, deleteUser);

export default Router;
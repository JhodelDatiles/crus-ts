import { type Request, type Response } from "express";
import User from "../models/user.schema.ts";
import { type IUser } from "../interfaces/user.interfaces.ts";

// CREATE
export const createUser = async (
  req: Request<{}, {}, IUser>,
  res: Response,
): Promise<void> => {
  try {
    const { gmail, password } = req.body;

    const userExist = await User.findOne({ $or: [{ gmail }, { password }] });
    if (userExist) {
      res.status(400).json({ success: false, message: "User already exist!" });
      return;
    }

    const newUser = await User.create({ gmail, password });

    res.status(201).json({ success: true, data: newUser });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ (ALL)
export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({ success: true, data: users});
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET USER BY ID
export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-passsword");

    if (!user) {
      res.status(404).json({ success: false, message: "User not found!" });
      return;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
export const updateUser = async (
  req: Request<{ id: string }, {}, Partial<IUser>>,
  res: Response,
): Promise<void> => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }, // 'new' returns the modified document; 'runValidators' ensures schema rules apply
    ).select("-password");

    if (!updateUser) {
      res.status(404).json({ success: false, message: "User not found! " });
      return;
    }

    res.status(200).json({ success: true, data: updateUser });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
export const deleteUser = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
): Promise<void> => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);

    if (!deleteUser) {
      res
        .status(404)
        .json({ success: false, message: "Failed to delete user!" });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully!" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

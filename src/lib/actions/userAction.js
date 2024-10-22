import { data } from "autoprefixer";
import prisma from "../prismaClient";
import bcrypt from "bcrypt";

/**
 * Register new user
 * */
export async function Register({ password, ...data }) {
  try {
    const newUser = await prisma.user.create({
      data: {
        ...data,
        password: bcrypt.hash(password, 10),
      },
    });
    // TODO: Send verification email
    return {
      success: true,
      data: newUser,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message || "Register failed!",
    };
  }
}

/**
 * Get single user with id
 * */
export async function GetUser(id) {
  try {
    return {
      success: true,
      data: "",
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message || "User get failed!",
    };
  }
}

/**
 * Update user information with user id
 * */
export async function UpdateUser({ id, data }) {
  try {
    return {
      success: true,
      data: "",
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message || "User update failed!",
    };
  }
}
/**
 * Delete user with id
 * */
export async function DeleteUser({ id }) {
  try {
    const deletedUser = await prisma.user.update({
      where: { id },
      data: {
        isDeactivate: true,
      },
    });
    return {
      success: true,
      data: "User deleted successfully!",
    };
  } catch (error) {
    return {
      success: false,
      error: error?.message || "User delete failed!",
    };
  }
}

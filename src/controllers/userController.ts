import { Request, Response } from "express";
import prisma from "../prismaClient";
import { userSchema } from "../validators/userValidator";

// CREATE USER
export const createUser = async (req: Request, res: Response) => {
  try {
    // Validasi input
    const parseResult = userSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        errors: parseResult.error.issues.map(e => e.message),
      });
    }

    const { nama, email, no_hp, statusAktif, department } = parseResult.data;

    const user = await prisma.user.create({
      data: { nama, email, no_hp, statusAktif, department },
    });

    res.status(201).json({ message: "User created successfully", data: user });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};

// READ ALL USERS
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ data: users });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE USER BY ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validasi input
    const parseResult = userSchema.partial().safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        errors: parseResult.error.issues.map(e => e.message),
      });
    }

    const { nama, email, no_hp, statusAktif, department } = parseResult.data;

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { nama, email, no_hp, statusAktif, department },
    });

    res.json({ message: "User updated successfully", data: user });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(500).json({ error: error.message });
  }
};

// DELETE USER BY ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "User deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(500).json({ error: error.message });
  }
};

"use server";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import RateLimit from "@/models/RateLimit";
import bcrypt from "bcrypt";
import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { headers } from "next/headers";

async function checkRateLimit(action: string, limit: number, windowMs: number) {
  await connectDB();
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown";

  const rateLimit = await RateLimit.findOneAndUpdate(
    { ip, action },
    { $inc: { count: 1 }, $setOnInsert: { expireAt: new Date(Date.now() + windowMs) } },
    { upsert: true, new: true }
  );

  if (rateLimit.count > limit) {
    throw new Error(`Too many requests for ${action}. Please try again later.`);
  }
}

export async function registerUser(formData: FormData) {
  try {
    await checkRateLimit("register", 5, 15 * 60 * 1000); // 5 per 15 minutes

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!name || !email || !password) {
      return { error: "Missing fields" };
    }

    if (password !== confirmPassword) {
      return { error: "Passwords do not match" };
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: "Email already registered" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { error: error.message || "Failed to register" };
  }
}

export async function loginUser(formData: FormData) {
  try {
    await checkRateLimit("login", 10, 15 * 60 * 1000); // 10 per 15 minutes

    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return { success: true };
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }
    return { error: error.message || "An error occurred." };
  }
}

export async function logoutUser() {
  await signOut({ redirectTo: "/login" });
}

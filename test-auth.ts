import { config } from "dotenv";
config(); // Load environment variables

import { db } from "./db/index";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function testAuth() {
  try {
    console.log("🧪 Testing authentication...");
    
    // Test 1: Check if user exists
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, "dhruv.mahalle@gmail.com"))
      .limit(1);

    if (!user) {
      console.log("❌ User not found in database");
      return;
    }

    console.log("✅ User found:", {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      role: user.role,
    });

    // Test 2: Verify password
    const testPassword = "password123";
    const isPasswordValid = await bcrypt.compare(testPassword, user.password);
    
    if (isPasswordValid) {
      console.log("✅ Password verification successful");
    } else {
      console.log("❌ Password verification failed");
      
      // Let's check the stored hash vs expected
      console.log("Stored hash length:", user.password?.length);
      console.log("Hash starts with:", user.password?.substring(0, 10));
    }

    // Test 3: List all users
    const allUsers = await db.select({
      email: users.email,
      role: users.role,
      isActive: users.isActive,
    }).from(users);
    
    console.log("\n📋 All users in database:", allUsers);

    // Test 4: Test JWT creation
    console.log("\n🔑 Testing JWT...");
    const { createUserToken } = await import("./lib/jwt");
    const token = createUserToken(user.id, user.email, user.role);
    console.log("✅ JWT created successfully:", token.substring(0, 50) + "...");

  } catch (error) {
    console.error("❌ Authentication test failed:", error);
  }
}

testAuth();
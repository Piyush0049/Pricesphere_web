import mongoose, { Schema } from "mongoose";
import IUser from "./types/IUser";
import crypto from "crypto";

const FIXED_SALT = process.env.PASSWORD_SALT || "PricePhere123$%^";

const userSchema = new Schema<IUser>({
  name: { type: String, default: null },
  username: { type: String, unique: true, editLimit: 2 },
  email: { type: String, required: true, unique: true, default: null },
  mode: { type: String, enum: ['public', 'anonymous'], default: "public" },
  address: {
    country: { type: String, default: null },
    addressLine: { type: String, default: null },
    pincode: { type: Number, default: null },
  },
  about: {
    dateOfBirth: { type: String, default: null },
    gender: { type: String, default: null },
  },
  password: { type: String, select: false },
  avatar: {
    url: { type: String, default: null },
    key: { type: String, default: null },
  },
  resetPasswordToken: { type: String, default: null },
  resetTokenExpiry: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.pre<IUser>("save", function (next) {
  if (!this.isModified("password")) return next();
  if (this.password) {
    crypto.pbkdf2(
      this.password,
      FIXED_SALT,
      1000,
      64,
      "sha512",
      (err, derivedKey) => {
        if (err) return next(err);
        this.password = derivedKey.toString("hex");
        next();
      }
    );
  }
});


userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const hashedCandidate = await new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(
      candidatePassword,
      FIXED_SALT,
      1000,
      64,
      "sha512",
      (err, derivedKey) => {
        if (err) reject(err);
        else resolve(derivedKey.toString("hex"));
      }
    );
  });
  return hashedCandidate === this.password;
};

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
import mongoose, { Schema, Document } from "mongoose";
import crypto from "crypto";
import { promisify } from "util";
import { CustomError } from "../middlewares/error";

const pbkdf2Async = promisify(crypto.pbkdf2);

interface IOTP extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
  newUser: {
    username?: string,
    name?: string;
    email: string;
    password: string;
    salt?: string;
  };
}

const OTPSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  newUser: {
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
  },
  createdAt: { type: Date, default: Date.now },
});


OTPSchema.pre<IOTP>("save", async function (next) {
  if (!this.isModified("newUser.password")) return next();

  try {
    const salt = crypto.randomBytes(16).toString("hex");
    this.newUser.salt = salt;

    const derivedKey = await pbkdf2Async(
      this.newUser.password,
      salt,
      1000,
      64,
      "sha512",
    );
    this.newUser.password = derivedKey.toString("hex");

    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new CustomError(error.message));
    } else {
      next(new CustomError('An unknown error occurred.'));
    }
  }
});

const OTPModel = mongoose.models.OTP || mongoose.model<IOTP>("OTP", OTPSchema);

export default OTPModel;

import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { role } from './user.constant';

const userSchema = new Schema<IUser>(
  {
    role: { type: String, enum: role, required: true },
    password: { type: String, required: true },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser, UserModel>('User', userSchema);

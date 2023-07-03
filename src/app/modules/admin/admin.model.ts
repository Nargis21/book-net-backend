/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';
import { role } from './admin.constant';
import bcrypt from 'bcrypt';
import config from '../../../config';

const AdminSchema = new Schema<IAdmin, AdminModel>(
  {
    role: { type: String, enum: role, required: true },
    password: { type: String, required: true, select: 0 },
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
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

AdminSchema.statics.isAdminExist = async function (
  phoneNumber: string
): Promise<Pick<IAdmin, '_id' | 'password' | 'role'> | null> {
  return await Admin.findOne({ phoneNumber }, { _id: 1, password: 1, role: 1 });
};

AdminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

AdminSchema.pre('save', async function (next) {
  //hash password
  const admin = this;
  admin.password = await bcrypt.hash(
    admin.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);

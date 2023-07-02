/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, Types, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { role } from './user.constant';
import config from '../../../config';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<IUser, UserModel>(
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
      unique: true,
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

UserSchema.statics.isUserExist = async function (
  params: string
): Promise<Pick<IUser, '_id' | 'password' | 'role'> | null> {
  let query;

  if (Types.ObjectId.isValid(params)) {
    query = { _id: new Types.ObjectId(params) };
  } else {
    query = { phoneNumber: params };
  }

  return await User.findOne(query, { _id: 1, password: 1, role: 1 });
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

UserSchema.pre('save', async function (next) {
  //hash password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  const update: any = this.getUpdate();

  if (!update.password) {
    // No password update, proceed to the next middleware
    return next();
  }
  // Hash the updated password
  update.password = await bcrypt.hash(
    update.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

UserSchema.methods.toJSON = function () {
  const admin = this.toObject();
  delete admin.password;
  return admin;
};

export const User = model<IUser, UserModel>('User', UserSchema);

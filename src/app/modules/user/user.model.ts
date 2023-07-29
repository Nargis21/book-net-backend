/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, Types, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.isUserExist = async function (
  params: string
): Promise<Pick<IUser, '_id' | 'email'> | null> {
  let query;

  if (Types.ObjectId.isValid(params)) {
    query = { _id: new Types.ObjectId(params) };
  } else {
    query = { email: params };
  }

  return await User.findOne(query, { _id: 1, email: 1 });
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// UserSchema.pre('save', async function (next) {
//   //hash password
//   const user = this;
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds)
//   );
//   next();
// });

export const User = model<IUser, UserModel>('User', UserSchema);

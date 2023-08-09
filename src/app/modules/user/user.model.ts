import { Schema, Types, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

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

export const User = model<IUser, UserModel>('User', UserSchema);

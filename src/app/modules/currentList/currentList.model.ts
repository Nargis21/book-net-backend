import { Schema, model } from 'mongoose';
import { ICurrentList, CurrentListModel } from './currentList.interface';

const CurrentListSchema = new Schema<ICurrentList>(
  {
    email: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CurrentList = model<ICurrentList, CurrentListModel>(
  'CurrentList',
  CurrentListSchema
);

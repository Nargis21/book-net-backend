import { Schema, model } from 'mongoose';
import { BookingModel, IBooking } from './booking.interface';

const BookingSchema = new Schema<IBooking>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    renter: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    house: {
      type: Schema.Types.ObjectId,
      ref: 'House',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = model<IBooking, BookingModel>('Booking', BookingSchema);

import { startSession } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IOrder } from './order.interface';
import { Cow } from '../cow/cow.model';
import { Order } from './order.model';
import { User } from '../user/user.model';

const createOrder = async (orderData: IOrder): Promise<IOrder | null> => {
  //get cow data
  const cowData = await Cow.findById(orderData.cow);

  //get buyer data
  const buyerData = await User.findById(orderData.buyer);

  //get seller data
  const sellerData = await User.findById(cowData?.seller);

  //check enough balance
  if (cowData && buyerData && cowData.price > buyerData.budget) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You have not sufficient money to buy this cow'
    );
  }

  let newOrder = null;
  const session = await startSession();
  try {
    session.startTransaction();

    // Update cow's label to 'sold out'
    if (cowData) {
      cowData.label = 'sold out';
      await cowData.save();
    }

    // Deduct cost from buyer's budget
    if (cowData && buyerData) {
      buyerData.budget -= cowData.price;
      await buyerData.save();
    }

    // Add money to seller's income
    if (cowData && sellerData) {
      sellerData.income += cowData.price;
      await sellerData.save();
    }

    //create order
    const createdOrder = await Order.create([orderData], { session });
    if (!createdOrder.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create order');
    }

    newOrder = createdOrder[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }

  if (newOrder) {
    newOrder = await Order.findOne({ _id: newOrder._id })
      .populate({
        path: 'cow',
        populate: [
          {
            path: 'seller',
          },
        ],
      })
      .populate('buyer');
  }
  return newOrder;
};

const getAllOrders = async (
  userId: string,
  role: string
): Promise<IOrder[]> => {
  let query = {};
  if (role === 'buyer') {
    query = { buyer: userId };
  }
  if (role === 'seller') {
    query = { 'cow.seller': userId };
  }
  const result = await Order.find(query)
    .populate({
      path: 'cow',
      populate: [
        {
          path: 'seller',
        },
      ],
    })
    .populate('buyer');

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};

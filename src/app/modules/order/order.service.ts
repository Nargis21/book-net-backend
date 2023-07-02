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
  const orders = await Order.find()
    .populate({
      path: 'cow',
      populate: [
        {
          path: 'seller',
        },
      ],
    })
    .populate('buyer');
  let filteredOrders: IOrder[] = [];

  if (role === 'admin') {
    // Admin can access all orders
    filteredOrders = orders;
  } else if (role === 'buyer') {
    // Buyer can access their own orders
    filteredOrders = orders.filter(
      order => order.buyer._id.toString() === userId
    );
  } else if (role === 'seller') {
    // Seller can access orders related to their cows
    filteredOrders = orders.filter(
      order => order.cow.seller._id.toString() === userId
    );
  }

  return filteredOrders;
};

const getSingleOrder = async (
  userId: string,
  orderId: string,
  role: string
): Promise<IOrder | null> => {
  const order = await Order.findById(orderId)
    .populate({
      path: 'cow',
      populate: [
        {
          path: 'seller',
        },
      ],
    })
    .populate('buyer');
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order does not exist');
  }

  if (role === 'seller' && order.cow.seller._id.toString() !== userId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not the seller of this order'
    );
  }
  if (role === 'buyer' && order.buyer._id.toString() !== userId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not the buyer of this order'
    );
  }
  return order;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};

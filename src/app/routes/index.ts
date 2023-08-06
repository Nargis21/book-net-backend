import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/book/book.route';
import { WishlistRoutes } from '../modules/wishlist/wishlist.route';
import { CurrentListRoutes } from '../modules/currentList/currentList.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/wishlist',
    route: WishlistRoutes,
  },
  {
    path: '/currentList',
    route: CurrentListRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;

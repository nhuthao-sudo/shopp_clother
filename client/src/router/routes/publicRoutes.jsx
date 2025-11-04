import React from 'react';
import Cart from '../../pages/Cart';
import Checkout from '../../pages/Checkout';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Logout from '../../pages/Logout';
import Sales from '../../pages/Sales';
import Collections from '../../pages/Collections';
import Wishlist from '../../pages/Wishlist';

export const publicRoutes = [
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/checkout',
    element: <Checkout />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/logout',
    element: <Logout />
  },
  {
    path: '/sales',
    element: <Sales />
  },
  {
    path: '/collections',
    element: <Collections />
  },
  {
    path: '/wishlist',
    element: <Wishlist />
  }
];
const path = {
  PUBLIC: '/',
  HOME: '',
  ALL: '*',
  LOGIN: 'login',
  PRODUCTS: 'products',
  BLOGS: 'blogs',
  OUR_SERVICES: 'services',
  FAQ: 'faqs',
  DETAIL_PRODUCT_PID_TITLE: 'product/:pid/:title',
  DETAIL_PRODUCT: 'product',
  VERIFY_EMAIL: 'user/verifyemail/:token',
  FORGOT_PASSWORD: 'user/forgot-password/',
  RESET_PASSWORD: 'user/reset-password/:token',

  // Admin
  ADMIN: 'admin',
  DASHBOARD: 'dashboard',
  MANAGE_USERS: 'manage-users',
  MANAGE_ORDERS: 'manage-orders',
  MANAGE_PRODUCTS: 'manage-products',
  CREATE_PRODUCTS: 'create-products',

  //Member
  MEMBER: 'member',
  PERSONAL: 'personal',
};

export default path;

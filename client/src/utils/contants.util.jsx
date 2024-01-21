import icons from './icons.util';
import path from './path.util';
const {
  FaShieldAlt,
  FaTruck,
  BsGiftFill,
  FaReply,
  FaPhoneAlt,
  RxDashboard,
  FaUserCog,
  LuStore,
  RiBillLine,
} = icons;

export const navigation = [
  {
    id: 1,
    value: 'HOME',
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: 'PRODUCTS',
    path: `/${path.PRODUCTS}`,
  },
  {
    id: 3,
    value: 'BLOGS',
    path: `/${path.BLOGS}`,
  },
  {
    id: 4,
    value: 'OUR SERVICES',
    path: `/${path.OUR_SERVICES}`,
  },
  {
    id: 5,
    value: 'FAQa',
    path: `/${path.FAQ}`,
  },
];

export const productExtraInformation = [
  {
    id: 1,
    title: 'Guarantee',
    sub: 'Quality Checked',
    icon: <FaShieldAlt />,
  },
  {
    id: 2,
    title: 'Free Shipping',
    sub: 'Free On All Products',
    icon: <FaTruck />,
  },
  {
    id: 3,
    title: 'Special Gift Cards',
    sub: 'Special Gift Cards',
    icon: <BsGiftFill />,
  },
  {
    id: 4,
    title: 'Free Return',
    sub: 'Within 7 Days',
    icon: <FaReply />,
  },
  {
    id: 5,
    title: 'Consultancy',
    sub: 'Lifetime 24/7/356',
    icon: <FaPhoneAlt />,
  },
];

export const productInformation = [
  {
    id: 1,
    title: 'DESCRIPTION',
    content: 'Quality Checked',
  },
  {
    id: 2,
    title: 'WARRANTY',
    content: 'Free On All Products',
  },
  {
    id: 3,
    title: 'DELIVERY',
    content: 'Special Gift Cards',
  },
  {
    id: 4,
    title: 'PAYMENT',
    content: 'Within 7 Days',
  },
];

export const colors = [
  { id: 1, color: 'White' },
  { id: 2, color: 'Black' },
  { id: 3, color: 'Yellow' },
  { id: 4, color: 'Red' },
  { id: 5, color: 'Green' },
  { id: 6, color: 'Pink' },
  { id: 7, color: 'Blue' },
];

export const sorts = [
  { id: 1, value: '-sold', text: 'Best selling' },
  { id: 2, value: '-title', text: 'Alphabetically, A-Z' },
  { id: 3, value: 'title', text: 'Alphabetically, Z-A' },
  { id: 4, value: '-price', text: 'Price, high to low' },
  { id: 5, value: 'price', text: 'Price, low to high' },
  { id: 6, value: '-createdAt', text: 'Date, new to old' },
  { id: 7, value: 'createdAt', text: 'Date, old to new' },
];

export const vote = [
  { id: 1, text: 'Very bad' },
  { id: 2, text: 'Bad' },
  { id: 3, text: 'Normal' },
  { id: 4, text: 'Good' },
  { id: 5, text: 'Perfect' },
];

export const adminSidebar = [
  {
    id: 1,
    type: 'SINGLE',
    text: 'Dashboard',
    icon: <RxDashboard />,
    path: `${path.DASHBOARD}`,
  },
  {
    id: 2,
    type: 'SINGLE',
    text: 'Manage User',
    icon: <FaUserCog />,
    path: `${path.MANAGE_USERS}`,
  },
  {
    id: 3,
    type: 'PARENT',
    text: 'Manage Product',
    icon: <LuStore />,
    submenu: [
      {
        id: 1,
        text: 'Mange product',
        path: `${path.MANAGE_PRODUCTS}`,
      },
      {
        id: 2,
        text: 'Create product',
        path: `${path.CREATE_PRODUCTS}`,
      },
    ],
  },
  {
    id: 4,
    type: 'SINGLE',
    text: 'Manage Order',
    icon: <RiBillLine />,
    path: `${path.MANAGE_ORDERS}`,
  },
];

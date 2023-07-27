import icons from './icons.util';
import path from './path.util';
const { FaShieldAlt, FaTruck, BsGiftFill, FaReply, FaPhoneAlt } = icons;

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

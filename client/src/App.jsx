import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {
  Public,
  Login,
  Home,
  FAQ,
  ProductDetail,
  Service,
  Blog,
  Products,
  VerifyEmail,
  ForgotPassword,
  ResetPassword,
} from 'pages/public';
import {
  AdminLayout,
  ManageOrders,
  ManageProducts,
  ManageUsers,
  CreateProduct,
  Dashboard,
} from 'pages/admin';

import { MemberLayout, Personal } from 'pages/member';
import path from 'utils/path.util';
import { useSelector } from 'react-redux';
import Modal from 'components/common/Modal';

function App() {
  const { isShowModal, modalChildren } = useSelector((state) => state.app);
  return (
    <div className="min-h-screen font-main relative">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        // Public
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />

          <Route path={path.BLOGS} element={<Blog />} />
          <Route
            path={path.DETAIL_PRODUCT_PID_TITLE}
            element={<ProductDetail />}
          />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.OUR_SERVICES} element={<Service />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.VERIFY_EMAIL} element={<VerifyEmail />} />
        <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        //Member
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
        </Route>
        // Admin
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts />} />
          <Route path={path.CREATE_PRODUCTS} element={<CreateProduct />} />
          <Route path={path.MANAGE_USERS} element={<ManageUsers />} />
          <Route path={path.MANAGE_ORDERS} element={<ManageOrders />} />
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;

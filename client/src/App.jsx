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
} from './pages/public';
import path from './utils/path.util';

function App() {
  return (
    <div className="min-h-screen font-main relative">
      <Routes>
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
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.VERIFY_EMAIL} element={<VerifyEmail />} />
        <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;

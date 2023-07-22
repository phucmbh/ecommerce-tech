import { Route, Routes } from 'react-router-dom';
import {
  Public,
  Login,
  Home,
  FAQ,
  DetailProduct,
  Service,
  Blog,
  Product,
} from './pages/public';
import path from './utils/path.util';

function App() {
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />

          <Route path={path.BLOGS} element={<Blog />} />
          <Route
            path={path.DETAIL_PRODUCT_PID_TITLE}
            element={<DetailProduct />}
          />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.OUR_SERVICES} element={<Service />} />
          <Route path={path.PRODUCTS} element={<Product />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

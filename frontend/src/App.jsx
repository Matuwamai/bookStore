import { BrowserRouter as Router, Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./Layout";
import ProductsPage from "./pages/products/ProductsPage";
import NewProductPage from "./pages/products/NewProductPage";
import ProductDetailsPage from "./pages/products/ProductDetailsPage";
import CustomersPage from "./pages/customers/CustomersPage";
import ClassesPage from "./pages/classes/ClassesPage";
import SubjectsPage from "./pages/subjects/SubjectsPage";
import OrdersPage from "./pages/orders/OrdersPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ClientLayout from "./ClientLayout";
import ShopPage from "./pages/ShopPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderDetails from "./pages/orders/orderDetails";
import UserOrderPage from "./pages/orders/userOrders";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import RoleBasedRoute from "./components/routes/RoleBasedRoutes";
import Unauthorized from "./components/routes/Unauthorized";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<ClientLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/shop' element={<ShopPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/shop/products/:name' element={<ProductDetailsPage />} />
            <Route path='my-orders' element={<UserOrderPage />} />

          </Route>
          <Route element={<DashboardLayout />}>
            <Route element={<RoleBasedRoute allowedRoles={['ADMIN']} />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/products' element={<ProductsPage />} />
              <Route path='/products/new' element={<NewProductPage />} />
              <Route path='/customers' element={<CustomersPage />} />
              <Route path='/classes' element={<ClassesPage />} />
              <Route path='/subjects' element={<SubjectsPage />} />
              <Route path='/orders'>
                <Route index element={<OrdersPage />} />
                <Route path=':id' element={<OrderDetails />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Unauthorized/>} />
      </Routes>
    </Router>
  );
};

export default App;

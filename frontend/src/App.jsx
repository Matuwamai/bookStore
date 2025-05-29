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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<ClientLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/shop/products/:name' element={<ProductDetailsPage />} />
        </Route>
        <Route element={<DashboardLayout />}>
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
           {/* <Route path='/orders' element={<OrdersPage />} /> */}
            <Route path='/user' element={<UserOrderPage />} />

        </Route>
        {/* <Route path='/orders/:id' element={<OrderDetails />} /> */}
      </Routes>
    </Router>
  );
};

export default App;

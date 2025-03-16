import { BrowserRouter as Router, Routes, Route } from "react-router"
import Dashboard from "./pages/Dashboard"
import DashboardLayout from "./Layout"
import ProductsPage from "./pages/products/ProductsPage"
import NewProductPage from "./pages/products/NewProductPage"
import ProductDetailsPage from "./pages/products/ProductDetailsPage"
import CustomersPage from "./pages/customers/CustomersPage"
import ClassesPage from "./pages/classes/ClassesPage"
import SubjectsPage from "./pages/subjects/SubjectsPage"
import OrdersPage from "./pages/orders/OrdersPage"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/new" element={<NewProductPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
import { Navigate, Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import Header from "./components/Header";

export default function ClientLayout() {
  return (
    <div>
      <Header />
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
      <Outlet />
    </div>
  );
}

import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import { useSelector } from "react-redux";
 import { Bounce, ToastContainer } from "react-toastify";

export default function DashboardLayout() {

  const { userInfo } = useSelector((state) => state.user);
  if (userInfo?.token) {
    return (
      <SideBar>
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
      </SideBar>
    );
  }

  return <Navigate to='/sign-in' />;
}

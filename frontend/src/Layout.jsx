import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import { useSelector } from "react-redux";

export default function DashboardLayout() {

  const { userInfo } = useSelector((state) => state.user);
  if (userInfo?.token) {
    return (
        <SideBar>
            <Outlet />
        </SideBar>
    );
  }

  return <Navigate to='/sign-in' />;
}

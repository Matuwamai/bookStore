import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";

export default function DashboardLayout() {

//   const { userInfo } = useSelector((state) => state.user);
//   if (userInfo?.access) {
    return (
        <SideBar>
            <Outlet />
        </SideBar>
    );
//   }

//   return <Navigate to='/login' />;
}

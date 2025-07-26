import { Outlet } from "react-router-dom";



const AdminDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
        {/* <Sidebar></Sidebar> */}
        <main className="flex-grow p-6 bg-gray-50">
            <Outlet/>
        </main>
    </div>
  );
}

export default AdminDashboardLayout;

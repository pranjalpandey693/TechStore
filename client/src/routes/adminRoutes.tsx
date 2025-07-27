import type { RouteObject } from "react-router-dom";
import paths from '@/utils/path'
import AdminDashboardLayout from "@/layout/Dashboard/AdminDashboardLayout";

const AdminRoute:RouteObject[]=[
    {
        path:paths.admin.INDEX,
        element:<AdminDashboardLayout/>,
        children:[
            {
                path:paths.admin.MANAGE_ORDERS,
                element:'MANAGE_ORDERS'
            },
            {
                path:paths.admin.MANAGE_PRODUCT,
                element:'MANAGE_PRODUCT'
            }
        ]
    }
]

export default AdminRoute
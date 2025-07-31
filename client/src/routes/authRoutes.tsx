import type { RouteObject } from "react-router-dom";
import paths from '@/utils/path'
import Authlayout from "@/layout/Auth/Authlayout";
import Login from "@/views/Auth/Login";
import Register from "@/views/Auth/Register";

const AuthRoute:RouteObject[]=[
    {
        path: paths.auth.INDEX,
        element: <Authlayout/>,
        children:[
            {
                index:true,
                path:paths.auth.REGISTER,
                element:<Register/>
            },
            {
                path:paths.auth.ADMIN_SIGNUP,
                element:"admin sign up"
            },
            {
                path:paths.auth.LOGIN,
                element:<Login/>
            },
            {
                path:paths.auth.LOGOUT,
                element:"log out"
            },
            
        ]
    }
]

export default AuthRoute
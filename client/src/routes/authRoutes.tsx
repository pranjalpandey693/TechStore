import type { RouteObject } from "react-router-dom";
import paths from '@/utils/path'
import Authlayout from "@/layout/Auth/Authlayout";

const AuthRoute:RouteObject[]=[
    {
        path: paths.auth.INDEX,
        element: <Authlayout/>,
        children:[
            {
                index:true,
                path:paths.auth.SIGNUP,
                element:"sign up"
            },
            {
                path:paths.auth.ADMIN_SIGNUP,
                element:"admin sign up"
            },
            {
                path:paths.auth.LOGIN,
                element:"login"
            },
            {
                path:paths.auth.LOGOUT,
                element:"log out"
            },
            
        ]
    }
]

export default AuthRoute
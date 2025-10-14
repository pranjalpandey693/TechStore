import type { RouteObject } from "react-router-dom";
import paths from '@/utils/path'
import PublicLayout from "@/layout/PublicLayout";
import Sample from "@/pages/Login"
import Home from "@/views/Home";
import ProductPage from '@/views/Home/ProductPage'
import Contact from "@/views/Contact/Contact_Us";


const HomeRoutes:RouteObject[]=[
    {
        
                path:"test",
                element:<Sample/>
        
    },
    {
        path:paths.home.INDEX,
        element:<PublicLayout/>,
        children:[
            {
                index:true,
                element: <Home/>
            },
            {
                path:paths.home.CONTACT,
                element:<Contact/>
            },
            {
                path:paths.home.ORDERS,
                element:'ORDERS'
            },
            {
                path:paths.home.PRODUCT,
                element:<ProductPage/>
            },
            {
                path:paths.home.CHECKOUT,
                element:'CHECKOUT'
            }
        ]
    },
    {
        path:paths.cart.cart,
        element:<PublicLayout/>,
        children:[
            {
                index:true,
                element:'cart'
            }
        ]

    }
]

export default HomeRoutes
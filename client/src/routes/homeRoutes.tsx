import type { RouteObject } from "react-router-dom";
import paths from '@/utils/path'
import PublicLayout from "@/layout/PublicLayout";
import Sample from "@/pages/Login"


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
                element:'home'
            },
            {
                path:paths.home.CONTACT,
                element:'contact'
            },
            {
                path:paths.home.ORDERS,
                element:'ORDERS'
            },
            {
                path:paths.home.PRODUCT,
                element:'product'
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
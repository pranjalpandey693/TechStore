const appRoutes = {
    auth:{
        INDEX:'/auth',
        REGISTER:'register',
        ADMIN_SIGNUP:'admin_signup',
        LOGIN:'login',
        LOGOUT:'logout'

    },
    home:{
        INDEX:'/',
        CONTACT:'contact',
        PRODUCT:'product/:id',
        ORDERS:'orders',
        CHECKOUT:'checkout'

    },
    cart:{
       cart:'/cart'
    },
    admin:{
        INDEX:'/admin',
        MANAGE_PRODUCT:'manage_product',
        MANAGE_ORDERS:'manage_orders'

    },

}

export default appRoutes





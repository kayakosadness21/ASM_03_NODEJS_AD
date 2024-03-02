const environment = {
    dev: {
        api: {
            url: "http://localhost:5000",
            cart: {
                origin: "/cart",
                getCartUser: "/cart/user"
            },
            user: {
                origin: "/user",
                newUser: '/user/new',
                updateUser: '/user/update',
                destroyUser: '/user/destroy'
            },
            role: {
                origin: "/role",
                newRole: "/role/new",
                updateRole: '/role/update',
                destroyRole: '/role/destroy'
            },
            product: {
                origin: "/product",
                newProduct: "/product/new",
                updateProduct: "/product/update"
            }
        }
    },
    pro: {

    }
}

export default environment['dev'];
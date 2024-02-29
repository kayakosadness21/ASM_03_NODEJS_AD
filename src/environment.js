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
                destroyUser: '/user/destroy'
            }
        }
    },
    pro: {

    }
}

export default environment['dev'];
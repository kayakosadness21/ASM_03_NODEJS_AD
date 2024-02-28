const environment = {
    dev: {
        api: {
            url: "http://localhost:5000",
            cart: {
                origin: "/cart",
                getCartUser: "/cart/user"
            }
        }
    },
    pro: {

    }
}

export default environment['dev'];
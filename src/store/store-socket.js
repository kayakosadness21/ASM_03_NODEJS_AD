const initialState = {
    socket: null
}

const storeSocket = (state = initialState, action) => {
    let type = action.type;
    if(type == "SHARE-SOCKET") {
        return  {
            socket: action.socket
        }
    }
    return state;
}

export default storeSocket;
const initialStateChat = {
  chatRooms: null,
  // roomIdList: null,
};

const chatReducer = (state = initialStateChat, action) => {
  switch (action.type) {
    case "GET_ROOM":
      return {
        chatRooms: action.payload.data,
        // roomIdList: action.payload.data.map((item) => item._id),
      };
    case "ADD_MESSAGE":
      // { user:sdkjfhs
      //   roomId: chooseRoom._id,
      //   message: message  }
      const chatRoomList = state.chatRooms.map((item) => {
        if (item._id === action.payload.roomId) {
          item.conversation.push({
            user: action.payload.user,
            message: action.payload.message,
          });
        }
        return item;
      });
      return { chatRooms: [...chatRoomList] };
    case "UPDATE_STATUS_ON_OFF_LINE":
      // check chatRooms is empty
      if (!state.chatRooms && action.payload.action === "ONLINE") {
        return {
          chatRooms: [action.payload],
        };
      }
      // check chatRooms is not empty
      if (action.payload.action === "ONLINE") {
        // check exist
        const findIndex = state.chatRooms.findIndex(
          (item) => item._id === action.payload.roomId
        );
        // if not existed then add new
        if (findIndex === -1) {
          return {
            chatRooms: [
              ...state.chatRooms,
              { ...action.payload, _id: action.payload.roomId },
            ],
          };
        }
        //if roomId is existed then update
        state.chatRooms[findIndex].action = action.payload.action;
        state.chatRooms[findIndex].socketId = action.payload.socketId;
        console.log("CHECK UPDATE chatRooms: ", state.chatRooms);
        return { chatRooms: [...state.chatRooms] };
      }
      if (action.payload.action === "OFFLINE") {
        const chatRoomListUpdate = state.chatRooms.map((item) => {
          if (item.socketId === action.payload.socketId) {
            item.action = action.payload.action;
          }
          return item;
        });
        return { chatRooms: [...chatRoomListUpdate] };
      }
      break;
    default:
      return state;
  }
};

export default chatReducer;

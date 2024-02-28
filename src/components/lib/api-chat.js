import setHearder from "./set_hearder_auth";

// export const createChatRoomAPI = () => {
//   return async (dispatch) => {
//     // send request to Server
//     const res = await fetch(
//       process.env.REACT_APP_DOMAIN + `/chat/conversation`,
//       {
//         method: "POST",
//       }
//     );
//     // 200 = ok
//     if (res.status === 200) {
//       const data = await res.json();
//       dispatch({ type: "ADD_ROOM", payload: data });
//     }
//   };
// };
export const getChatRoomAPI = () => {
  return async (dispatch) => {
    const res = await fetch(
      process.env.REACT_APP_DOMAIN + `/chat/get-all-chat-room`,
      {
        method: "GET",
        headers: setHearder({
          "Content-Type": "application/json",
        }),
      }
    );
    if (res.ok) {
      const data = await res.json();
      // console.log("CHECK GET DATA: ", data);
      dispatch({ type: "GET_ROOM", payload: data });
    }
  };
};
export const addMessageAPI = (message) => {
  return async (dispatch) => {
    const res = await fetch(process.env.REACT_APP_DOMAIN + `/chat/add-chat`, {
      method: "POST",
      headers: setHearder({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(message),
      // message: {
      //   user: user.userId,
      //   roomId: chooseRoom._id,
      //   message: message,
      // }
    });
    // if (res.ok) {
    //   const data = await res.json();
    // console.log("CHECK GET DATA: ", data);
    // dispatch({ type: "GET_ROOM", payload: data });
    // }
  };
};

import classes from "./ChatRoom.module.css";
import BannerShop from "../banner/BannerShop";
import admin_icon from "../../asset/admin-icon.svg";
import MessengerWindow from "../chat/messenger-window";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { addMessageAPI, getChatRoomAPI } from "../lib/api-chat";
import openSocket from "socket.io-client";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const { chatRooms } = useSelector((state) => state.chatReducer);
  const { user } = useSelector((state) => state.logInReducer);
  const [chooseRoom, setChooseRoom] = useState(null);
  const refChatContent = useRef();
  const refChooseRoom = useRef();
  const [socket, setSocket] = useState(null);
  const [adminTyping, setAdminTyping] = useState();
  refChooseRoom.current = chooseRoom;
  // const [newMessages, setNewMessages] = useState([]);
  // console.log("GET CHAT ROOMS: ", chatRooms);
  useEffect(() => {
    // listen at "ADMIN_CHANNEL"
    socket?.on("ADMIN_CHANNEL", (data) => {
      if (data.action === "reply") {
        dispatch({
          type: "ADD_MESSAGE",
          payload: {
            user: "client",
            roomId: data.roomId,
            message: data.message,
          },
        });
      }
      if (
        data.action === "START_TYPING" &&
        data.roomId === refChooseRoom.current._id
      ) {
        setAdminTyping("Client is typing ...");
      } else {
        setAdminTyping("");
      }
      if (data.action === "ONLINE") {
        console.log("CHECK ONLINE: ", data);
        // data:{
        //     action: 'ONLINE',
        //     roomId: '646f843b27d37d6fd6f10c92',
        //     userId: 'client',
        //     socketId: 'sFFyjPk0qKzq-PfAAAAV'
        // }
        dispatch({
          type: "UPDATE_STATUS_ON_OFF_LINE",
          payload: { ...data, conversation: [] },
        });
      }
      if (data.action === "OFFLINE") {
        console.log("CHECK OFFLINE: ", data);
        // data:{
        //   action: 'OFFLINE',
        //   socketId: 'uadrRpnX0pXxSpVVAAAT'
        // }
        dispatch({
          type: "UPDATE_STATUS_ON_OFF_LINE",
          payload: { ...data },
        });
      }
    });
    return () => {
      socket?.disconnect();
    };
  }, [socket]);
  // move scroll to the bottom
  useEffect(() => {
    refChatContent.current.scrollTop = refChatContent.current.scrollHeight;
  }, [chatRooms]);
  // componentDidMount
  useEffect(() => {
    dispatch({ type: "ACTIVE_CHAT_ROOM_PAGE" });
    dispatch(getChatRoomAPI());
    // open connection
    setSocket(openSocket(`${process.env.REACT_APP_DOMAIN}`));
  }, []);
  const chooseRoomChatHandler = (room) => {
    setChooseRoom(room);
  };
  // list out contact list
  const contactList =
    chatRooms &&
    chatRooms.map((item, index) => {
      const isOnline = item.action === "ONLINE" ? "actived" : "";
      const isChoosen = item._id === chooseRoom?._id ? "actived-choose" : "";
      return (
        <div className={classes["contact-list"]} key={index}>
          <img
            className={classes["admin-icon"] + " " + classes[isOnline]}
            src={admin_icon}
            alt="Admin icon"
          />
          <label
            onClick={chooseRoomChatHandler.bind(null, item)}
            className={classes[isChoosen]}
          >
            {" "}
            {item._id}{" "}
          </label>
        </div>
      );
    });

  const sendMessageHandler = (message) => {
    if (!chooseRoom) {
      alert("Please choose room to chat!.");
      return;
    }
    if (refChatContent.current.value.trim() === "") {
      alert("Please enter message.");
      refChatContent.current.focus();
      return;
    }
    // add message on redux
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        user: user.userId,
        roomId: chooseRoom?._id,
        message: refChatContent.current.value,
      },
    });
    // add message on server
    dispatch(
      addMessageAPI({
        user: user.userId,
        roomId: chooseRoom?._id,
        message: refChatContent.current.value,
      })
    );
    refChatContent.current.value = "";
    // console.log("CHECK SEND MESSAGE: ", {
    //   roomId: chooseRoom._id,
    //   message: message,
    // });
  };
  // emit when clien typing
  const typingHandler = (status) => {
    if (status === "START") {
      socket.emit("TYPING", {
        action: "START_TYPING",
        roomId: chooseRoom?._id,
        userId: user.userId,
      });
      return;
    }
    if (status === "STOP") {
      socket.emit("TYPING", {
        action: "STOP_TYPING",
        roomId: chooseRoom?._id,
        userId: user.userId,
      });
      return;
    }
  };
  return (
    <div className={classes["chat-room-container"]}>
      <BannerShop text={{ left: "ADMIN", right: "CHAT ROOM" }} />
      <div className={classes["chat-room-content"]}>
        <div className={classes["room-list"]}>
          <div className={classes["search-box"]}>
            <input type="text" placeholder="Search contact" />
          </div>
          <div className={classes["list"]}>{contactList}</div>
        </div>
        <div className={classes["conversation"]}>
          <MessengerWindow
            conversation={chooseRoom && chooseRoom.conversation}
            onSendMessage={sendMessageHandler}
            onTypingHandler={typingHandler}
            adminTyping={adminTyping}
            ref={refChatContent}
          />
        </div>
      </div>
    </div>
  );
};
export default ChatRoom;

import classes from "./messenger-window.module.css";
import admin_icon from "../../asset/admin-icon.svg";
import { forwardRef, useEffect, useRef } from "react";

const MessengerWindow = forwardRef(
  ({ conversation, onSendMessage, onTypingHandler, adminTyping }, ref) => {
    // const refMessage = useRef();
    // useEffect(() => {
    //   ref.current?.scrollIntoView({ behavior: "smooth" });
    // }, [conversation]);
    const conversationList =
      conversation &&
      conversation.map((item, index) => {
        if (item && item.user !== "client") {
          return (
            <div className={classes["chat-customer-container"]} key={index}>
              <label className={classes["chat-customer"]}>
                You: {item.message}
              </label>
            </div>
          );
        } else {
          return (
            <div className={classes["chat-admin-container"]} key={index}>
              <div className={classes["chat-line"]}>
                <img
                  className={classes["admin-icon"]}
                  src={admin_icon}
                  alt="Admin icon"
                />
                <label className={classes["chat-admin"]}>
                  Client: {item.message}
                </label>
              </div>
            </div>
          );
        }
      });

    const sendMessageHandler = () => {
      onSendMessage();
      // onSendMessage(refMessage.current.value);
      // refMessage.current.value = "";
    };
    const startTypingHandler = () => {
      onTypingHandler("START");
    };
    const stopTypingHandler = () => {
      onTypingHandler("STOP");
    };
    return (
      <div className={classes["chat-window-container"]}>
        {/* Chat content */}
        <div className={classes["chat-content"]} ref={ref}>
          {conversationList}
        </div>
        {/* Chat footer */}
        <div className={classes.typing}>{adminTyping}</div>
        <div className={classes["chat-footer"]}>
          <input
            type="text"
            placeholder="Enter Message!"
            ref={ref}
            onFocus={startTypingHandler}
            onBlur={stopTypingHandler}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={classes["paper-plane"]}
            onClick={sendMessageHandler}
          >
            <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
          </svg>
        </div>
      </div>
    );
  }
);
export default MessengerWindow;

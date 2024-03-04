import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./page-chat.module.css";

const PageChat = (props) => {
    const shareSocket = useSelector((state) => state.storeSocket);
    const { user } = useSelector((state) => state.logInReducer);

    const [client, setClient] = useState(null);
    const [listUser, setListUser] = useState([]);
    const [messages, setMessages] = useState([]);
    const messageRef = useRef();


    useEffect(() => {
        shareSocket.socket?.on("LIST-USER-ONLINE", (data) => {
            setListUser([]);
            let { list } = data;
            setListUser(list);
        })

        shareSocket.socket?.on("CLIENT-ADMIN-CHOOSE", (data) => {
            let { client, list } = data;
            setListUser([]);
            if(client) {
                setClient(client);
                setMessages(client.message);
                setListUser(list);
            }
        })

        shareSocket.socket?.on("CLIENT-SEND-MESSAGE-TO-ADMIN-SUPPORT", (data) => {
            let { user: userClient } = data;

            setMessages([]);
            if(user.email == userClient.current_care) {
                setMessages(userClient.message);
            }
        })

        shareSocket.socket?.on("ADMIN-SEND-MESSAGE-TO-CLIENT-DONE", (data) => {
            let { client } = data;
            setMessages([]);
            if(user.email == client.current_care) {
                setMessages(client.message);
            }
        })

    }, [shareSocket.socket])

    const onAdminSupportHandler = (e) => {
        let message = messageRef.current.value;
        if(!message.trim()) {
            window.confirm("Please enter message");
            return
        }

        shareSocket.socket?.emit("ADMIN-SEND-MESSAGE-TO-CLIENT", {client, message});
        messageRef.current.value = "";
    }

    const onChooseAccountSupport = (payload) => {
        let { role, email, care } = payload;

        if(role == 'Admin' || care) {
            window.confirm("Can't support user account is Admin of account have support!");
            return
        }

        shareSocket.socket.emit('ADMIN-CHOOSE-CLIENT-SUPPORT', {id: user.userId, email});
    }

    return (
        <div className={classes['page-chat-component']}>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <ul className={classes['chat-tab']}>
                            {listUser.length > 0 && listUser.map((elm) => {
                                return (
                                    <li onClick={
                                            (e) => onChooseAccountSupport({
                                                role: elm.user?.role?.title,
                                                email: elm?.email,
                                                care: elm?.current_care
                                            })
                                        }
                                        key={elm._id}
                                        // data-type={elm.user?.role?.title} data-email={elm?.email}
                                        className={`
                                            ${classes['chat-tab-items']}
                                            ${elm?.current_care? classes['user-have-admin-support'] : ''}
                                        `}>

                                        <span className={classes['chat-tab-tems_thumb']}>
                                            <img src="assets/images/user_blank.png" alt="" />
                                        </span>
                                        <div className={classes['chat-tab-tems_infor']}>
                                            <span className={classes['infor-user']}>
                                                {elm.user?.fullName}
                                            </span>
                                            <div className={classes['infor-account']}>
                                                <span className={classes['infor-role']}>
                                                    Role: {elm.user?.role?.title}
                                                </span>
                                                <span className={classes['infor-role']}>
                                                    support: {elm?.current_care ? elm?.current_care : 'Blank'}
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="col-8">
                        <div className={classes['chat-content']}>
                            <div className={classes['chat-content-messages']}>
                                {messages?.length > 0 && messages.map((message, index) => {
                                    return (
                                        <div key={index}
                                        className={`
                                            ${classes['message-items']}
                                            ${message.type === 'Client'? '' : classes['message-items-admin']}`}>
                                            <span className={classes['message-items_thumb']}>
                                                <img src="assets/images/user_blank.png" alt="" />
                                            </span>
                                            <span className={classes['message-items_content']}>{message.content}</span>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={classes['chat-content-input']}>
                                <input
                                    ref={messageRef}
                                    className={classes['input-message-content']} />

                                <button
                                    onClick={onAdminSupportHandler}
                                    className={classes['button-send-message-content']}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageChat;
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./page-chat.module.css";

const PageChat = (props) => {
    const shareSocket = useSelector((state) => state.storeSocket);
    const [listUser, setListUser] = useState([]);
    const messageRef = useRef();


    useEffect(() => {
        shareSocket.socket?.on("LIST-USER-ONLINE", (data) => {
            setListUser([]);
            let { list } = data;
            console.log(list);
            setListUser(list);
        })

    }, [shareSocket.socket])

    const onSendMessageHandler = (e) => {
        let message = messageRef.current.value;
        if(message.trim()) {
            console.log(message);
        }
    }

    const onChooseAccountSupport = (e) => {
        let { type } = e.target.dataset;

        if(type == 'Admin') {
            window.confirm("Can't support Admin account");
        }
    }

    return (
        <div className={classes['page-chat-component']}>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <ul className={classes['chat-tab']}>
                            {listUser.length > 0 && listUser.map((elm) => {
                                return (
                                    <li
                                        onClick={onChooseAccountSupport}
                                        key={elm._id}
                                        data-type={elm.user?.role?.title}
                                        className={classes['chat-tab-items']}>
                                        <span className={classes['chat-tab-tems_thumb']}>
                                            <img src="assets/images/user_blank.png" alt="" />
                                        </span>
                                        <div className={classes['chat-tab-tems_infor']}>
                                            <span className={classes['infor-user']}>
                                                {elm.user?.fullName}
                                            </span>
                                            <span className={classes['infor-role']}>
                                                {elm.user?.role?.title}
                                            </span>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="col-8">
                        <div className={classes['chat-content']}>
                            <div className={classes['chat-content-messages']}>
                                <div className={`${classes['message-items']}`}>
                                    <span className={classes['message-items_thumb']}>
                                        <img src="assets/images/user_blank.png" alt="" />
                                    </span>
                                    <span className={classes['message-items_content']}>Hello Admin</span>
                                </div>

                                <div className={`${classes['message-items']} ${classes['message-items-admin']}`}>
                                    <span className={classes['message-items_thumb']}>
                                        <img src="assets/images/user_blank.png" alt="" />
                                    </span>
                                    <span className={classes['message-items_content']}>Hello Client</span>
                                </div>
                            </div>
                            <div className={classes['chat-content-input']}>
                                <input
                                    ref={messageRef}
                                    className={classes['input-message-content']} />

                                <button
                                    onClick={onSendMessageHandler}
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
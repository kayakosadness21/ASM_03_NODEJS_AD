import { useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./page-chat.module.css";

const PageChat = (props) => {
    const shareSocket = useSelector((state) => state.storeSocket);

    useEffect(() => {
        shareSocket.socket?.emit('TEST', {message: 'Hello server'});
    }, [])

    return (
        <div className={classes['page-chat-component']}>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <ul className={classes['chat-tab']}>
                            <li className={classes['chat-tab-items']}>
                                <span className={classes['chat-tab-tems_thumb']}>
                                    <img src="assets/images/user_blank.png" alt="" />
                                </span>
                                <span>test</span>
                            </li>
                        </ul>
                    </div>

                    <div className="col-8">
                        <div className={classes['chat-content']}>
                            <div className={classes['chat-content-messages']}></div>
                            <div className={classes['chat-content-input']}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageChat;
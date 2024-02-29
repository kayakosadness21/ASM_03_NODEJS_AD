import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import environment from "../../../../environment";
import classes from "./page-user-home.module.css";

const PageUserHome = (props) => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    let url = `${environment.api.url}${environment.api.user.origin}`;

    useEffect(() => {
        console.log(url);
        let callApi = async () => {
            let res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if(!res.ok) throw new Error("Call api unsuccess");
            let { status, users} = await res.json();
            if(status) {
                console.log(users);
                setUsers(users);
            }
        }

        callApi();
    }, [])

    const onNewUserHandler = (event) => {
        navigate("/users-add");
    }

    return (
        <div className={classes["user-dashboard"]}>
            <div className="container">
                <div className="tab-navigater">
                    <button className="btn btn-primary" onClick={onNewUserHandler}>Tạo mới</button>
                </div>

                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Họ và tên</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 && users.map((user, index) => {
                            return (
                                <tr key={user._id}>
                                    <th scope="row">{index}</th>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className="btn btn-danger mr-2">Xoá</button>
                                        <button className="btn btn-warning">Sửa</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default PageUserHome;
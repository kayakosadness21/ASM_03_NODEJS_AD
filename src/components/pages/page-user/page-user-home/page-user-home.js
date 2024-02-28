import { useEffect, useState } from "react";
import environment from "../../../../environment";
import classes from "./page-user-home.module.css";

const PageUserHome = (props) => {
    const [users, setUsers] = useState([]);
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

    return (
    <div className={classes["user-dashboard"]}>
        <div className="container">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Họ và tên</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 && users.map((user, index) => {
                        return (
                            <tr key={user._id}>
                                <th scope="row">{index}</th>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>@mdo</td>
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
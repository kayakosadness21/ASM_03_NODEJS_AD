import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import environment from "../../../../environment";

import classes from "./page-role-home.module.css";

const PageRoleHome = (props) => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [reload, setReload] = useState(false);

    let url = `${environment.api.url}${environment.api.role.origin}`;

    useEffect(() => {
        let callApi = async () => {
            let res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if(!res.ok) throw new Error("Call api unsuccess");
            let { status, roles} = await res.json();
            if(status) {
                setRoles(roles);
            }
        }

        callApi();
    }, [reload])

    const onNewRoleHandler = (event) => {
        navigate("/roles-add");
    }

    return (
        <div className={classes['page-role-component']}>
            <div className="container">
                <div className="tab-navigater">
                    <button className="btn btn-primary" onClick={onNewRoleHandler}>Tạo mới</button>
                </div>

                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Họ và tên</th>
                        <th scope="col">Số tài khoản</th>
                        <th scope="col">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.length > 0 && roles.map((role, index) => {
                            return (
                                <tr key={role._id}>
                                    <th scope="row">{index}</th>
                                    <td>{role.title}</td>
                                    <td>{role.users.length}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger mr-2"
                                            data-id={role._id}>Xoá</button>
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

export default PageRoleHome;
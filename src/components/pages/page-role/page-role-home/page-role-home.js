import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import environment from "../../../../environment";

import classes from "./page-role-home.module.css";

const PageRoleHome = (props) => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [reload, setReload] = useState(false);

    let url = `${environment.api.url}${environment.api.role.origin}`;
    let urlDestroy = `${environment.api.url}${environment.api.role.destroyRole}`;

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

    const onRedirectEditRoleHandler = (event) => {
        let { id } = event.target.dataset;
        navigate(`/roles-edit/${id}`);
    }

    const onDestroyRoleHandler = async(event) => {
        let { id } = event.target.dataset;
        if(window.confirm("Bạn có chắc xoá phân quyền này!") && id) {
            let res = await fetch(urlDestroy, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id})
            })

            if(!res.ok) throw new Error("Call api unsuccess");
            let { status, } = await res.json();
            
            if(status) {
                setReload(!reload);
            }
        }
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
                                        onClick={onDestroyRoleHandler}
                                            className="btn btn-danger mr-2"
                                            data-id={role._id}>Xoá</button>
                                        <button
                                            data-id={role._id}
                                            onClick={onRedirectEditRoleHandler}
                                            className="btn btn-warning">Sửa</button>
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
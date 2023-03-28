import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteAccount,
  deleteById,
  getAllUsers,
  signoutUser,
} from "../../Service/UserService";
import "./Admin.css";

function Admin() {
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [bool, setBool] = useState(false);
  const navigate = useNavigate();

  const getBothUsersAndVendors = async () => {
    const response = await getAllUsers("user");
    setUsers(response.data);

    const response1 = await getAllUsers("vendor");
    setVendors(response1.data);
  };
  const signout = async () => { 
    const response = await signoutUser();
    navigate("/signin");
    sessionStorage.clear();

  }

  useEffect(() => {
    getBothUsersAndVendors();
  }, [bool]);

  // delete user

  const handleDelete = async (uid) => {
    const responce = await deleteById(uid);
    setBool(!bool);
  };

  return (
    <div className="admin-page ">
      <div className="admin-header row ">
        <div className="col-10 admin-title ">Admin Control</div>
        <div className="col-2 admin-title1 " onClick={signout}>Signout</div>
      </div>
      <div className="admin-content">
        <div className="admin-section">
          <h2 className="section-title">Vendors List</h2>
          <table className="table-admin">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((item) => {
                return (
                  <tr>
                    <td>{item.uid}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.location}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        className="btn-delete-admin"
                        onClick={() => {
                          handleDelete(item.uid);
                        }}
                      >
                        <svg viewBox="0 0 24 24">
                          <path
                            fill="#FFFFFF"
                            d="M12 0.5c-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11-4.9-11-11-11zm4.4 14.9c0.4 0.4 0.4 1 0 1.4s-1 0.4-1.4 0l-2.9-2.9-2.9 2.9c-0.4 0.4-1 0.4-1.4 0s-0.4-1 0-1.4l2.9-2.9-2.9-2.9c-0.4-0.4-0.4-1 0-1.4s1-0.4 1.4 0l2.9 2.9 2.9-2.9c0.4-0.4 1-0.4 1.4 0s0.4 1 0 1.4l-2.9 2.9z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="horizon-admin"></div>
        <div className="admin-section">
          <h2 className="section-title">Users List</h2>
          <table className="table-admin">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => {
                return (
                  <tr>
                    <td>{item.uid}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      <button
                        className="btn-delete-admin"
                        onClick={() => {
                          handleDelete(item.uid);
                        }}
                      >
                        <svg viewBox="0 0 24 24">
                          <path
                            fill="#FFFFFF"
                            d="M12 0.5c-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11-4.9-11-11-11zm4.4 14.9c0.4 0.4 0.4 1 0 1.4s-1 0.4-1.4 0l-2.9-2.9-2.9 2.9c-0.4 0.4-1 0.4-1.4 0s-0.4-1 0-1.4l2.9-2.9-2.9-2.9c-0.4-0.4-0.4-1 0-1.4s1-0.4 1.4 0l2.9 2.9 2.9-2.9c0.4-0.4 1-0.4 1.4 0s0.4 1 0 1.4l-2.9 2.9z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;

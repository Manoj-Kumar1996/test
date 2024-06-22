import React, { useEffect, useState } from "react";
import summeryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { FaRegEdit } from "react-icons/fa";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails,setUpdateUserDetails] = useState({
    email:"",
    name:"",
    role:'',
    _id:"",
    callFunc:""
  })

  const fetchAllUsers = async () => {
    const fetchData = await fetch(summeryApi.allUser.url, {
      method: summeryApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.N</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((el, index) => {
            return (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{el?.name}</td>
                <td className="text-center">{el?.email}</td>
                <td className="text-center">{el?.role}</td>
                <td className="text-center">
                  {moment(el?.createdAt).format("LL")}
                </td>
                <td className="text-center">
                  <button className="bg-green-100 p-2 rounded-full hover:bg-green-400 hover:text-white" 
                  onClick={()=>{
                    setUpdateUserDetails(el)
                    setOpenUpdateRole(true)
                  }}
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {openUpdateRole && <ChangeUserRole onClose={()=>setOpenUpdateRole(false)} 
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />}
    </div>
  );
};

export default AllUsers;

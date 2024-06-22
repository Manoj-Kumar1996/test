import React, { useState } from "react";
import Logo from "./Logo";
import { IoIosSearch } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summeryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);

  const handleLogout = async () => {
    const fetchData = await fetch(summeryApi.logoutUser.url, {
      method: summeryApi.logoutUser.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo w={100} h={60} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-3">
          <input
            type="text"
            placeholder="search products ..."
            className="w-full outline-none "
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 text-white flex items-center justify-center rounded-r-full cursor-pointer">
            <IoIosSearch />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profile ? (
                  <img
                    src={user?.profile}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}
            {menuDisplay && (
              <div className="absolute bg-white b-0 top-11 h-fit p-2 shadow-lg rounded ">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-product"}
                      className="whitespace-nowrap hover:bg-slate-100 p-2 hidden md:block"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          <div className="text-2xl cursor-pointer relative">
            <span>
              <FaCartShopping />
            </span>
            <div className="bg-red-500 text-white w-5 h-5 p-1 flex justify-center items-center rounded-full absolute -top-2 -right-3">
              <p className="text-xs">0</p>
            </div>
          </div>
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className=" text-white px-3 py-1 rounded-full transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:bg-red-500 duration-300 ..."
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className=" text-white px-3 py-1 rounded-full transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:bg-red-500 duration-300 ..."
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

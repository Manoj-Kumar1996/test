import React, { useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import loginIcon from "../assest/assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import imageToBase64 from "../helpers/imageToBase64.js";
import summeryApi from "../common/index.js"
import { toast } from "react-toastify";



const SignUp = () => {
  const [showPassword, setPassword] = useState(false);
  const [showConfirmPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    profile: "",
  });

  const navigate=useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadPic = async(e)=>{
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file)
    setData((prev)=>{
      return {
        ...prev,
        profile:imagePic
      }
    })
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(data.password===data.confirmpassword){
      
      const dataResponse = await fetch(summeryApi.signUp.url,{
        method : summeryApi.signUp.method,
        headers : {
          "content-type": "application/json"
        },
        body:JSON.stringify(data)
      })
      const dataApi = await dataResponse.json()

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/login')
      }
      if(dataApi.error){
        toast.error(dataApi.message)
      }
     
    }else{
      toast.error('Please check password and confirm password')
    }
  };
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white w-full p-5 max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profile || loginIcon} alt="login icons" />
            </div>
            <form>
              <label>
                <input type="file" className="hidden" onChange={handleUploadPic} />
                <div className="text-center bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-xs absolute bottom-0 w-full">
                  Upload Photo
                </div>
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  placeholder="Enter your name."
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  placeholder="Enter your email."
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  placeholder="Enter your password."
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div>
              <label>Confirm Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmpassword"
                  value={data.confirmpassword}
                  onChange={handleOnChange}
                  required
                  placeholder="Enter your confirm password."
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className="bg-red-500 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block my-6">
              Login
            </button>
          </form>
          <p className="my-5">
            Already have an account ?{" "}
            <Link
              to={"/login"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

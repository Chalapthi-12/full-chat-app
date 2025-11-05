import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { MessageSquare, Mail, LockKeyhole, EyeOff, Eye } from "lucide-react";
import { useAuthStore } from "../../Store/useAuthStore";
import toast from "react-hot-toast";

const Login = () => {
  const { isLoggingIn, login } = useAuthStore();
  const [type, setType] = useState("password");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value.trimStart(),
    });
  };
  const formValidator = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) {
      return toast.error("Email is Required");
    }
    if (!emailRegex.test(data.email)) {
      return toast.error("Invalid Email");
    }
    if (!data.password) {
      return toast.error("Password is Required");
    }
    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validate = formValidator();
    if (validate === true) {
      login(data);
    }
  };

  return (
    <>
      <div className="sign-up bg-base-100">
        <div className="sign-up-container bg-base-300 p-6 rounded-md">
          <div className="sign-up-top w-full flex flex-col items-center justify-center gap-2">
            <div>
              <MessageSquare className="size-8 box-content p-2 rounded bg-primary text-primary-content max-sm:size-7" />
            </div>
            <p className="text-secondary font-semibold text-2xl">
              Welcome Back!
            </p>
            <p className="text-accent">Login to get connected with Friends</p>
          </div>
          <form
            onSubmit={submitHandler}
            method="POST"
            className="flex flex-col items-center justify-center w-full gap-2"
          >
            <label className="w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <div className="input input-bordered flex items-center gap-2">
                <Mail className="size-7" />
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full max-w-xs"
                  name="email"
                  value={data.email.toLowerCase()}
                  onChange={onChangeHandler}
                />
              </div>
            </label>
            <label className="w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <div className="input input-bordered flex items-center gap-2">
                <LockKeyhole className="size-7" />
                <input
                  type={type}
                  placeholder="Password"
                  className="w-full max-w-xs"
                  name="password"
                  value={data.password}
                  onChange={onChangeHandler}
                />
                {data.password.length > 0 && type === "password" && (
                  <EyeOff
                    onClick={() => {
                      setType("text");
                    }}
                    className="size-6 cursor-pointer"
                  />
                )}
                {type === "text" && data.password.length > 0 && (
                  <Eye
                    onClick={() => {
                      setType("password");
                    }}
                    className="size-6 cursor-pointer"
                  />
                )}
              </div>
            </label>
            <button
              className="w-full max-w-xs flex items-center justify-center bg-secondary text-secondary-content h-10 text-xl rounded hover:bg-secondary/70 mt-6"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p className="text-base mt-2">
            Dont't have an Account?{" "}
            <Link
              className="text-primary underline font-medium text-sm"
              to="/signup"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

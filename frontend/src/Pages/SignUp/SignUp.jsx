import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  UserRound,
  Mail,
  LockKeyhole,
  EyeOff,
  Eye,
} from "lucide-react";
import "./SignUp.css";
import { useAuthStore } from "../../Store/useAuthStore";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const SignUser = () => {
  const { isSigningUp, signUp } = useAuthStore();
  const [type, setType] = useState("password");
  const [data, setData] = useState({
    userName: "",
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

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.userName.trim()) {
      return toast.error("Username is Required");
    }
    if (!data.email) {
      return toast.error("Email is Required");
    }
    if (!emailRegex.test(data.email)) {
      return toast.error("Invalid Email");
    }
    if (!data.password.trim()) {
      return toast.error("Password is Required");
    }
    if (data.password.length < 8) {
      return toast.error("Password must be 8 characters");
    }
    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      signUp(data);
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
            <p className="text-secondary font-semibold text-xl">
              Create Account
            </p>
            <p className="text-accent">Get started with your free Account</p>
          </div>
          <form
            onSubmit={submitHandler}
            method="POST"
            className="flex flex-col items-center justify-center w-full gap-2"
          >
            <label className="w-full max-w-xs">
              <div className="label">
                <span className="label-text">User Name</span>
              </div>
              <div className="input input-bordered flex items-center gap-2">
                <UserRound className="size-7" />
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full max-w-xs"
                  name="userName"
                  value={data.userName}
                  onChange={onChangeHandler}
                />
              </div>
            </label>
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
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <p className="text-base mt-2">
            Already have an Account?{" "}
            <Link
              className="text-primary underline font-medium text-sm"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUser;

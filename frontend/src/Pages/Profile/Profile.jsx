import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import { Camera, Mail, UserRound } from "lucide-react";
import defaultProfilePic from "../../assets/chat-app-profile.webp";
import { useAuthStore } from "../../Store/useAuthStore";
import dayjs from "dayjs";
import toast from "react-hot-toast";

const Profile = () => {
  const {
    authUser,
    isUpdatingProfile,
    isDisabled,
    toggleDisabled,
    updateProfile,
  } = useAuthStore();
  const [userName, setUserName] = useState(authUser?.userName || "");
  const [selectedImage, setSelectedImage] = useState(null);
  const [profilePic, setProfilePic] = useState("");

  const fileInputRef = useRef(null);

  const disabledHandler = () => {
    toggleDisabled();
  };

  const triggerFileInput = () => {
    if (!isDisabled) {
      fileInputRef.current.click();
    }
  };
  const onChangeHandler = (e) => {
    setUserName(e.target.value.trimStart());
  };
  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      setProfilePic(base64Image);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!userName) {
      return toast.error("Username Required");
    }
    const data = {
      userName: userName,
      profilePic: profilePic,
    };
    updateProfile(data);
  };

  return (
    <div className="profile-page flex flex-col items-center justify-center">
      {/* Profile Top Section */}
      <div className="profile-top flex flex-col items-center justify-center gap-2 bg-base-300 p-4 rounded-t-md">
        {/* Profile Header */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-primary text-xl font-medium">Profile</p>
          <p className="text-base">Your profile information</p>
        </div>
        <form
          onSubmit={submitHandler}
          className="w-full space-y-2 flex flex-col items-center justify-center"
        >
          {/* Profile Picture Section */}
          <div className="relative profile-pic flex flex-col items-center justify-center gap-3">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={isDisabled}
              onChange={imageHandler}
              ref={fileInputRef}
            />
            <div
              className={`w-24 h-24 border-2 border-solid border-accent rounded-full overflow-hidden flex items-center justify-center ${
                isDisabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={triggerFileInput}
            >
              <img
                src={selectedImage || authUser.profilePic || defaultProfilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <Camera className="absolute size-8 bg-base-300 p-1 rounded-full box-content text-nuetral bottom-5 overflow-visible" />
            </div>
            {isDisabled ? (
              <p className="text-md">Profile Pic</p>
            ) : (
              <p className="text-md">Click here to update profile Pic</p>
            )}
          </div>

          {/* Username Field */}
          <label className="w-full">
            <div className="label flex flex-row justify-start gap-1 text-primary">
              <UserRound />
              <span className="label-text">User Name</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              name="userName"
              onChange={onChangeHandler}
              value={userName}
              disabled={isDisabled}
            />
          </label>

          {/* Email Field */}
          <label className="w-full">
            <div className="label flex flex-row justify-between items-center">
              <div className="flex flex-row justify-start gap-2 items-center">
                <Mail className="text-primary" />
                <span className="label-text">Email</span>
              </div>
              {!isDisabled && <p className="text-error">Can't update email</p>}
            </div>
            <input
              type="text"
              className="input input-bordered w-full text-primary"
              name="email"
              value={authUser.email}
              disabled
            />
          </label>

          {/* Buttons */}
          {isDisabled ? (
            <button
              type="button"
              onClick={disabledHandler}
              className="button bg-secondary/80 text-secondary-content p-1 rounded w-24 px-4"
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={submitHandler}
              className="button bg-secondary/80 text-secondary-content p-1 rounded w-24 px-4"
              disabled={isUpdatingProfile}
            >
              {isUpdatingProfile ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Update"
              )}
            </button>
          )}
        </form>
      </div>

      {/* Profile Bottom Section */}
      <div className="profile-bottom p-4 bg-base-300 flex flex-col justify-between items-start rounded-b-md gap-3">
        <p className="text-primary font-medium text-xl">Account Information</p>
        <div className="w-full flex flex-row items-center justify-between">
          <p className="text-accent/60">Member since</p>
          <p>
            {authUser?.createdAt
              ? dayjs(authUser.createdAt).format("DD-MM-YYYY")
              : "Date not available"}
          </p>
        </div>
        <div className="w-full flex flex-row items-center justify-between">
          <p className="text-accent/60">Account status</p>
          <p className="text-success">Active</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import "./SideBar.css";
import { useMessageStore } from "../../Store/useMessageStore";
import { UsersRound } from "lucide-react";
import defaultProfilePic from "../../assets/chat-app-profile.webp";

const SideBar = ({ setUserId, selectedUser }) => {
  const { getUsers, allUsers, isUsersLoading } = useMessageStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <>
      {/* TODO:: fixing the skeleton loading in sidebar and the scrollbar styling */}
      <div
        id="side-bar"
        className="users-container min-w-min p-7 flex gap-6 flex-col overflow-y-scroll scrollbar-thin max-sm:flex-grow max-sm:h-full z-50"
      >
        <div className="users-container-top flex flex-col gap-6">
          <div className="flex flex-row items-center justify-start gap-2">
            <UsersRound className="size-6 text-primary" />
            <p>All Users</p>
          </div>
          <div>
            <label className="cursor-pointer flex flex-row items-center justify-start gap-2">
              <input type="checkbox" className="checkbox checkbox-base-300" />
              <span className="text-primary text-xl">Online only</span>
              <p>10 Online</p>
            </label>
          </div>
        </div>
        <div className="flex w-52 flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-4"></div>
          </div>
        </div>
        {allUsers.map((item) => {
          return (
            <div key={item._id}>
              <div
                className={`users-bottom cursor-pointer pl-5 rounded-md box-border py-2  ${
                  selectedUser._id === item._id && "bg-base-300"
                }`}
                onClick={() => {
                  setUserId(item._id);
                }}
              >
                <div className="flex flex-row items-center justify-start gap-3">
                  {isUsersLoading ? (
                    <div className="skeleton h-14 w-14 shrink-0 rounded-full z-50"></div>
                  ) : (
                    <img
                      src={item.profilePic || defaultProfilePic}
                      className="size-12 rounded-full object-cover"
                    />
                  )}

                  <div className="flex flex-col justify-center items-start">
                    {isUsersLoading ? (
                      <div className="skeleton h-4 w-28 z-50"></div>
                    ) : (
                      <p className="text-primary text-base">{item.userName}</p>
                    )}

                    {isUsersLoading ? (
                      <div className="skeleton h-4 w-20 z-50"></div>
                    ) : (
                      <p className="text-success">online</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SideBar;

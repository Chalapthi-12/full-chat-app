import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import { useMessageStore } from "../../Store/useMessageStore";
import ChatContainer from "../../Components/ChatContainer/ChatContainer";
import EmptyChat from "../../Components/EmptyChat/EmptyChat";

const Home = () => {
  const [userId, setUserId] = useState("");
  const { allUsers } = useMessageStore();
  const [selectedUser, setSelectedUser] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 767);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const user = allUsers.find((user) => user._id === userId);
    setSelectedUser(user || {});
    console.log(user);
  }, [userId, allUsers]);

  return (
    <div className="relative flex flex-row h-[90vh] overflow-hidden">
      {!isMobile ? (
        <>
          <SideBar setUserId={setUserId} selectedUser={selectedUser} />
          {selectedUser._id ? (
            <ChatContainer
              selectedUser={selectedUser}
              userId={userId}
              setSelectedUser={setSelectedUser}
            />
          ) : (
            <EmptyChat />
          )}
        </>
      ) : (
        <>
          <SideBar setUserId={setUserId} selectedUser={selectedUser} />
          {selectedUser._id && (
            <ChatContainer
              selectedUser={selectedUser}
              userId={userId}
              setSelectedUser={setSelectedUser}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;

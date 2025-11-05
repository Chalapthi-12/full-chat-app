import "./Navbar.css";
import { MessageSquare, Settings, UserRoundPen, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../Store/useAuthStore";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authUser, logout } = useAuthStore();
  const menuRef = useRef();
  const logoRef = useRef();

  useGSAP(() => {
    gsap.from(menuRef.current.children, {
      y: -20,
      opacity: 0,
      stagger: 0.15,
      delay: 0.15,
    });
    gsap.from(logoRef.current, {
      opacity: 0,
      duration: 1.5,
    });
  });

  return (
    <div className="nav-bar bg-neutral">
      <div
        ref={logoRef}
        className="logo flex items-center justify-center gap-5"
      >
        <MessageSquare
          onClick={() => {
            navigate("/");
          }}
          className="size-8 chat-logo box-content p-2 rounded cursor-pointer bg-primary text-primary-content max-sm:size-7"
        />
        <h1 className="text-primary">Vchat</h1>
      </div>
      <div ref={menuRef} className="nav-menu text-primary" id="nav-menu">
        {authUser && (
          <div
            onClick={() => navigate("/profile")}
            className={`profile hover:bg-primary hover:text-primary-content transition-colors border-2 border-primary ${
              location.pathname === "/profile"
                ? "bg-primary text-primary-content"
                : ""
            }`}
          >
            <UserRoundPen className="size-7 max-sm:size-5" />
            <p>Profile</p>
          </div>
        )}
        <div
          onClick={() => navigate("/settings")}
          className={`settings p-4 rounded flex items-center hover:bg-primary hover:text-primary-content transition-colors border-2 border-primary ${
            location.pathname === "/settings"
              ? "bg-primary text-primary-content"
              : ""
          }`}
        >
          <Settings className="size-7 max-sm:size-5" />
          <p>Settings</p>
        </div>
        {authUser && (
          <div
            onClick={() => logout()}
            className="logout hover:bg-primary hover:text-primary-content transition-colors border-2 border-primary"
          >
            <LogOut className="size-7 max-sm:size-5" />
            <p>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

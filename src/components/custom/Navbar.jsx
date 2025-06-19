import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Navbar = ({ user }) => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const location = useLocation();

  return (
    <>
      <nav className="w-full flex h-15 justify-between items-center px-36">
        <div>
          <h1>
            <a href="/">
              <img src={Logo} alt="logo" className="w-30" />
            </a>
          </h1>
        </div>

        <div className="flex gap-2">
          {!user ? (
            <>
              <Button
                className="rounded-full "
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                className="rounded-full bg-neutral-800 text-white px-6 text-sm"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              {location.pathname != "/dashboard" ? (
                <Button className="rounded-full px-6 text-sm">
                  <a href="/dashboard">Dashboard</a>
                </Button>
              ) : null}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <p className="border w-10 h-10 flex justify-center items-center rounded-full cursor-pointer">
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logout()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
        {/* <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <p className="border w-10 h-10 flex justify-center items-center rounded-full cursor-pointer">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => logout()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </nav>
    </>
  );
};

export default Navbar;

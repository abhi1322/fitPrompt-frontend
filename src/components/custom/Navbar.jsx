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
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Navbar = ({ user }) => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <nav className="w-full z-50 flex h-15 justify-between items-center px-8 pt-16 md:px-36">
        <div>
          <h1>
            <Link to="/">
              <img src={Logo} alt="logo" className="w-30" />
            </Link>
          </h1>
        </div>

        <div className="flex gap-2">
          {!user ? (
            <>
              <Link to="/login">
                <Button
                  className="rounded-full "
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </Link>

              <Link to="/register">
                <Button className="rounded-full bg-neutral-800 text-white px-6 text-sm">
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <>
              {location.pathname != "/dashboard" ? (
                <Button className="rounded-full px-6 text-sm">
                  <Link to="/dashboard">Dashboard</Link>
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

import { NavLink, useNavigate } from "react-router-dom";
import { API } from "../apis/api";
import { getToken, removeUserSession } from "../utils/common";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const token = getToken();
  const [profile, setProfile] = useState({});
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getProfile = async () => {
    await API.get("api/user", config)
      .then((res) => {
        const response = res.data;
        setProfile(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  const handleLogout = async () => {
    await API.delete("api/user/logout", config)
      .then(() => {
        removeUserSession();
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={"/home"}>
            Book FE
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className=" collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <NavLink className="nav-link mx-2 active" to={"/home"}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link mx-2 dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {profile.name}
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        handleProfile();
                      }}
                    >
                      My profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

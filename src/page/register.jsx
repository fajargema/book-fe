import { useEffect, useState } from "react";
import { API } from "../apis/api";
import { getToken } from "../utils/common";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/login.css";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  // const [data, setData] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirm,
    };
    if (email === "") {
      alert("please input your email");
    } else if (password === "") {
      alert("please enter your password");
    } else if (password !== confirm) {
      alert("passwords do not match");
    } else {
      await API.post("api/register", body)
        .then(() => {
          navigate("/", { replace: true });
        })
        .catch((err) => {
          const errorResponse = err.response;
          if (errorResponse.status === 401) {
            alert("Email or Password is invalid");
          }
        });
    }
    // password === ""
    //   ? alert("please fill your password")
    //   : alert(`email:${email}\n password:${password} `);
  };
  const isLoggedIn = () => {
    const token = getToken();
    if (token) {
      navigate("/home", { replace: true });
    }
  };
  // const
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <>
      <div id="main-wrapper" className="container card-auth">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="card border-0">
              <div className="card-body p-0">
                <div className="row no-gutters">
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="mb-5">
                        <h3 className="h4 font-weight-bold text-theme">
                          Register
                        </h3>
                      </div>
                      <h6 className="h5 mb-3">Welcome!</h6>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                          <label htmlFor="name">Full Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="email">Email address</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="password">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group mb-5">
                          <label htmlFor="confirm">Password Confirmation</label>
                          <input
                            type="password"
                            className="form-control"
                            id="confirm"
                            value={confirm}
                            onChange={(e) => {
                              setConfirm(e.target.value);
                            }}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-theme"
                          // onClick={handleSubmit}
                        >
                          Register
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-none d-lg-inline-block">
                    <div className="account-block rounded-right">
                      <div className="overlay rounded-right" />
                      <div className="account-testimonial">
                        <h4 className="text-white mb-4">
                          This beautiful theme yours!
                        </h4>
                        <p className="lead text-white">
                          Best investment i made for a long time. Can only
                          recommend it for other users.
                        </p>
                        <p>- Admin User</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-muted text-center mt-3 mb-0">
              Already have an account?
              <NavLink
                className="text-primary ms-1 text-decoration-none text-primary"
                to={"/"}
              >
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;

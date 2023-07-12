import { useEffect, useState } from "react";
import { API } from "../apis/api";
import { getToken, setTokenSession } from "../utils/common";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [data, setData] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email: email,
      password: password,
    };
    if (email === "") {
      alert("please input your email");
    } else if (password === "") {
      alert("please enter your password");
    } else {
      await API.post("api/login", body)
        .then((res) => {
          const response = res.data;
          setTokenSession(response.token);
          navigate("/home", { replace: true });
        })
        .catch((err) => {
          const errorResponse = err.response;
          console.log(errorResponse.status);
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
      <div className="col-6">
        <div
          className="container-fluid bg-secondary-subtle "
          style={{ height: "100vh" }}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}>
              Submit
            </button>
          </div>
          {/* <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div> */}
        </div>
      </div>
      <div className="col-6"></div>
    </>
  );
};
export default Login;

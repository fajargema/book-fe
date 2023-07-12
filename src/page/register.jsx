import { useEffect, useState } from "react";
import { API } from "../apis/api";
import { getToken } from "../utils/common";
import { useNavigate } from "react-router-dom";

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
      <div className="col-6">
        <div
          className="container-fluid bg-secondary-subtle "
          style={{ height: "100vh" }}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
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
          </div>

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

          <div className="mb-3">
            <label htmlFor="confirm" className="form-label">
              Password Confirmation
            </label>
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
            className="btn btn-primary"
            onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <div className="col-6"></div>
    </>
  );
};
export default Login;

import { useEffect, useState } from "react";
import { API } from "../apis/api";
import { getToken } from "../utils/common";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [profile, setProfile] = useState({});
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getProfile = async () => {
    setIsLoading(true);
    await API.get("api/user", config)
      .then((res) => {
        const response = res.data;
        setProfile(response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const getBook = async () => {
    setIsLoading(true);
    await API.get(`api/books?page=${page}`, config)
      .then((res) => {
        const response = res.data;
        setData(response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  const handleLogout = async () => {
    await API.post("api/user/logout", config)
      .then(() => {
        navigate("/home", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };
  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };
  const handleDelete = async (id) => {
    await API.delete(`api/books/${id}`, config)
      .then(() => {
        alert("Book successfully deleted!");
        getBook();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProfile();
    getBook();
  }, []);
  return (
    <>
      {isLoading ? (
        <>
          <h1>Loading Data</h1>
        </>
      ) : (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="fas fa-bars" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <a className="navbar-brand mt-2 mt-lg-0" href="#">
                  Book React
                </a>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Home
                    </a>
                  </li>
                </ul>
              </div>
              <div className="d-flex align-items-center">
                <a className="text-reset me-3" href="#">
                  <i className="fas fa-shopping-cart" />
                </a>
                <div className="dropdown">
                  <a
                    className="dropdown-toggle d-flex align-items-center hidden-arrow"
                    href="#"
                    id="navbarDropdownMenuAvatar"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                      className="rounded-circle"
                      height={25}
                      alt="Black and White Portrait of a Man"
                      loading="lazy"
                    />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuAvatar"
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
                </div>
              </div>
            </div>
          </nav>

          <div className="container">
            <div className="row">
              <h1>Selamat datang {profile.name}</h1>
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/add");
                }}
              >
                + Add Book
              </button>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">ISBN</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Published</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((e, i) => (
                    <>
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{e.isbn}</td>
                        <td>{e.title}</td>
                        <td>{e.author}</td>
                        <td>{moment(e.published).format("MMMM DD, YYYY")}</td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm mx-1"
                            onClick={() => {
                              handleDetail(e.id);
                            }}
                          >
                            detail
                          </button>
                          <button
                            className="btn btn-primary btn-sm mx-1"
                            onClick={() => {
                              handleUpdate(e.id);
                            }}
                          >
                            update
                          </button>
                          <button
                            className="btn btn-danger btn-sm mx-1"
                            onClick={() => {
                              const confirmDelete = window.confirm(
                                "Are you sure you want to delete this item?"
                              );
                              if (confirmDelete) {
                                handleDelete(e.id);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Home;

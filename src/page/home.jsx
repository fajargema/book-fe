import { useEffect, useState } from "react";
import { API } from "../apis/api";
import { getToken } from "../utils/common";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar";
import "../assets/card.css";

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
          <Navbar />

          <div className="container">
            <div className="row">
              <h1>Selamat datang {profile.name}</h1>
              <hr />
              <div className="container mb-3">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigate("/add");
                  }}
                >
                  + Add Book
                </button>
              </div>

              {data?.data?.map((e) => (
                <>
                  <div className="container">
                    <div className="card card-custom">
                      <div className="card-body">
                        <h5 className="card-title">{e.title}</h5>
                        <p>
                          {moment(e.published).format("MMMM DD, YYYY")} |{" "}
                          <i>
                            {e.pages} pages | {e.publisher}
                          </i>
                        </p>
                        <hr />
                        <p className="card-text">{e.description}</p>
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
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Home;

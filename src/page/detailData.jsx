import { useEffect, useState } from "react";
import { API } from "../apis/api";
import { getToken } from "../utils/common";
import { useParams } from "react-router-dom";

const DetailData = () => {
  const { id } = useParams();
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const getBook = async () => {
    setIsLoading(true);
    await API.get(`api/books/${id}`, config)
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
  useEffect(() => {
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
          <div className="container mt-5">
            <div className="card">
              <div className="card-header">
                <h1 className="card-title">Detail buku {data.title}</h1>
              </div>
              <div className="card-body">
                <p className="card-text">Judul : {data.title}</p>
                <p className="card-text">ISBN : {data.isbn}</p>
                <p className="card-text">Subtitle : {data.subtitle}</p>
                <p className="card-text">Author : {data.author}</p>
                <p className="card-text">Published : {data.published}</p>
                <p className="card-text">Publisher : {data.publisher}</p>
                <p className="card-text">Pages : {data.pages}</p>
                <p className="card-text">Description : {data.description}</p>
                <p className="card-text">Website : {data.website}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default DetailData;

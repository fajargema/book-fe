import { useEffect, useState } from "react";
import { API } from "../apis/api";
import { getToken } from "../utils/common";

const Profile = () => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({});
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
  useEffect(() => {
    getProfile();
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
                <h1 className="card-title">{profile.name}</h1>
              </div>
              <div className="card-body">
                <p className="card-text">Email : {profile.email}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Profile;

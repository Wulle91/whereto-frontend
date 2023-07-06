import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { followHelper, followLocationHelper, 
          unfollowHelper, unfollowLocationHelper} from "../utils/utils";


const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    // we will use the pageProfile later!
    pageProfile: { results: [] },
    popularLocations: { results: [] },
  });

  const currentUser = useCurrentUser();

  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
        
      });
       setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);
 
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollowLocation = async (clickedLocation) => {
    try {
      const { data } = await axiosRes.post("/follow/", {
        followed_location: clickedLocation.id,
      
      });
      setProfileData((prevState) => ({
        ...prevState,
        popularLocations: {
          ...prevState.popularLocations,
          results: prevState.popularLocations.results.map((location) =>
            followLocationHelper(location, clickedLocation, data.id)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollowLocation = async (clickedLocation) => {
    try {
      await axiosRes.delete(`/follow/${clickedLocation.following_id}/`);

      setProfileData((prevState) => ({
        ...prevState,
        popularLocations: {
          ...prevState.popularLocations,
          results: prevState.popularLocations.results.map((location) =>
            unfollowLocationHelper(location, clickedLocation)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/locations/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularLocations: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={{ setProfileData,
        handleFollow, handleFollowLocation, handleUnfollow, handleUnfollowLocation}}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
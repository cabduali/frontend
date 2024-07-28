import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../pages/navbar";
import FriendListWidget from "../pages/widgets/FriendListWidget";
import MyPostWidget from "../pages/widgets/MyPostWidget";
import PostsWidget from "../pages/widgets/PostsWidget";
import UserWidget from "../pages/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    try {
      console.log(`Fetching user with ID: ${userId}`); // Debugging line
      const response = await fetch(`https://backend-project-yye9.onrender.com/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId, token]); // Add userId and token to dependencies

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;

import { Box, Typography, useMediaQuery, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from   
 '../pages/navbar';
import FriendListWidget from '../pages/widgets/FriendListWidget';
import MyPostWidget from '../pages/widgets/MyPostWidget';
import PostsWidget from '../pages/widgets/PostsWidget';
import UserWidget from '../pages/widgets/UserWidget';   


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');   


  const getUser = async () => {
    try   
 {
      setLoading(true);
      const response = await fetch(`https://backend-project-yye9.onrender.com/profile/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        console.error('Error fetching user:', response.status);
        // Handle error, e.g., display error message or redirect
        setLoading(false);
        return;
      }

      const data = await response.json();
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user:', error);
      // Handle error, e.g., display error message or redirect
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box>
        <Navbar />
        <Typography variant="h5">User not found.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget   
 userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}   

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

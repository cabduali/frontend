import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../index";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends) || []; // Default to empty array if undefined

  const getFriends = async () => {
    try {
      const response = await fetch(
        `https://backend-project-yye9.onrender.com/users/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch friends");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        console.error("Unexpected data format:", data);
        return;
      }

      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
      {Array.isArray(friends) && friends.map((friend) => (
  <Friend
    key={friend._id}
    friendId={friend._id}
    name={`${friend.firstName} ${friend.lastName}`}
    subtitle={friend.occupation} 

    userPicturePath={friend.picturePath} 

  />
))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;

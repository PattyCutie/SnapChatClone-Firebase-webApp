import React, { useEffect, useState } from "react";
import "./chats.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";
import { selectUser } from "./features/appSlice";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { onSnapshot, collection, db, orderBy, query, auth } from "./firebase";
import { resetCameraImage } from "./features/cameraSlice";

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // firebase
  const collectionRef = collection(db, "posts");
  const q = query(collectionRef, orderBy("timestamp", "desc"));

  useEffect(() => {
    onSnapshot(q, (snapshot) => {

      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),

        }))
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    navigate('/');
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar 
        src={user.profilePic}
        onClick={() => auth.signOut()}        
        className="chats__avatar" 
        
        />
        <div className="chats__search">
          <SearchIcon className="chats__searchIcon" />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubbleIcon className="chats__chatIcon" />
      </div>

      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>
      <RadioButtonUncheckedIcon
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      ></RadioButtonUncheckedIcon>
    </div>
  );
}

export default Chats;

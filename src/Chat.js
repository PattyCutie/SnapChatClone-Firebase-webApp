import React from "react";
import "./chat.css";
import { Avatar } from "@mui/material";

import StopRoundedIcon from "@mui/icons-material/StopRounded";
import Timeago from "react-timeago";

import { selectImage } from "./features/appSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db, updateDoc, doc } from "./firebase";

function Chat({ id, profilePic, username, timestamp, imageUrl, read }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = () => {
    if (!read) {
      const documentRef = doc(db, 'posts', id);
      dispatch(selectImage(imageUrl));
      updateDoc(documentRef, {
        read: true,
      });
      
      navigate('/chats/view');
    }
  };

  return (
    <div onClick={open} className="chat">
      <Avatar className="chat__avatar" src={profilePic} />
      <div className="chat__info">
        <h4>{username}</h4>
        <p>
          {!read && "Tap to view -"}{" "}
          <Timeago date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>
      {!read && <StopRoundedIcon className="chat__readIcon" />}
    </div>
  );
}

export default Chat;

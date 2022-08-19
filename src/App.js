import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WebcamCapture from "./WebcamCapture";
import Preview from "./Preview";
import Chats from "./Chats";
import ChatView from "./ChatView";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import Login from "./Login";
import { onAuthStateChanged, auth } from "./firebase";

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // user sign in
        dispatch(login({
          displayName: user.displayName,
          email: user.email,
          profilePic: user.photoURL,
        }))
      }
      else {
        dispatch(logout())
      }
    })
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="app">
      <BrowserRouter>
      {!user ? (
        <Login /> 
      ) : (
        <>
        <img
							className="app__logo"
							src="https://upload.wikimedia.org/wikipedia/fr/a/ad/Logo-Snapchat.png"
							alt=""
						/>
            <div className="app__body">
          <div className="app__bodyBackground">
            <Routes>
              <Route exact path="/" element={<WebcamCapture />} />
              <Route path="/preview" element={<Preview />} />
              <Route exact path="/chats" element={<Chats />} />
              <Route exact path="/chats/view" element={<ChatView />} />
            </Routes>
          </div>
        </div>
            </>
      )}
        
      </BrowserRouter>
    </div>
  );
}

export default App;

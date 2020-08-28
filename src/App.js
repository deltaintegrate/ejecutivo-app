import React, { useState } from 'react';
import { ToastContainer } from "react-toastify";
import firebase from './utils/Firebase'
import "firebase/auth";
import Auth from "./pages/Auth";
import LoggedLayout from "./layouts/LoggedLayout"

function App() {
  
  const [user, setUser] = useState(true);
  const [isloading, setIsLoading] = useState(true);
  const [reloadApp, setReloadApp] = useState(false)

  firebase.auth().onAuthStateChanged(currentUser =>{
    
    if (!currentUser?.emailVerified){
      firebase.auth().signOut();
      setUser(null)
    } else {
      setUser(currentUser);
    }
    setIsLoading(false);

  });

  if(isloading){
    return null;
  }

  return (
    <>
      {!user ? <Auth /> : <LoggedLayout user= {user} setReloadApp={setReloadApp} />}
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        puaseOnVisibilityChange
        draggable
        pauseOnHover={true}
      />
    </>
  )
}



export default App;

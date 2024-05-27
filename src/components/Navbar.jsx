import React, { useContext, useState } from 'react';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
import { SfNav } from 'react-sf-building-blocks';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from '../pages/Home';
import Logo from "../img/worknmeet_logo.png";

import Profile from '../pages/Profile';
import MessagesPage from '../pages/MessagesPage';



const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    const [friendRequestMessage, setFriendRequestMessage] = useState(null);

    const handleFriendRequest = () => {
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    };

    return (
        <div>
            <SfNav
                brandLogo={Logo}
                brand="Work'n Meet"
                showSignIn={false}
                enableRouting={true}
                showProfile={true}
                classNameProfilePicture={"profile-photo"}
                //stylesContainerDesktop={{backgroundImage: "linear-gradient(#FFF, rgba(1, 124, 226, 0.1098039216))"}}
                profilePicture={currentUser.photoURL}
                homeMenu={{ component: <Home />, caption: 'home', link: " " }}
                menu={[
                    { caption: 'Profile', link: 'profile', component: <Profile /> },
                    { caption: 'Messages', link: 'messages', component: <MessagesPage /> },
                ]}
                profilePreamble={
                    <div
                        style={{
                            width: '100%',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                        }}
                    >
                        <small>Hi {currentUser.displayName}!</small>
                        <br />
                        <small></small>
                    </div>
                }
                profileComponent={
                    <div
                        style={{
                            width: '100%',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                        }}
                    >
                        <small>
                            {' '}
                            <button onClick={() => signOut(auth)}>Logout</button>
                        </small>
                    </div>
                }
            />

            {friendRequestMessage && (
                <div className="friend-request-message">
                    {friendRequestMessage}
                </div>
            )}
        </div>
    );
};

export default Navbar;

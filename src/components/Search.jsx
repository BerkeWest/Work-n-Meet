import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Search = () => {
    const [username, setUsername, location, setLocation, email, setEmail, university, setUniversity] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
            where("displayName", "==", username)
        );

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            setErr(true);
        }
    };

    const handleSearch2 = async () => {
        const q = query(
            collection(db, "users"),
            where("location", "==", document.getElementById("location").value)
        );

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            setErr(true);
        }
    };
    const handleSearch3 = async () => {
        const q = query(
            collection(db, "users"),
            where("university", "==", document.getElementById("university").value)
        );

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            setErr(true);
        }
    };
    const handleSearch4 = async () => {
        const q = query(
            collection(db, "users"),
            where("email", "==", document.getElementById("email").value)
        );

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            setErr(true);
        }
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };
    const handleKey2 = (e) => {
        e.code === "Enter" && handleSearch2();
    };
    const handleKey3 = (e) => {
        e.code === "Enter" && handleSearch3();
    };
    const handleKey4 = (e) => {
        e.code === "Enter" && handleSearch4();
    };


    const handleSelect = async () => {
        //check whether the group(chats in firestore) exists, if not create
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
        } catch (err) { }

        setUser(null);
        setUsername("")
        setLocation("")
    };

//    const handleSendFriendRequest = async () => {
//        try {

//            const friendUid = user.uid;
//            const friendRequestsRef = doc(db, "friendRequests", currentUser.uid);
//            const friendRequestsSnapshot = await getDoc(friendRequestsRef);
//            const friendRequestsData = friendRequestsSnapshot.data();

//            if (!(friendUid in (friendRequestsData || {}))) {
//                const friendInfo = {
//                    displayName: user.displayName,
//                    photoURL: user.photoURL,
//                    date: serverTimestamp(),
//                };

//                await setDoc(friendRequestsRef, { [friendUid]: friendInfo }, { merge: true });

//                toast.success(`Friend request sent to ${user.displayName}`);
//            } else {
//                toast.warning(`Friend request to ${user.displayName} already sent`);
//            }
//        } catch (error) {
//            console.error("Error sending friend request:", error);
//        }
//    };

//    const handleSendFriendRequest2 = async () => {
//        try {

//            const friendUid = user.uid;
//            //const friendRequestsRef = doc(db, "friendRequests", currentUser.uid);

//            const friendRequestsRef = collection(db, 'friendRequests');
//            const sentRequestsSnapshot = await getDocs(query(friendRequestsRef, where('friendUid', '==', friendUid)));

//            const receivedRequestsSnapshot = await getDocs(query(friendRequestsRef, where('receiverUid', '==', friendUid)));


///*            const friendRequestsSnapshot = await getDoc(friendRequestsRef);*/
//            const friendRequestsData = sentRequestsSnapshot.data();

//            if (!(friendUid in (friendRequestsData || {}))) {
//                const friendInfo = {
//                    displayName: user.displayName,
//                    photoURL: user.photoURL,
//                    date: serverTimestamp(),
//                };

//                await setDoc(friendRequestsRef, { [friendUid]: friendInfo }, { merge: true });

//                toast.success(`Friend request sent to ${user.displayName}`);
//            } else {
//                toast.warning(`Friend request to ${user.displayName} already sent`);
//            }
//        } catch (error) {
//            console.error("Error sending friend request:", error);
//        }
//    };


    return (

        <div className="search">

            <div className="searchForm">
                <h4 style={{ color: "white" }}>Filter</h4>
                <ul class="list-group" id="myList">
                    
                    <li class="list-group-item"> <input
                        type="text"
                        placeholder="Username"
                        onKeyDown={handleKey}
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                    </li>
                    <li class="list-group-item">    <input
                        type="text"
                        placeholder="location"
                        id="location"
                        onKeyDown={handleKey2}
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                    /></li>
                    <li class="list-group-item">       <input
                        type="text"
                        placeholder="Email"
                        id="email"
                        onKeyDown={handleKey3}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    /></li>
                    <li class="list-group-item">      <input
                        type="text"
                        placeholder="university"
                        id="university"
                        onKeyDown={handleKey4}
                        onChange={(e) => setUniversity(e.target.value)}
                        value={university}
                    /></li>
                   
                </ul>  


      </div>
      {err && <span>Bulunamadı</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
                      <span>{user.displayName}</span>
                      {/*<button className="btn btn-success" onClick={handleSendFriendRequest}>Arkadas Ekle</button>*/}
                  </div>
                  <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

        </div>

      )}
    </div>
  );
};

export default Search;

//import React, { useContext, useState } from "react";
//import {
//    collection,
//    query,
//    where,
//    getDocs,
//    setDoc,
//    doc,
//    updateDoc,
//    serverTimestamp,
//    getDoc
//} from "firebase/firestore";
//import { db } from "../firebase";
//import { AuthContext } from "../context/AuthContext";
//import { ToastContainer, toast } from "react-toastify";

//export const Search = () => {
//    const [username, setUsername] = useState("");
//    const [user, setUser] = useState(null);
//    const [err, setErr] = useState(false);
//    const senderUid = "kullanici1Uid";
//    const friendRequestsRef = collection(db, 'friendRequests');

//    // Kullanıcının gönderdiği istekleri al
//    const friendRequestId = user.uid; // Örnek bir belge kimliği
//    const friendRequestDoc = doc(friendRequestsRef, friendRequestId);

//    // Arkadaşlık isteğini kabul et
//    await updateDoc(friendRequestDoc, { status: "accepted" });

//    const { currentUser } = useContext(AuthContext);

//    const handleSearch = async () => {
//        const q = query(
//            collection(db, "users"),
//            where("displayName", "==", username)
//        );

//        try {
//            const querySnapshot = await getDocs(q);

//            const sentRequestsSnapshot = await getDocs(query(friendRequestsRef, where('senderUid', '==', senderUid)));

//            // Kullanıcının aldığı istekleri al
//            const receivedRequestsSnapshot = await getDocs(query(friendRequestsRef, where('receiverUid', '==', senderUid)));

//            querySnapshot.forEach((doc) => {
//                setUser(doc.data());
//            });
//        } catch (err) {
//            setErr(true);
//        }
//    };

//    const handleKey = (e) => {
//        e.code === "Enter" && handleSearch();
//    };

//    const handleSelect = async () => {
//        const combinedId = currentUser.uid > user.uid
//            ? currentUser.uid + user.uid
//            : user.uid + currentUser.uid;
//        try {
//            const res = await getDoc(doc(db, "chats", combinedId));

//            if (!res.exists()) {

//                await setDoc(doc(db, "chats", combinedId), { messages: [] });

//                await updateDoc(doc(db, "userChats", currentUser.uid), {
//                    [combinedId + ".userInfo"]: {
//                        uid: user.uid,
//                        displayName: user.displayName,
//                        photoURL: user.photoURL,
//                    },
//                    [combinedId + ".date"]: serverTimestamp(),
//                });

//                await updateDoc(doc(db, "userChats", user.uid), {
//                    [combinedId + ".userInfo"]: {
//                        uid: currentUser.uid,
//                        displayName: currentUser.displayName,
//                        photoURL: currentUser.photoURL,
//                    },
//                    [combinedId + ".date"]: serverTimestamp(),
//                });
//            }
//        } catch (err) { }

//        setUser(null);
//        setUsername("");
//    };

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
//            console.error("Error ",
//                sending, friend, request, ", error);");
//        }
//    };

//    return (
//        <div className="search">
//            <div className="searchForm">
//                <input
//                    type="text"
//                    placeholder="Arkadas Ara"
//                    onKeyDown={handleKey}
//                    onChange={(e) => setUsername(e.target.value)}
//                    value={username} />
//            </div>
//            {err && <span>Bulunamadı</span>}
//            {user && (
//                <div className="userChat" onClick={handleSelect}>
//                    <img src={user.photoURL} alt="" />
//                    <div className="userChatInfo">
//                        <span>{user.displayName}</span>
//                        <button className="btn btn-success" onClick={handleSendFriendRequest}>Arkadas Ekle</button>
//                    </div>
//                    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

//                </div>

//            )}
//        </div>
//    );
//};

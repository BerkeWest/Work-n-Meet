import React, { useContext, useState, useEffect, useCallback } from 'react';

import Swal from 'sweetalert2';
import { divlection, addDoc } from "firebase/firestore";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Form, Button } from 'react-bootstrap';
import '../styles/profile.css';
import { db } from '../firebase.js'
import { AuthContext } from '../context/AuthContext';
import { gsap } from "gsap";
import Add from "../img/addAvatar.png";



const ProfileForms = ({ users, setUsers, getUsers }) => {

    const { currentUser } = useContext(AuthContext);

    const [setChats, setMessages] = useState([]);

    const [displayName, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [university, setUniversity] = useState('');
    const [uniType, setUniType] = useState(false);
    const [birthday, setBirthday] = useState('');
    const [workplace, setWorkplace] = useState('');
    const [workTypeF2F, setWorkTypeF2F] = useState(false);
    const [workTypeOnline, setWorkTypeOnline] = useState(false);

    const [initialValues, setInitialValues] = useState({});
    const [buttonEnabled, setButtonEnabled] = useState(false);

    const ProfileForm = async (e) => {

        const docRef = doc(db, "profile", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }


    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
                setUsername(doc.data().displayName)
                setFirstName(doc.data().firstName)
                setLastName(doc.data().lastName)
                setEmail(doc.data().email)
                setLocation(doc.data().location)
                setUniversity(doc.data().university == null ? "" : doc.data().university)
                setUniType(doc.data().university == "")
                setBirthday(doc.data().birthday)
                setWorkplace(doc.data().workplace)
                setWorkTypeOnline(doc.data().workTypeOnline)
                setWorkTypeF2F(doc.data().workTypeF2F)

                setInitialValues({
                    displayName: doc.data().displayName,
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    email: doc.data().email,
                    location: doc.data().location,
                    university: doc.data().university == null ? "" : doc.data().university,
                    uniType: doc.data().university == "",
                    birthday: doc.data().birthday,
                    workplace: doc.data().workplace,
                    workTypeOnline: doc.data().workTypeOnline,
                    workTypeF2F: doc.data().workTypeF2F
                });
            });

            return () => {
                unsub();
            };



        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    useEffect(() => {
        if (displayName != initialValues.displayName || firstName != initialValues.firstName || lastName != initialValues.lastName || email != initialValues.email || location != initialValues.location || university != initialValues.university || uniType != initialValues.uniType || birthday != initialValues.birthday || workplace != initialValues.workplace || workTypeF2F != initialValues.workTypeF2F || workTypeOnline != initialValues.workTypeOnline)
            setButtonEnabled(true)
        else
            setButtonEnabled(false)
    }, [displayName, firstName, lastName, email, location, university, uniType, birthday, workplace, workTypeF2F, workTypeOnline])


    const handleInputChange = (e) => {
        const docRef = doc(db, "profile", currentUser.uid);
        const docSnap = getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    };


    const handleAdd = async (e) => {
        e.preventDefault();

        //const displayName = e.target[0].value;
        //const email = e.target[1].value;

        //await setDoc(doc(db, "users"), {

        //    displayName,
        //    email,

        //});

        await setDoc(doc(db, "users", currentUser.uid), {
            firstName,
            lastName,
            email,
            displayName,
            location,
            university,
            birthday,
            workplace,
            workTypeOnline,
            workTypeF2F
        });


        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${firstName} ${lastName}'s data has been Added.`,
            showConfirmButton: false,
            timer: 1500,
        });

        setButtonEnabled(false)
    };



    //const [formData, setFormData] = useState({
    //    username: '',
    //    firstName: '',
    //    lastName: '',
    //    location: '',
    //    email: '',
    //    birthDate: '',
    //    profileImage: '',
    //    university: '',
    //    workplace: '',
    //    workType: [],
    //});

    //const handleInputChange = (e) => {
    //    const { name, value } = e.target;
    //    setFormData((prevData) => ({
    //        ...prevData,
    //        [name]: value,
    //    }));
    //};

    //const handleCheckboxChange = (e) => {
    //    const { name, checked } = e.target;
    //    setFormData((prevData) => ({
    //        ...prevData,
    //        [name]: checked ? [...prevData[name], e.target.value] : prevData[name].filter(option => option !== e.target.value),
    //    }));
    //};

    //const handleSaveChanges = () => {
    //    console.log('G�ncellenen Kullan�c� Bilgileri:', formData);
    //};

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
            console.log('Profil Resmi Değiştirildi:', selectedFile);
        } else {
            console.log('Lütfen bir dosya seçin.');
        }
    };

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastName = (e) => {
        setLastName(e.target.value);
    }

    const handleLocation = (e) => {
        setLocation(e.target.value);
    }

    const handleBirthday = (e) => {
        setBirthday(e.target.value);
    }

    const handleUniversity = (e) => {
        setUniversity(e.target.value);
    }

    const handleWorkplace = (e) => {
        setWorkplace(e.target.value);
    }

    const handleNonStudy = (e) => {
        setUniType(e.target.checked)
        setUniversity("")
    }

    const handleF2F = (e) => {
        setWorkTypeF2F(e.target.checked)
    }

    const handleOnline = (e) => {
        setWorkTypeOnline(e.target.checked)
    }

    return (


        <div className="container rounded bg-white mt-5 mb-5">
            <form onSubmit={handleAdd}>
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="card text-center">
                            <div className="card-body">
                                <img className="mt-5 profile-photo" id="myImg" width="150px"
                                    src={currentUser.photoURL}
                                    alt="Profil Resmi"></img>
                                <h5 className="font-weight-bold mt-3">
                                    <input type="text" className="form-control" id="firstName2" style={{
                                        borderColor: "transparent", textAlign: "center", fontWeight: "bold"
                                    }} disabled value={displayName} />
                                </h5>

                                <input type="text" className="form-control" id="email2" style={{
                                    borderColor: "transparent", textAlign: "center"
                                }} disabled value={email} />



                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Account Details</h4>
                            </div>
                            <div className="mt-2">
                                <label htmlFor="username">Username</label>
                                <input required type="text" className="form-control" id="displayName" placeholder="Enter your username" value={displayName} onChange={handleUsername} />
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label htmlFor="firstName">Firstname</label>
                                    <input required type="text" className="form-control" id="firstName" placeholder="Enter your firstname" value={firstName} onChange={handleFirstName} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="lastName">Lastname</label>
                                    <input required type="text" className="form-control" id="lastName" placeholder="Enter your lastname" value={lastName} onChange={handleLastName} />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label htmlFor="location">Location</label>
                                    <input required type="text" className="form-control" id="location" placeholder="Enter your Location" value={location} onChange={handleLocation} />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <label htmlFor="email">E-mail</label>
                                    <input required type="text" className="form-control" id="email" placeholder="Enter your E-Mail Adress" value={email} onChange={handleEmail} />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label htmlFor="birthDate">Birthday</label>
                                    <input required type="date" className="form-control" id="birthday" value={birthday} onChange={handleBirthday} />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label htmlFor="university">University</label>
                                    <input required type="text" className="form-control" id="university" placeholder="Enter your university" value={university} disabled={uniType} onChange={handleUniversity} />

                                    <input className="form-check-input" type="checkbox" name="uniType" id="uniType" checked={uniType} onChange={handleNonStudy} />
                                    <label className="form-check-label">I don't attend university</label>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label htmlFor="workplace">Workplace</label>
                                    <input required type="text" className="form-control" id="workplace" placeholder="Enter your workplace" value={workplace} onChange={handleWorkplace} />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label>Work Type Preferences</label>
                                    <div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="workTypeF2F" name="workType" checked={workTypeF2F} onChange={handleF2F} />
                                            <label className="form-check-label" htmlFor="workTypeF2F">Face-to-Face</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="workTypeOnline" name="workType" checked={workTypeOnline} onChange={handleOnline} />
                                            <label className="form-check-label" htmlFor="workTypeOnline">Online</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 text-center">
                                <button id='submit-button' className="btn btn-primary" disabled={!buttonEnabled}>Save Profile</button>
                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </div>


        //<div className="formContainer rounded bg-white mt-5 mb-5">
        //    <div className="formWrapper row">
        //        <form onSubmit={handleAdd}>
        //            <div className=" border-right">
        //                <div className="p-3 py-5">
        //                    <div className="d-flex justify-content-between align-items-center mb-3">
        //                        <h4 className="text-right">Account Details</h4>
        //                    </div>
        //                </div>
        //                <div className="mt-2">
        //                    <div className="col-md-12">
        //                        <label>Username</label>
        //                        <input type="text" name="username" placeholder="Enter your username"></input>
        //                    </div>
        //                </div>


        //            {/*<input id="lastName" type="email" />*/}
        //            {/*<input id="email" type="text" />*/}
        //            {/*<input id="displayName" type="text" />*/}
        //            {/*<input id="location" type="text" />*/}
        //            {/*<input id="university" type="text" />*/}
        //            {/*<input id="uniType" type="text" />*/}
        //            {/*<input  type="file" id="photoURL" />*/}
        //            {/*<label htmlFor="file">*/}
        //            {/*    <img src={Add} alt="" />*/}
        //            {/*    <span>Add an avatar</span>*/}
        //            {/*</label>*/}
        //            {/*<input id="birthday" type="text" />*/}
        //            {/*<input id="workplace" type="text" />*/}
        //            {/*<input id="workTypeFull" type="text" />*/}
        //            {/*<input id="workTypePart" type="text" />*/}

        //            {/*    <button >Sign up</button>*/}
        //            </div>
        //        </form>

        //    </div>
        //</div>





    );
};

export default ProfileForms;

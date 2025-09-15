import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {  onAuthStateChanged } from "firebase/auth";
import { LOGO } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";

const Header = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const handleSignOut = () => {
        signOut(auth).then(() => {
            
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        navigate("/error")
});
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const{uid, email, displayName, photoURL} = user;
            dispatch(addUser({uid: uid, 
                email:email, 
                displayName: displayName, 
                photoURL:photoURL
            }));

            navigate("/browse")
            
            
            // ...
        } else {
            dispatch(removeUser());
            navigate("/")
            
            // User is signed out
            // ...
        }
    }); 
    //unsubscribe when component unmount
    return () => unsubscribe();
    }, [])

    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView())
    }
  

    return(
        <div className="absolute w-screen top-0 left-0 z-50 px-8 py-2 bg-gradient-to-b from-black flex justify-between">
            <img 
            className="w-44 p-2"
            src={LOGO}
            alt="Logo"
            />
            {user && (<div className="flex p-4" >
                <button className="py-2 px-4 mx-4 my-2 bg-purple-950 text-white rounded-lg"
                onClick={handleGptSearchClick}>
                    GPT Search
                </button>
                <img
                className="w-14 h-14 p-2" 
                alt="usericon"
                src={user?.photoURL}
                />
                <button
                onClick={handleSignOut}
                className="text-white bg-black w-20 h-10">
                    (Sign Out)</button>
            </div>)}
            
        </div>

    )
}
export default Header;
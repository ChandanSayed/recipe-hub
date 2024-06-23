import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { RiCloseLine } from "react-icons/ri";
import app from "../firebase/firebase.init";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/features/user/userSlice";
import axios from "axios";

const Navbar = () => {
  const [dropDownState, setDropDownState] = useState(false);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const userDetails = useSelector(state => state.userData.value);
  const dispatch = useDispatch();

  function handleGoogleSignIn() {
    signInWithPopup(auth, provider)
      .then(async result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        const res = await axios.post("/login", {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          coin: 50
        });
        dispatch(getUserData(res.data));
        console.log(res.data);
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function handleLogout() {
    signOut(auth)
      .then(() => {
        dispatch(getUserData(null));
        return <Navigate to={"/"} />;
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <nav className="container mx-auto flex items-center justify-between px-4 py-4">
      <Link to={"/"} className="text-3xl font-bold">
        Recipe Center
      </Link>

      <ul className="hidden items-center justify-between gap-10 md:flex">
        <NavLinks />
        {userDetails?.user.name ? (
          <button
            className="bg-dark-white px-3 py-1.5 hover:bg-dark-blue hover:text-white rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-dark-white px-3 py-1.5 hover:bg-dark-blue hover:text-white rounded"
            onClick={handleGoogleSignIn}
          >
            Login
          </button>
        )}
      </ul>
      <div className="relative flex transition-transform md:hidden">
        {!dropDownState ? (
          <CiMenuBurger
            onClick={() => setDropDownState(prev => !prev)}
            className="cursor-pointer text-2xl"
          />
        ) : (
          <RiCloseLine
            onClick={() => setDropDownState(prev => !prev)}
            className="cursor-pointer text-2xl"
          />
        )}
        {dropDownState && (
          <ul className="z-10 gap-2 bg-dark-white absolute right-0 top-11 flex w-[200px] flex-col rounded-lg text-base">
            <NavLinks />
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

function NavLinks() {
  const links = [
    {
      name: "Home",
      to: "/"
    },
    {
      name: "Recipes",
      to: "/recipes"
    },
    {
      name: "Add Recipe",
      to: "/add-recipe"
    }
  ];
  return (
    <>
      {links.map((link, ind) => {
        return (
          <li
            key={ind}
            className="hover:bg-dark-blue md:hover:bg-transparent first-of-type:rounded-t-lg last-of-type:rounded-b-lg md:rounded-none"
          >
            <Link
              className="group flex cursor-pointer flex-col px-6 py-2 md:p-0 hover:text-white md:hover:text-black relative"
              to={link.to}
            >
              {link.name}
              <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-dark-blue transition-all duration-300 group-hover:w-full hidden md:inline-block absolute -bottom-1"></span>
            </Link>
          </li>
        );
      })}
    </>
  );
}

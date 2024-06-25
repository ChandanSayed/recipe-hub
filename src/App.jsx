import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserData, setLoading } from "./redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import app from "./firebase/firebase.init";
import axios from "axios";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const loading = useSelector(state => state.userData.loading);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async user => {
      try {
        const res = await axios.post("/login", {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          coin: 50
        });

        if (res.data) {
          dispatch(getUserData(res.data));
        } else {
          dispatch(getUserData(null));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        dispatch(getUserData(null));
      } finally {
        dispatch(setLoading(false));
      }
    };

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        fetchData(user);
      } else {
        console.log("User is signed out");
        dispatch(getUserData(null));
        dispatch(setLoading(false));
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Outlet />
      {location.pathname !== "/recipes" && <Footer />}
      <ToastContainer />
    </>
  );
}

export default App;

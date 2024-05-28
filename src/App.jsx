import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserData } from "./redux/features/user/userSlice";
import { useDispatch } from "react-redux";
import app from "./firebase/firebase.init";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const auth = getAuth(app);

  async function getData(user, dispatch) {
    console.log(user.email);
    const res = await axios.get(`/user?email=${user.email}`);
    console.log(res.data);
    if (await res.data) {
      dispatch(getUserData(res.data));
    } else {
      dispatch(getUserData(null));
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const uid = user.uid;
        getData(user, dispatch);
      } else {
        console.log("User is signed out");
        dispatch(getUserData(null));
      }
    });
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;

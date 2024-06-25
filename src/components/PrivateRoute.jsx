import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const userDetails = useSelector(state => state.userData.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails?.user?.email) {
      toast.error("Please Login!");
      return navigate("/");
    }
  }, [userDetails, navigate]);
  return children;
};

export default PrivateRoute;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice"; 
import { toast } from "sonner";

export const GithubSuccessRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userInfo = urlParams.get('user');

    if (userInfo) {
      try {
        const user = JSON.parse(decodeURIComponent(userInfo));
        localStorage.setItem('userInfo', JSON.stringify(user)); 
        dispatch(setCredentials(user)); // Optionally store the user in Redux state

        // Redirect the user to the dashboard
        navigate('/dashboard');
      } catch (error) {
        toast.error("Failed to parse user info.");
        console.error(error);
      }
    } else {
      toast.error("Authentication failed. Please try again.");
      navigate('/login'); // Redirect to login if no user info is found
    }
  }, [dispatch, navigate]);

  return <div>Loading...</div>; // Show a loading state while processing
};

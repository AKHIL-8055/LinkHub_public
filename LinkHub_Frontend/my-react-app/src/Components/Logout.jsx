import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.post("https://linkhub-back-ak.onrender.com/logout", {}, { withCredentials: true });

        alert("Logout successful!");
        navigate("/");
      } catch (error) {
        console.error("Logout failed", error);
        alert("Logout failed. Please try again.");
      }
    };

    handleLogout();
  }, [navigate]);

  return null; // No extra button or UI needed
};

export default Logout;

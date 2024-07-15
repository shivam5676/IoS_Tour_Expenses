import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthHandler = () => {
  const navigate = useNavigate();
console.log("inside auth ")
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const authCode = searchParams.get("code");

    if (authCode) {

  
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      Handling authorization...
    </div>
  );
};

export default AuthHandler;

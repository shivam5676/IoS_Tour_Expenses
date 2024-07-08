import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthHandler = () => {
  const navigate = useNavigate();
console.log("inside auth ")
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const authCode = searchParams.get("code");

    if (authCode) {
      console.log('Authorization Code:', authCode);
      // Proceed with using the authorization code, e.g., exchange for access token

      // Redirect to the main application page after handling the authorization code
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

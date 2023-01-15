import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

// Atoms
import { tokenState } from "../atoms/user";

const useCheckJwt = () => {
  const token = useRecoilValue(tokenState);
  const [isAuth, setIsAuth] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsAuth(data.success);
        if (!data.success) {
          localStorage.removeItem("__svm_token");
          navigateTo("/connexion");
        }
      });
  }, [navigateTo, token]);

  return isAuth;
};

export default useCheckJwt;

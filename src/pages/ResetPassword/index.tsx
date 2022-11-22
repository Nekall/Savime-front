import { useState } from "react";
import { useParams } from "react-router-dom";

// Styles
import styles from "../../styles/pages/resetPassword.module.scss";

// Assets
import avatar from "../../assets/images/icon/avatar.svg";

// Components
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Link from "../../components/Link";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPassword = () => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/employees/reset-password/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          confirmPassword: confirmPassword,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.__reset_password}>
      <Header />
      <Wrapper position={"center"}>
        <img className={styles.__avatar} src={avatar} alt="avatar" />
        <Input
          type={"password"}
          placeholder={"Nouveau mot de passe"}
          onChange={(e: any) => setPassword(e.currentTarget.value)}
        />
        <Input
          type={"password"}
          placeholder={"Confirmation du mot de passe"}
          onChange={(e: any) => setConfirmPassword(e.currentTarget.value)}
        />
        <Input
          onClick={() => resetPassword()}
          type={"submit"}
          value={"Réinitialiser mon mot de passe"}
        />
        <Link name={"Retour à l'accueil"} target={"/"} />
      </Wrapper>
    </div>
  );
};

export default ResetPassword;

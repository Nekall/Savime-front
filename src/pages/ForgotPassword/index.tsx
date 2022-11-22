import { useState } from "react";
//import { toast } from 'react-toastify';
//import { useNavigate } from "react-router-dom";

// Styles
import styles from "../../styles/pages/forgotPassword.module.scss";

// Assets
import avatar from "../../assets/images/icon/avatar.svg";

// Components
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Link from "../../components/Link";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  //const [emailSend, setEmailSend] = useState("");

  const sendMail = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/employees/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email
      }),
    })
    .then((response) => response.json())
    .then((data) => { 
      console.log(data);
    })
    .catch((err) => console.error(err));
  };

  return (
    <div className={styles.__forgot_password}>
      <Header />
      <Wrapper position={"center"}>
        <img className={styles.__avatar} src={avatar} alt="avatar" />
        <Input
        type={"email"}
        placeholder={"email@email.com"}
        //error={errors.noErrors && errors.firstname ? false : errors.firstname}
        icon={avatar}
        alt={"avatar"}
        value={email}
        onChange={(e: any) => setEmail(e.currentTarget.value)}
        />
        <Input
          type={"submit"}
          value={"Demande de réinitialisation de mon mot de passe"}
          onClick={() => sendMail()}
        />
        <Link name={"Retour à l'accueil"} target={"/"} />
      </Wrapper>
    </div>
  );
};

export default ForgotPassword;

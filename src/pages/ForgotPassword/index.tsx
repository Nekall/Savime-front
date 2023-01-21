import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const navigateTo = useNavigate();

  const sendMail = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/employees/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Le mail de réinitialisation vous été envoyé !");
          navigateTo("/connexion");
        } else {
          console.error(data);
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  };

  return (
    <div className={styles.__forgot_password}>
      <Header />
      <Wrapper position={"center"}>
        <img className={styles.__avatar} src={avatar} alt="avatar" />
        <form onSubmit={(e) => sendMail(e)}>
          <Input
            type={"email"}
            placeholder={"email@email.com"}
            icon={avatar}
            alt={"avatar"}
            value={email}
            onChange={(e: any) => setEmail(e.currentTarget.value)}
            required
          />
          <Input
            type={"submit"}
            value={"Demande de réinitialisation de mon mot de passe"}
          />
          <Link name={"Retour à l'accueil"} target={"/"} />
        </form>
      </Wrapper>
    </div>
  );
};

export default ForgotPassword;

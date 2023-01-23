import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// Styles
import styles from "../../styles/pages/resetPassword.module.scss";

// Assets
import avatar from "../../assets/images/icon/avatar.svg";
import lock from "../../assets/images/icon/lock.svg";

// Components
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Link from "../../components/Link";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigateTo = useNavigate();

  const resetPassword = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
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
      .then((data) => {
        if (data.success) {
          toast.success("Votre mot de passe a été reinitialisé avec succès !");
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
    <div className={styles.__reset_password}>
      <Header />
      <Wrapper position={"center"}>
        <img className={styles.__avatar} src={avatar} alt="avatar" />
        <form onSubmit={(e) => resetPassword(e)}>
          <Input
            icon={lock}
            type={"password"}
            placeholder={"Nouveau mot de passe"}
            onChange={(e: any) => setPassword(e.currentTarget.value)}
            pattern={
              "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
            }
            required
            togglePasswordVisibility
          />
          <Input
            icon={lock}
            type={"password"}
            placeholder={"Confirmation du mot de passe"}
            onChange={(e: any) => setConfirmPassword(e.currentTarget.value)}
            pattern={
              "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
            }
            required
            togglePasswordVisibility
          />
          <p className={styles.__pwd_details}>
            ⓘ *Le mot de passe doit contenir au moins 8 caractères,
            <br /> une majuscule, une minuscule, un chiffre et un caractère
            spécial.
          </p>
          <Input type={"submit"} value={"Réinitialiser mon mot de passe"} />
          <Link name={"Retour à l'accueil"} target={"/"} />
        </form>
      </Wrapper>
    </div>
  );
};

export default ResetPassword;

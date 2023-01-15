import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Components
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Link from "../../components/Link";

// Assets
import avatar from "../../assets/images/icon/avatar.svg";
import envelope from "../../assets/images/icon/envelope.svg";
import lock from "../../assets/images/icon/lock.svg";

// Styles
import styles from "../../styles/pages/signup.module.scss";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigateTo = useNavigate();

  const signup = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND_URL}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Votre compte a bien été créé !", {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
          navigateTo("/connexion");
        } else {
          toast.error(data.message, {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      })
      .catch((err) => {
        toast.error("Une erreur est survenue. Contactez support@savime.tech", {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      });
  };

  return (
    <div className={styles.__signup}>
      <Header />
      <Wrapper position={"left"}>
        <img className={styles.__avatar} src={avatar} alt="avatar" />
        <form onSubmit={(e) => signup(e)}>
          <Input
            icon={avatar}
            alt={"avatar"}
            type={"text"}
            placeholder={"Prénom"}
            value={firstname}
            onChange={(e: any) => setFirstname(e.currentTarget.value)}
            required
            minlength={2}
            maxlength={50}
          />
          <Input
            icon={avatar}
            alt={"avatar"}
            type={"text"}
            placeholder={"Nom"}
            value={lastname}
            onChange={(e: any) => setLastname(e.currentTarget.value)}
            required
            minlength={2}
            maxlength={50}
          />
          <Input
            icon={envelope}
            type={"email"}
            placeholder={"email@email.com"}
            value={email}
            onChange={(e: any) => setEmail(e.currentTarget.value)}
            required
          />
          <Input
            icon={lock}
            type={"password"}
            placeholder={"Mot de passe*"}
            value={password}
            onChange={(e: any) => setPassword(e.currentTarget.value)}
            required
            minlength={8}
            pattern={
              "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
            }
          />
          <Input
            icon={lock}
            type={"password"}
            placeholder={"Confirmation du mot de passe"}
            value={confirmPassword}
            onChange={(e: any) => setConfirmPassword(e.currentTarget.value)}
            required
            minlength={8}
            pattern={
              "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
            }
          />
          <p className={styles.__pwd_details}>
            ⓘ *Le mot de passe doit contenir au moins 8 caractères,
            <br /> une majuscule, une minuscule, un chiffre et un caractère
            spécial.
          </p>
          <Input type={"submit"} value={"Inscription"} />
          <Link name={"J'ai déjà un compte !"} target={"/connexion"} />
        </form>
      </Wrapper>
    </div>
  );
};

export default Signup;

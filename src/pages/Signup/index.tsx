import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { NavigateFunction, useNavigate } from "react-router-dom";

// Components
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Link from "../../components/Link";
import Tooltip from "../../components/Tooltip";

// Assets
import avatar from "../../assets/images/icon/avatar.svg";
import envelope from "../../assets/images/icon/envelope.svg";
import lock from "../../assets/images/icon/lock.svg";

// Styles
import styles from "../../styles/pages/signup.module.scss";

const Signup = () => {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigateTo: NavigateFunction = useNavigate();

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
          toast.success("Votre compte a bien été créé !");
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
    <div className={styles.__signup}>
      <Tooltip />
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
            togglePasswordVisibility
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
            togglePasswordVisibility
          />
          <p className={styles.__pwd_details}>
            ⓘ *Le mot de passe doit contenir au moins 8 caractères,
          </p>
          <p className={styles.__pwd_details}>
            une majuscule, une minuscule, un chiffre et un caractère spécial.
          </p>
          <Input type={"submit"} value={"Inscription"} disabled />
          <Link name={"J'ai déjà un compte !"} target={"/connexion"} />
        </form>
      </Wrapper>
    </div>
  );
};

export default Signup;

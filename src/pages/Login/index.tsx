import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

// Styles
import styles from "../../styles/pages/login.module.scss";

// Assets
import avatar from "../../assets/images/icon/avatar.svg";
import envelope from "../../assets/images/icon/envelope.svg";
import lock from "../../assets/images/icon/lock.svg";

// Components
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Link from "../../components/Link";

// Atoms
import { tokenState, userDataState } from "../../atoms/user";

// Helpers
import decodeJwt from "../../helpers/decodeJwt";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const navigateTo: NavigateFunction = useNavigate();
  const setUserData = useSetRecoilState(userDataState);
  const setToken = useSetRecoilState(tokenState);

  const login = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/${
        checked ? "managers" : "employees"
      }/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const { token, data: user } = data;
          const { verified } = user;
          const role = decodeJwt(token).role;
          if (!verified && role !== "Manager") {
            return toast.info("Votre compte n'est pas vérifié.");
          }
          localStorage.setItem("__svm_token", token);
          setUserData({
            id: user.employee_id || user.manager_id,
            role: role,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            job: user.job,
            profilePicture: user.profilePicture,
            token: token,
            phone: user.phone,
          });
          setToken(token);
          toast.success("Vous êtes connecté !");
          navigateTo("/tableau-de-bord");
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
    <div className={styles.__login}>
      <Header />
      <Wrapper position={"right"}>
        <img className={styles.__avatar} src={avatar} alt="avatar" />
        <form onSubmit={(e) => login(e)}>
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
            placeholder={"Mot de passe"}
            value={password}
            onChange={(e: any) => setPassword(e.currentTarget.value)}
            required
            togglePasswordVisibility
          />
          <div className={styles.__switch}>
            <p>Connexion à un compte RH </p>
            <input
              type="checkbox"
              id="switch"
              defaultChecked={checked}
              onChange={() => setChecked(!checked)}
            />
            <label htmlFor="switch"></label>
          </div>
          <Input type={"submit"} value={"Connexion"} />
          <Link name={"Pas encore de compte ?"} target={"/inscription"} />
          <Link
            name={"J'ai perdu mon mot de passe"}
            target={"/mot-de-passe-oublie"}
          />
        </form>
      </Wrapper>
    </div>
  );
};

export default Login;

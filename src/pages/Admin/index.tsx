import { useSetRecoilState } from "recoil";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "../../styles/pages/admin.module.scss";

// Assets
import gear from "../../assets/images/icon/gear.svg";
import envelope from "../../assets/images/icon/envelope.svg";
import lock from "../../assets/images/icon/lock.svg";

// Components
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Input from "../../components/Input";

// Atoms
import { tokenState, userDataState } from "../../atoms/user";
import decodeJwt from "../../helpers/decodeJwt";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();
  const setToken = useSetRecoilState(tokenState);
  const setUserData = useSetRecoilState(userDataState);

  const login = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const { token } = data;
          localStorage.setItem("__svm_token", token);
          const role = decodeJwt(token).role;
          setUserData({
            id: null,
            role: role,
            firstname: null,
            lastname: null,
            email: null,
            job: null,
            profilePicture: null,
          });
          setToken(token);
          toast.success("Vous êtes connecté !");
          navigateTo("/admin/panneau-administrateur");
        } else {
          console.error(data);
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  };

  return (
    <div className={styles.__admin_login}>
      <Header />
      <Wrapper position={"center"}>
        <img className={styles.__avatar} src={gear} alt="avatar" />
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
          />
          <Input type={"submit"} value={"Connexion"} />
        </form>
      </Wrapper>
    </div>
  );
};

export default Admin;

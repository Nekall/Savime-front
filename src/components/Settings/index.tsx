import { useRecoilState } from "recoil";
import { useState } from "react";

// Components
import Input from "../Input";

// Styles
import styles from "./styles.module.scss";

// Assets
import avatar from "../../assets/images/icon/avatar.svg";
import envelope from "../../assets/images/icon/envelope.svg";
import rocket from "../../assets/images/icon/rocket.svg";
import lock from "../../assets/images/icon/lock.svg";

// Atoms
import { userDataState } from "../../atoms/user";

const Settings = () => {
  const dataUser = useRecoilState(userDataState)
  console.log("dataUser", dataUser)

  const [firstname, setFirstname] = useState(dataUser[0].firstname);
  const [lastname, setLastname] = useState(dataUser[0].lastname);
  const [email, setEmail] = useState(dataUser[0].email);
  const [job, setJob] = useState(dataUser[0].job);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateData = () => {
    console.log("update data");
    // fetch update user

    if(firstname) console.log("e")
  }

  return (
    <div className={styles.__settings}>
      <h1>Settings</h1>
      <Input
          icon={avatar}
          type={"text"}
          placeholder={"Prénom"}
          value={firstname}
          onChange={(e: any) => setFirstname(e.currentTarget.value)}
        />
        <Input
          icon={avatar}
          type={"text"}
          placeholder={"Nom"}
          value={lastname}
          onChange={(e: any) => setLastname(e.currentTarget.value)}
        />
        <Input
          icon={envelope}
          type={"email"}
          placeholder={"Email"}
          value={email}
          onChange={(e: any) => setEmail(e.currentTarget.value)}
        />
        <Input
          icon={rocket}
          type={"text"}
          placeholder={"Métier"}
          value={job}
          onChange={(e: any) => setJob(e.currentTarget.value)}
        />
        <Input onClick={() => updateData()} type={"submit"} value={"Sauvegarder"} />
        <br />
        <section className={styles.__danger_zone}>
          <hr />
          <h2>Danger Zone</h2>

          <h3>Changement de mot de passe :</h3>
        <Input
          icon={lock}
          type={"text"}
          placeholder={"Mot de passe"}
          value={password}
          onChange={(e: any) => setPassword(e.currentTarget.value)}
        />
        <Input
          icon={lock}
          type={"text"}
          placeholder={"Confirmation du mot de passe"}
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.currentTarget.value)}
        />
        <Input onClick={() => updateData()} type={"submit"} value={"Sauvegarder"} />
        </section>
    </div>
  );

}

export default Settings;
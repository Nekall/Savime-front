import { useState } from "react";

// Components
import Input from "../Input";

// Styles
import styles from "./styles.module.scss";

const Settings = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className={styles.__settings}>
      <h1>Settings</h1>
      <Input
          type={"text"}
          placeholder={"Prénom"}
          value={firstname}
          onChange={(e: any) => setFirstname(e.currentTarget.value)}
        />
        <Input
          type={"text"}
          placeholder={"Nom"}
          value={lastname}
          onChange={(e: any) => setLastname(e.currentTarget.value)}
        />
        <Input
          type={"email"}
          placeholder={"Email"}
          value={email}
          onChange={(e: any) => setEmail(e.currentTarget.value)}
        />
    </div>
  );

}

export default Settings;
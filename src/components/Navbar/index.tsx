import { useState } from "react";

// Styles
import styles from "./styles.module.scss";

// Assets
import logo from "../../assets/images/logo/logo-full-transparent.png";
import gear from "../../assets/images/icon/gear.svg";
import chat from "../../assets/images/icon/chat.svg";
import exit from "../../assets/images/icon/exit.svg";
import envelopeClosed from "../../assets/images/icon/envelope-closed.svg";
import envelopeOpen from "../../assets/images/icon/envelope-open.svg";

const Navbar = () => {
    const [envelopeState, setEnvelopeState] = useState(envelopeClosed);

    return(
        <div className={styles.__navbar}>
            <img className={styles.__logo} src={logo} alt="logo " />
            <div className={styles.__menu}>
                <a href="#">Lorem ipsum</a>
                <a href="#">Dolor sit</a>
                <a href="#">Sit dolores</a>
                <a href="#">Adipisicing amet</a>
                <a href="#">Dignissimos</a>
            </div>
            <div className={styles.__shortcut}>
                <button className={styles.__chat} onClick={()=>{console.log("Chat")}}><img src={chat} alt="chat" /></button>
                <button className={styles.__envelope} onClick={() => setEnvelopeState(envelopeOpen)}><img src={envelopeState} alt="envelope" /></button>
                <button className={styles.__gear} onClick={()=>{console.log("Settings")}}><img src={gear} alt="gear" /></button>
            </div>
            <div className={styles.__disconnect}>
                <button onClick={()=>{console.log("Logout")}}>Déconnexion <img src={exit} alt="logout" /></button>
            </div>
        </div>
    )
}

export default Navbar;
// Assets
import logo from "../../assets/images/logo/Logo-v1.png"

// Styles
import styles from "./styles.module.scss"

const Loading = () => {
    return(
        <div className={styles.__loading}>
            <img className={styles.__animation} src={logo} alt="Logo de chargement" />
        </div>
    )
}

export default Loading;
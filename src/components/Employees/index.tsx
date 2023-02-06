import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

// Styles
import styles from "./styles.module.scss";

// Atoms
import { userDataState } from "../../atoms/user";

// Assets
import check from "../../assets/images/icon/check.svg";
import cross from "../../assets/images/icon/cross.svg";

const Employees = () => {
  const token = useRecoilValue(userDataState).token;
  const [employees, setEmployees] = useState<Array<any>>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/employees`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setEmployees(data.data);
        } else {
          console.error(data);
          toast.error(
            "Une erreur est survenue lors de la récupération des employé·es."
          );
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  }, [refresh, token]);

  const updateVerification = (employeeId: number) => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/employees/verified/${employeeId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRefresh(!refresh);
        } else {
          console.error(data);
          toast.error(
            "Une erreur est survenue lors de la mise à jour de la vérification de l'employé."
          );
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  };

  return (
    <>
      <h2>Employé·es</h2>
      <table className={styles.__employees}>
        <tbody>
          {employees.map(
            ({
              firstname,
              lastname,
              email,
              job,
              employee_id,
              verified,
            }: any) => {
              return (
                <tr key={uuidv4()}>
                  <td className={styles.__disable_on_mobile}>{firstname}</td>
                  <td className={styles.__disable_on_mobile}>{lastname}</td>
                  <td>{email}</td>
                  <td className={styles.__disable_on_mobile}>{job}</td>
                  <td className={styles.__btn_verif}>
                    <button
                      className={styles.__btn}
                      onClick={() => updateVerification(employee_id)}
                    >
                      <img
                        className={
                          verified ? styles.__green_bg : styles.__red_bg
                        }
                        src={verified ? check : cross}
                        alt={verified ? "check" : "cross"}
                      />
                    </button>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </>
  );
};

export default Employees;

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

// Styles
import styles from "./styles.module.scss";

// Assets
import check from "../../assets/images/icon/check.svg";
import cross from "../../assets/images/icon/cross.svg";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/employees`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setEmployees(data.data);
        } else {
          toast.error(
            "Une erreur est survenue lors de la récupération des employé·es.",
            {
              position: "bottom-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            }
          );
        }
      })
      .catch((error) => {
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
  }, [refresh]);

  const updateVerification = (employeeId: number) => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/employees/verified/${employeeId}`,
      {
        method: "PATCH",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRefresh(!refresh);
        } else {
          toast.error(
            "Une erreur est survenue lors de la mise à jour de la vérification de l'employé.",
            {
              position: "bottom-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            }
          );
        }
      })
      .catch((error) => {
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
                  <td>{firstname}</td>
                  <td>{lastname}</td>
                  <td>{email}</td>
                  <td>{job}</td>
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

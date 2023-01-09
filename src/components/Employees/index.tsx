import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Styles
import styles from "./styles.module.scss";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/employees`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setEmployees(data.data);
        }
      });
  }, [refresh]);

  const updateVerification = (employeeId: number) => {
    console.log("updateVerification", employeeId);
    setRefresh(!refresh);
  };

  return (
    <table className={styles.__employees}>
      <tbody>
        {employees.map(
          ({ firstname, lastname, email, job, employee_id, verified }: any) => {
            return (
              <tr key={uuidv4()}>
                <td>{firstname}</td>
                <td>{lastname}</td>
                <td>{email}</td>
                <td>{job}</td>
                <td>
                  <button onClick={() => updateVerification(employee_id)}>
                    {verified ? "✔" : "✘"}
                  </button>
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
};

export default Employees;

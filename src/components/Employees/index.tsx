import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Styles
import styles from "./styles.module.scss";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/employees`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setEmployees(data.data);
        }
      });
  }, []);

  return (
    <table className={styles.__employees}>
      <tbody>
        {employees.map((employee: any) => {
          return (
            <tr key={uuidv4()}>
              <td>{employee.firstname}</td>
              <td>{employee.lastname}</td>
              <td>{employee.email}</td>
              <td>{employee.job}</td>
              <td>{employee.verified ? "✔" : "✘"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Employees;

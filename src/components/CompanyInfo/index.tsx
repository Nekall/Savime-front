import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Components
import Input from "../../components/Input";

// Styles
import styles from "./styles.module.scss";

interface CompanyInfoProps {
  editMode?: boolean;
}

const CompanyInfo = ({ editMode }: CompanyInfoProps) => {
  const [teamInfo, setTeamInfo] = useState<any>([]);
  const [compagnyInfo, setCompagnyInfo] = useState<any>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/managers`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTeamInfo(data.data);
        }
      });

    fetch(`${process.env.REACT_APP_BACKEND_URL}/company-informations`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCompagnyInfo(data.data);
        }
      });
  }, []);

  const updateCompanyInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/company-informations`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(compagnyInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
        }
      });
  };

  return editMode ? (
    <>
      <div className={styles.__company_info}>
        <h2>Informations générales de l'entreprise</h2>
        <form onSubmit={(e) => updateCompanyInfo(e)}>
          {compagnyInfo.map(({ name, value }: any) => {
            return (
              <div className={styles.__inputs} key={name}>
                <div className={styles.__label}>{name} :</div>
                <Input
                  required
                  type="text"
                  value={value}
                  onChange={(e: { target: { value: any } }) => {
                    setCompagnyInfo(
                      compagnyInfo.map((item: { name: any; value: any }) => {
                        if (item.name === name) {
                          item.value = e.target.value;
                        }
                        return item;
                      })
                    );
                  }}
                />
              </div>
            );
          })}
          <Input type="submit" value="Sauvegarder" />
        </form>
        <br />
        <h3>Equipe RH</h3>
        {teamInfo.map(({ firstname, lastname, email, phone, service }: any) => {
          return (
            <div key={uuidv4()}>
              <div>
                <p>{firstname}</p>
                <p>{lastname}</p>
                <p>{email}</p>
                <p>{phone}</p>
                <p>{service}</p>
              </div>
              <br />
            </div>
          );
        })}
      </div>
    </>
  ) : (
    <div className={styles.__company_info}>
      <h2>Informations générales de l'entreprise</h2>
      <table>
        <tbody>
          {compagnyInfo.map(({ name, value }: any) => {
            return (
              <tr key={uuidv4()}>
                <td>{name}</td>
                <td>{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <h3>Equipe RH</h3>
      <div className={styles.__managers}>
        {teamInfo.map(({ firstname, lastname, email, phone, service }: any) => {
          return (
            <div className={styles.__card} key={uuidv4()}>
              <p>{firstname}</p>
              <p>{lastname}</p>
              <p>{email}</p>
              <p>{phone}</p>
              <p>{service}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyInfo;

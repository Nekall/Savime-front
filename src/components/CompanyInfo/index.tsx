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

  return editMode ? (
    <>
      <div className={styles.__company_info}>
        <h2>Informations générales de l'entreprise</h2>
        {compagnyInfo.map(({ name, value }: any) => {
          return (
            <div key={name}>
              <p>{name} :</p>
              <Input
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

        <br />
        {teamInfo.map(({ firstname, lastname, email, phone, service }: any) => {
          return (
            <div key={uuidv4()}>
              <h3>Equipe RH</h3>
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
        <thead>
          <tr>
            <th colSpan={2}>Informations générales</th>
          </tr>
        </thead>
        <tbody>
          {compagnyInfo.map(({ name, value }: any) => {
            return (
              <tr key={uuidv4()}>
                <td>{name}</td>
                <td> : </td>
                <td>{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      {teamInfo.map(({ firstname, lastname, email, phone, service }: any) => {
        return (
          <div key={uuidv4()}>
            <h3>Equipe RH</h3>
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
  );
};

export default CompanyInfo;

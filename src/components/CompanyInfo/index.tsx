import React from "react";
import { v4 as uuidv4 } from "uuid";

// Styles
import styles from "./styles.module.scss";

const CompanyInfo = () => {
  const compagny = [
    { name: "Nom de l'entreprise", value: "value" },
    { name: "Adresse de l'entreprise", value: "value" },
    { name: "Numéro de téléphone", value: "value" },
    { name: "Email de l'entreprise", value: "value" },
    { name: "Siret de l'entreprise", value: "value" },
    { name: "APE de l'entreprise", value: "value" },
    { name: "Capital de l'entreprise", value: "value" },
    { name: "RC de l'entreprise", value: "value" },
    { name: "RM de l'entreprise", value: "value" },
  ];

  const teamInfo = [
    {
      firstname: "Prénom1",
      lastname: "Nom",
      email: "Email",
      phone: "Téléphone",
      service: "Nom du service",
    },
    {
      firstname: "Prénom2",
      lastname: "Nom",
      email: "Email",
      phone: "Téléphone",
      service: "Nom du service",
    },
    {
      firstname: "Prénom3",
      lastname: "Nom",
      email: "Email",
      phone: "Téléphone",
      service: "Nom du service",
    },
  ];
  return (
    <div className={styles.__company_info}>
      <h2>Informations générales de l'entreprise</h2>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Informations générales</th>
          </tr>
        </thead>
        <tbody>
          {compagny.map((info: any) => {
            return (
              <tr key={uuidv4()}>
                <td>{info.name}</td>
                <td>{info.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      {teamInfo.map((member: any) => {
        return (
          <div key={uuidv4()}>
            <h3>Equipe RH</h3>
            <div>
              <p>{member.firstname}</p>
              <p>{member.lastname}</p>
              <p>{member.email}</p>
              <p>{member.phone}</p>
              <p>{member.service}</p>
            </div>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default CompanyInfo;

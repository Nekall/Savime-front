import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

// Atoms
import { userDataState } from "../../atoms/user";

// Styles
import styles from "./styles.module.scss";

const Documents = () => {
  const userData = useRecoilValue(userDataState);
  const { id } = userData;
  const [documents, setDocuments] = useState([]);
  const [attestation, setAttestation] = useState<any>(undefined);
  const [contract, setContract] = useState(undefined);
  const [payslip, setPayslip] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/documents/employee/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setDocuments(data.data);

          setAttestation(
            data.data.find(
              (document: { type: string }) => document.type === "attestation"
            )
          );

          setContract(
            data.data.find(
              (document: { type: string }) => document.type === "contract"
            )
          );

          setPayslip(
            data.data.filter(
              (document: { type: string }) => document.type === "payslip"
            )
          );
        }
      });
  }, [id]);

  return (
    <div className={styles.__documents}>
      <h2>Attestation de travail</h2>
      <div>
        {attestation && <button>Actualisation*</button>}
        <button>Télécharger</button>
        {attestation && <p>
          *actualisation de la date de l'attestation. (Dernière actualisation :{" "}
          {(new Date(attestation.createdAt)).toLocaleDateString('fr-FR')})
        </p>}
      </div>
      <h2>Contrat de travail</h2>
      {contract ? (
        <button>Télécharger</button>
      ) : (
        <p>
          Votre contrat de travail n'est pas disponible au téléchargement,
          veuillez contacter l'équipe RH.
        </p>
      )}
      <br />
      <h2>Bulletins de salaires :</h2>
      <table>
        <tbody>
          {payslip?.length > 0 ? (
            payslip.map(({ name, document }: any) => (
              <tr key={uuidv4()}>
                <td>{name}</td>
                <td>
                  <div>
                    <button>Télécharger</button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Aucun bulletin de salaire disponible</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Documents;

import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

// Components
import Modal from "../Modal";

// Atoms
import { userDataState } from "../../atoms/user";

// Assets
import cross from "../../assets/images/icon/cross.svg";

// Styles
import styles from "./styles.module.scss";

interface DocumentsProps {
  editMode?: boolean;
}

const Documents = ({ editMode }: DocumentsProps) => {
  const userData = useRecoilValue(userDataState);
  const { role, id } = userData;
  const [documents, setDocuments] = useState([]);
  const [attestation, setAttestation] = useState<any>(undefined);
  const [contract, setContract] = useState<any>(undefined);
  const [payslip, setPayslip] = useState<any>([]);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/documents${
        role === "Manager" ? "" : `/employee/${id}`
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setDocuments(data.data);
          console.log(data);
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
  }, [id, role, refresh]);

  const updateAttestation = () => {
    console.log("Update Attestation");
  };

  const downloadDocument = (document_id: number) => {
    console.log("download", document_id);
  };

  const deleteDocument = (document_id: number) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/documents/${document_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRefresh(!refresh);
        }
      });
  };

  return editMode ? (
    <div className={styles.__documents}>
      <p>Edit mode</p>
      <h2>Documents</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Nom</th>
            <th>Employé</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents &&
            documents.map(
              ({ document_id, type, name, document, employee }: any) => (
                <tr key={uuidv4()}>
                  <td>
                    {type === "payslip"
                      ? "Bulletin"
                      : type === "attestation"
                      ? "Attestation"
                      : "Contrat"}
                  </td>
                  <td>{name}</td>
                  <td>{document_id}</td>
                  <td>
                    {employee && `${employee.firstname} ${employee.lastname}`}
                  </td>
                  <td>{employee && employee.email}</td>
                  <td>
                    <button
                      onClick={() => {
                        setModalUpdate(true);
                      }}
                    >
                      Mettre à jour
                    </button>
                    <button onClick={() => downloadDocument(document_id)}>
                      Télécharger
                    </button>
                    <button
                      title="Double clic pour supprimer 💡"
                      onDoubleClick={() => deleteDocument(document_id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
      {modalUpdate && (
        <Modal>
          <div className={styles.__update_document}>
            <button
              className={styles.__close}
              onClick={() => setModalUpdate(false)}
            >
              <img src={cross} alt="Close" />
            </button>
            <h2>Mettre à jour le document</h2>
            <form>
              <label htmlFor="document">Document</label>
              <input type="file" name="document" id="document" />
              <button type="submit">Mettre à jour</button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  ) : (
    <div className={styles.__documents}>
      <h2>Attestation de travail</h2>
      <div>
        {attestation && (
          <button onClick={() => updateAttestation()}>Actualisation*</button>
        )}
        <button onClick={() => downloadDocument(attestation.document_id)}>
          Télécharger
        </button>
        {attestation && (
          <p>
            *actualisation de la date de l'attestation. (Dernière actualisation
            : {new Date(attestation.createdAt).toLocaleDateString("fr-FR")})
          </p>
        )}
      </div>
      <h2>Contrat de travail</h2>
      {contract ? (
        <button onClick={() => downloadDocument(contract.document_id)}>
          Télécharger
        </button>
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
                  <button>Télécharger</button>
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

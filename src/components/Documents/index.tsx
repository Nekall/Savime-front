import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

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
  const { role, id, token } = userData;
  const [documents, setDocuments] = useState([]);
  const [docId, setDocId] = useState(0);
  const [newDocument, setNewDocument] = useState<any>(null);
  const [attestation, setAttestation] = useState<any>(undefined);
  const [contract, setContract] = useState<any>(undefined);
  const [payslip, setPayslip] = useState<any>([]);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [modalPreview, setModalPreview] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/documents${
        role === "Manager" ? "" : `/employee/${id}`
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
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
        } else {
          console.error(data);
          toast.error("Impossible de récupérer les documents.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  }, [id, role, refresh, token]);

  const updateAttestation = () => {
    // simply endpoint to update attestation (date)
    console.log("Update Attestation");
  };

  const updateDocument = (e: any, document_id: number) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(newDocument);
    reader.onload = async function () {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/documents/${document_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          document: reader.result,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setRefresh(!refresh);
            setModalUpdate(false);
            toast.success("Document mis à jour.");
          } else {
            console.error(data);
            toast.error("Impossible de mettre à jour le document.");
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Une erreur est survenue. Contactez support@savime.tech");
        });
    };
  };

  const deleteDocument = (document_id: number) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/documents/${document_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRefresh(!refresh);
          toast.success("Document supprimé.");
        } else {
          console.error(data);
          toast.error("Impossible de supprimer le document.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  };

  return (
    <>
      {modalPreview && (
        <Modal>
          <div className={styles.__preview_document}>
            <button
              className={styles.__close}
              onClick={() => setModalPreview(false)}
            >
              <img src={cross} alt="Close" />
            </button>
            <h2>Aperçu</h2>
            <embed type="application/pdf" src={preview} />
          </div>
        </Modal>
      )}
      {editMode ? (
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
                      <td>
                        {employee &&
                          `${employee.firstname} ${employee.lastname}`}
                      </td>
                      <td>{employee && employee.email}</td>
                      <td>
                        <button
                          onClick={() => {
                            setDocId(document_id);
                            setModalUpdate(true);
                          }}
                        >
                          Mettre à jour
                        </button>
                        <button
                          title="Double clic pour supprimer 💡"
                          onDoubleClick={() => deleteDocument(document_id)}
                        >
                          Supprimer
                        </button>
                        <button
                          onClick={() => {
                            setPreview(document);
                            setDocId(document_id);
                            setModalPreview(true);
                          }}
                        >
                          Aperçu | Télécharger
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
                <form onSubmit={(e) => updateDocument(e, docId)}>
                  <label htmlFor="document">Document</label>
                  <input
                    onChange={(e: any) => setNewDocument(e.target.files[0])}
                    type="file"
                    name="document"
                    id="document"
                    accept="application/pdf"
                  />
                  <input type="submit" value="Mettre à jour" />
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
              <button onClick={() => updateAttestation()}>
                Actualisation*
              </button>
            )}
            {attestation && (
              <p>
                *actualisation de la date de l'attestation. (Dernière
                actualisation :{" "}
                {new Date(attestation.createdAt).toLocaleDateString("fr-FR")})
              </p>
            )}
          </div>
          <h2>Contrat de travail</h2>
          {contract ? (
            <button
              onClick={() => {
                setPreview(attestation.document);
                setDocId(attestation.document_id);
                setModalPreview(true);
              }}
            >
              Aperçu | Télécharger
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
                payslip.map(({ document_id, name, document }: any) => (
                  <tr key={uuidv4()}>
                    <td>{name}</td>
                    <td>
                      <button
                        onClick={() => {
                          setPreview(document);
                          setDocId(document_id);
                          setModalPreview(true);
                        }}
                      >
                        Aperçu | Télécharger
                      </button>
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
      )}
    </>
  );
};

export default Documents;

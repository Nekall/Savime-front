import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

// Components
import Modal from "../Modal";
import Input from "../Input";

// Atoms
import { userDataState } from "../../atoms/user";

// Assets
import plus from "../../assets/images/icon/plus.svg";
import virustotal from "../../assets/images/icon/virustotal.svg";

import download from "../../assets/images/icon/download.svg";
import update from "../../assets/images/icon/update.svg";
import trash from "../../assets/images/icon/trash.svg";

// Styles
import styles from "./styles.module.scss";

interface DocumentsProps {
  editMode?: boolean;
}

const Documents = ({ editMode }: DocumentsProps) => {
  const userData = useRecoilValue(userDataState);
  const { role, id, token } = userData;
  const [documents, setDocuments] = useState<Array<any>>([]);
  const [docId, setDocId] = useState(0);
  const [attestation, setAttestation] = useState<undefined | object | any>(undefined);
  const [contract, setContract] = useState<any>(undefined);
  const [payslip, setPayslip] = useState<Array<any>>([]);
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [modalPreview, setModalPreview] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [modalAddDoc, setModalAddDoc] = useState(false);
  const [newDocType, setNewDocType] = useState<string>("");
  const [newDocName, setNewDocName] = useState<string>("");
  const [newDocFile, setNewDocFile] = useState<null | Blob | any>(null);
  const [employees, setEmployees] = useState<Array<any>>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any>("");

  const [onLoading, setOnLoading] = useState(false);

  useEffect(() => {
    if (!modalAddDoc) {
      setNewDocType("");
      setNewDocName("");
      setNewDocFile(null);
      setSelectedEmployee(null);
    }

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

    if (role === "Manager") {
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
            setEmployees(
              data.data.filter((employee: any) => employee.verified)
            );
          } else {
            console.error(data);
            toast.error("Impossible de récupérer les employés.");
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Une erreur est survenue. Contactez");
        });
    }
  }, [id, role, refresh, token, modalAddDoc]);

  const updateDocument = (e: any, document_id: number) => {
    e.preventDefault();

    const patchDocument = async (doc: any) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/documents/${document_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newDocName,
          document: doc,
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

    if (newDocFile) {
      const reader = new FileReader();
      reader.readAsDataURL(newDocFile);
      reader.onload = async function () {
        if (reader.onerror) {
          console.error(reader.error);
          toast.error("Une erreur est survenue lors de la lecture du fichier.");
          return;
        }

        if (
          reader.result &&
          typeof reader.result === "string" &&
          reader.result.includes("data:application/pdf;base64,")
        ) {
          await patchDocument(reader.result);
        } else {
          setNewDocFile(null);
          toast.error("Le fichier doit être au format PDF.");
          return;
        }
      };
    } else {
      patchDocument(null);
    }
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

  const addDocument = (e: any) => {
    e.preventDefault();
    setOnLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(newDocFile);
    reader.onload = async function () {
      if (reader.onerror) {
        console.error(reader.error);
        toast.error("Une erreur est survenue lors de la lecture du fichier.");
        return;
      }

      if (
        reader.result &&
        typeof reader.result === "string" &&
        reader.result.includes("data:application/pdf;base64,")
      ) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/documents`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: newDocName,
            document: reader.result,
            type: newDocType,
            employeeId: selectedEmployee,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              setRefresh(!refresh);
              setModalAddDoc(false);
              toast.success("Document ajouté.");
            } else {
              console.error(data);
              toast.error(
                data.message
                  ? data.message
                  : "Impossible d'ajouter le document."
              );
            }
            setOnLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setOnLoading(false);
            toast.error(
              "Une erreur est survenue. Contactez support@savime.tech"
            );
          });
      } else {
        setNewDocFile(null);
        toast.error("Le fichier doit être au format PDF.");
        return;
      }
    };
  };

  return (
    <>
      {modalPreview && (
        <Modal setModalOpen={setModalPreview}>
          <div className={styles.__preview_document}>
            <h2>Aperçu</h2>
            <embed type="application/pdf" src={preview} />
          </div>
        </Modal>
      )}
      {modalAddDoc && (
        <Modal setModalOpen={setModalAddDoc}>
          {!onLoading ? (
            <div className={styles.__new_document}>
              <h3>Ajouter un document</h3>
              <form onSubmit={(e) => addDocument(e)}>
                <label>Nom</label>
                <Input
                  required
                  type={"text"}
                  value={newDocName}
                  onChange={(e: any) => setNewDocName(e.currentTarget.value)}
                />
                <select
                  value={newDocType}
                  onChange={(e: any) => setNewDocType(e.currentTarget.value)}
                  required
                >
                  <option defaultChecked disabled hidden value="">
                    Type du document
                  </option>
                  <option value="attestation">Attestation</option>
                  <option value="contract">Contrat</option>
                  <option value="payslip">Bulletin de paie</option>
                </select>
                <select
                  required
                  value={selectedEmployee}
                  onChange={(e: any) => setSelectedEmployee(e.target.value)}
                >
                  <option defaultChecked disabled hidden value="">
                    Employé
                  </option>
                  {employees &&
                    employees.map((employee: any) => (
                      <option
                        value={employee.employee_id}
                      >{`${employee.firstname} ${employee.lastname} (${employee.employee_id})`}</option>
                    ))}
                </select>
                <Input
                  type={"file"}
                  onChange={(e: any) => setNewDocFile(e.target.files[0])}
                  accept="application/pdf"
                  required
                />
                <Input type="submit" value="Ajouter" />
              </form>
            </div>
          ) : (
            <div className={styles.__new_document}>
              <h5>Un scan antivirus est en cours, veuillez patienter...</h5>
              <div className={styles.__animated_dots}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p className={styles.__loading}>
                par{" "}
                <a
                  href="https://www.virustotal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VirusTotal
                </a>
                <img src={virustotal} alt="virustotal logo" />
              </p>
            </div>
          )}
        </Modal>
      )}
      {editMode ? (
        <div className={styles.__documents}>
          <button
            className={styles.__btn_add_doc}
            onClick={() => {
              setNewDocFile(null);
              setNewDocName("");
              setNewDocType("");
              setSelectedEmployee("");
              setModalAddDoc(!modalAddDoc);
            }}
          >
            <img src={plus} alt="plus" />
          </button>
          <h2>Documents</h2>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th className={styles.__disable_on_mobile}>Nom</th>
                <th>Employé·e</th>
                <th className={styles.__disable_on_mobile}>Email</th>
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
                      <td className={styles.__disable_on_mobile}>{name}</td>
                      <td>
                        {employee &&
                          `${employee.firstname} ${employee.lastname}`}
                      </td>
                      <td className={styles.__disable_on_mobile}>
                        {employee && employee.email}
                      </td>
                      <td>
                        <button
                          title="Mettre à jour le document"
                          onClick={() => {
                            setDocId(document_id);
                            setNewDocName(name);
                            setModalUpdate(true);
                            setNewDocFile(null);
                          }}
                        >
                          <img src={update} alt="Mise à jour" />
                        </button>
                        <button
                          title="Double clic pour supprimer 💡"
                          onDoubleClick={() => deleteDocument(document_id)}
                        >
                          <img src={trash} alt="Supprimer" />
                        </button>
                        <button
                          title="Télécharger le document"
                          onClick={() => {
                            setPreview(document);
                            setDocId(document_id);
                            setModalPreview(true);
                          }}
                        >
                          <img src={download} alt="Téléchargement" />
                        </button>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
          {modalUpdate && (
            <Modal setModalOpen={setModalUpdate}>
              <div className={styles.__update_document}>
                <h2>Mettre à jour le document</h2>
                <form onSubmit={(e) => updateDocument(e, docId)}>
                  <label>Nom du document</label>
                  <Input
                    required
                    type="text"
                    value={newDocName}
                    onChange={(e: any) => setNewDocName(e.target.value)}
                  />
                  <Input
                    onChange={(e: any) => setNewDocFile(e.target.files[0])}
                    type="file"
                    accept="application/pdf"
                  />
                  <Input type="submit" value="Mettre à jour" />
                </form>
              </div>
            </Modal>
          )}
        </div>
      ) : (
        <div className={styles.__documents}>
          <h2>Attestation de travail</h2>
          <div>
            {attestation ? (
              <button
                className={styles.__btn_employee}
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
                Votre attestation de travail n'est pas disponible au
                téléchargement, veuillez contacter l'équipe RH.
              </p>
            )}
            {attestation && (
              <p>
                Dernière actualisation :{" "}
                {new Date(attestation.createdAt).toLocaleDateString("fr-FR")}
              </p>
            )}
          </div>
          <h2>Contrat de travail</h2>
          {contract ? (
            <button
              className={styles.__btn_employee}
              onClick={() => {
                setPreview(contract.document);
                setDocId(contract.document_id);
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
          <h2>Bulletins de salaires :</h2>
          <table>
            <tbody>
              {payslip?.length > 0 ? (
                payslip.map(({ document_id, name, document }: any) => (
                  <tr key={uuidv4()}>
                    <td>{name}</td>
                    <td>
                      <button
                        className={styles.__btn_employee}
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

import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

// Assets
import trash from "../../assets/images/icon/trash.svg";
import pen from "../../assets/images/icon/pen.svg";

// Atoms
import { userDataState } from "../../atoms/user";

// Styles
import styles from "./styles.module.scss";

interface AdminTableProps {
  setModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
  section: string;
  data: any;
}

const AdminTable = ({
  setModalEdit,
  setId,
  setRefresh,
  refresh,
  section,
  data,
}: AdminTableProps) => {
  const token = useRecoilValue(userDataState).token;
  const deleteElement = (id: number) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/${section}/${id}`, {
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
          toast.success("Element supprimé avec succès.");
        } else {
          console.error(data);
          toast.error("Impossible de supprimer l'élément.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  };

  return (
    <table className={styles.__table}>
      <thead>
        <tr>
          {Object.keys(data.data[0]).map((key: any, index: number) => {
            if (
              key !== "profilePicture" &&
              key !== "updatedAt" &&
              key !== "createdAt" &&
              key !== "employee" &&
              key !== "document" &&
              key !== "verified"
            ) {
              return (
                <th key={uuidv4()}>
                  {key === "employee_id" && index > 0
                    ? "EMPLOYEE"
                    : index === 0
                    ? "ID"
                    : key.toUpperCase()}
                </th>
              );
            } else {
              return null;
            }
          })}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.data.map((item: any) => {
          return (
            <tr key={uuidv4()}>
              {Object.keys(item).map((key: any) => {
                if (
                  key !== "profilePicture" &&
                  key !== "updatedAt" &&
                  key !== "createdAt" &&
                  key !== "employee" &&
                  key !== "document" &&
                  key !== "verified"
                ) {
                  return (
                    <td key={uuidv4()}>
                      {key === "employee_id" && item.employee
                        ? `${item.employee.firstname} ${item.employee.lastname} (id: ${item.employee.employee_id})`
                        : item[key]}
                    </td>
                  );
                } else {
                  return null;
                }
              })}
              <td className={styles.__btn_edit}>
                <button
                  title="Double clic pour supprimer 💡"
                  className={styles.__btn}
                  onDoubleClick={() =>
                    deleteElement(item[Object.keys(item)[0]])
                  }
                >
                  <img src={trash} alt="Supprimer" />
                </button>
                <button
                  onClick={() => {
                    setModalEdit(true);
                    setId(item[Object.keys(item)[0]]);
                  }}
                  className={styles.__btn}
                >
                  <img src={pen} alt="Editer" />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AdminTable;

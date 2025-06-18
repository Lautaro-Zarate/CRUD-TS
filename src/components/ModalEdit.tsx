import type { Dispatch, SetStateAction } from "react";

interface ModalProps {
    editId: number | null;
    editName: string | null;
    editGender: string | null;
    setEditName: Dispatch<SetStateAction<string | null>>;
    setEditGender: Dispatch<SetStateAction<string | null>>;
    setModal: Dispatch<SetStateAction<boolean>>;
    onAccept: () => void; // 👉 ejecuta dispatch desde el padre
}

const Modal = ({
    editName,
    editGender,
    setEditName,
    setEditGender,
    setModal,
    onAccept,
}: ModalProps) => {
return (
    <div className="modal-container">
    <div className="modal-content">
        <h2>Editar película</h2>
        <input
        type="text"
        value={editName ?? ""}
        onChange={(e) => setEditName(e.target.value)}
        placeholder="Nombre"
        className="modal-input"
        />
        <input
        type="text"
        value={editGender ?? ""}
        onChange={(e) => setEditGender(e.target.value)}
        placeholder="Género"
        className="modal-input"
        />
        <div className="modal-btns">
            <button
            onClick={() => setModal(false)}
            className="btn-cancel"
            >
            Cancelar
            </button>
            <button
            onClick={() => {
            onAccept();
            setModal(false);
            }}
            className="btn-accept"
            >
            Aceptar
            </button>
        </div>
    </div>
    </div>
);
};

export default Modal;



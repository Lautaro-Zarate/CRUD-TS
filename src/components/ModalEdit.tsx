import type { Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";


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
    <AnimatePresence>
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-container">
        <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="modal-content">
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
        </motion.div>
        </motion.div>
    </AnimatePresence>
);
};

export default Modal;



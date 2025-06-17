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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">Editar película</h2>
        <input
        type="text"
        value={editName ?? ""}
        onChange={(e) => setEditName(e.target.value)}
        placeholder="Nombre"
        className="w-full border px-3 py-2 rounded mb-3"
        />
        <input
        type="text"
        value={editGender ?? ""}
        onChange={(e) => setEditGender(e.target.value)}
        placeholder="Género"
        className="w-full border px-3 py-2 rounded mb-3"
        />

        <div className="flex justify-end gap-3 mt-4">
            <button
            onClick={() => setModal(false)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
            Cancelar
            </button>
            <button
            onClick={() => {
            onAccept();
            setModal(false);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
            >
            Aceptar
            </button>
        </div>
    </div>
    </div>
);
};

export default Modal;



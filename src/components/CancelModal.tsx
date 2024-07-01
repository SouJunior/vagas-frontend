interface CancelModalProps {
    handleConfirmCancel: () => void;
    setCancelModal: (value: boolean) => void;
};

function CancelModal({
    handleConfirmCancel,
    setCancelModal,
}: CancelModalProps) {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg text-center">
                <p>
                    Tem certeza que deseja cancelar a publicação desta vaga?{' '}
                    <br />
                    Todos os dados informados serão perdidos.
                </p>
                <div className="flex justify-center mt-5 gap-5">
                    <button
                        className=" text-blue px-4 py-2 rounded border-blue border"
                        onClick={() => setCancelModal(false)}
                    >
                        Não
                    </button>
                    <button
                        className="bg-blue text-white px-4 py-2 rounded mr-2"
                        onClick={handleConfirmCancel}
                    >
                        Sim
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CancelModal;

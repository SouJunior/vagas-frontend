import {
    ModalContent,
    ModalTitle,
    ModalTextConfirmModal,
    CloseModal,
    ModalCloseButton,
} from './styles';
import ModalIcon from '../../../../assets/imgs/mask-group.svg';
import { useNavigate } from 'react-router';
import { MaskBackground } from '../../../LoginCard/PopUpRegisterSuccess/styles';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { useContext, useEffect, useRef } from 'react';

interface ConfirmModalProps {
    setConfirmModal: (value: boolean) => void;
}

const ConfirmModal = ({ setConfirmModal }: ConfirmModalProps) => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleClick = () => {
        setConfirmModal(false);
        auth.user.type === 'USER'
            ? navigate('/candidate-portal')
            : navigate('/company-portal');
        setTimeout(() => window.location.reload(), 0);
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (
                modalRef.current &&
                e.target instanceof Node &&
                !modalRef.current.contains(e.target)
            ) {
                setConfirmModal(false);
                handleClick();
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <MaskBackground>
            <ModalContent ref={modalRef}>
                <CloseModal>
                    <ModalCloseButton
                        /**
                         * @see https://developer.mozilla.org/pt-BR/docs/Web/API/Location/reload
                         */
                        onClick={handleClick}
                    >
                        X
                    </ModalCloseButton>
                </CloseModal>
                <div className="modal--texts">
                    <ModalTitle>Atualizações salvas</ModalTitle>
                    <ModalTextConfirmModal>
                        Suas atualizações foram alteradas com sucesso!
                    </ModalTextConfirmModal>
                    <img src={ModalIcon} alt="Sucesso" />
                </div>
            </ModalContent>
        </MaskBackground>
    );
};

export default ConfirmModal;

import {
    ModalContent,
    ModalTitle,
    CloseModal,
    ModalCloseButton,
} from './styles';
import ModalIcon from '../../../../assets/imgs/mask-group.svg';
import { useNavigate } from 'react-router';
import { MaskBackground } from '../../../LoginCard/PopUpRegisterSuccess/styles';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { useContext, useEffect, useRef } from 'react';

interface ChangePasswordModalProps {
    setChangePasswordModal: (value: boolean) => void;
}

const ChangePasswordModal = ({ setChangePasswordModal }: ChangePasswordModalProps ) => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleClick = () => {
        setChangePasswordModal (false);
        auth.user.type === 'USER' ?
            (navigate('/candidate-portal'))
            :
            (navigate('/company-portal'))
        setTimeout(() => window.location.reload(), 0)
        document.body.style.overflow = 'auto';
    }

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (modalRef.current && e.target instanceof Node && !modalRef.current.contains(e.target)) {
                setChangePasswordModal (false);
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
                        onClick={handleClick}
                    >
                        X
                    </ModalCloseButton>
                </CloseModal>
                <div className="modal--texts">
                    <ModalTitle>Senha atualizada com sucesso</ModalTitle>
                    <img src={ModalIcon} alt="Sucesso" />
                </div>
            </ModalContent>
        </MaskBackground>
    );
};

export default ChangePasswordModal;

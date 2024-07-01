import { useNavigate } from 'react-router';
import { ModalContent, ModalTitle, ModalText, ButtonContent } from './styles';
import { Button } from '../../../Button';
import { MaskBackground } from '../../../LoginCard/PopUpRegisterSuccess/styles';
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { useContext } from 'react';

interface CancelModalProps {
    setCancelModal: (value: boolean) => void;
    open: boolean;
}

function CancelModal({ setCancelModal }: CancelModalProps) {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const handleConfirmButton = async () => {
        auth.user.type === 'USER'
            ? navigate('/candidate-portal')
            : navigate('/company-portal');
        document.body.style.overflow = 'auto';
    };

    return (
        <MaskBackground>
            <ModalContent>
                <ModalTitle>Deseja cancelar?</ModalTitle>
                <ModalText>
                    Tem certeza que deseja cancelar a operação?
                </ModalText>
                <ButtonContent>
                    <Button onClick={handleConfirmButton}>Sim</Button>
                    <Button
                        background="outline"
                        onClick={() => {
                            document.body.style.overflow = 'auto';
                            setCancelModal(false);
                        }}
                    >
                        Não
                    </Button>
                </ButtonContent>
            </ModalContent>
        </MaskBackground>
    );
}

export default CancelModal;

import {
    Main,
    Container,
    Row,
    Position,
    ProfileButton,
} from './styles/CandidatePortalStyles';

import Header from '../components/Portal/Header';
import Search from '../components/Portal/Search';
import CurriculumImage from '../assets/imgs/cv.svg';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth/AuthContext';
import { useContext } from 'react';
import Footer from '../components/Portal/Footer';
import PopUpAntiFraudMessage from '../components/LoginCard/PopUpAntiFraudMessage';

const CandidatePortal = () => {
    const navigate = useNavigate();
    const { popUpAntiFraudOpen } = useContext(AuthContext);
    const auth: any = useContext(AuthContext);
  
    return (
        <Container>
            <Header />
            {popUpAntiFraudOpen && <PopUpAntiFraudMessage />}
            <Main>
                <Search />
                <Row />
                <h1>{auth.user.name}, atualize seu currículo!</h1>
                <ProfileButton onClick={() => navigate('/candidate-settings')}>
                    <div>
                        <img src={CurriculumImage} alt="currículo" />
                    </div>
                    <div>Atualizar meu currículo</div>
                </ProfileButton>
            </Main>
            <Position>
                <Footer />
            </Position>
        </Container>
    );
};

export default CandidatePortal;

import { Container, MenuItems, PopUp, Border } from './styles';
import ProfileIcon from '../../../assets/imgs/profile.svg';
import NewJobIcon from '../../../assets/imgs/new-job.svg';
import ConfigIcon from '../../../assets/imgs/config.svg';
import TermsIcon from '../../../assets/imgs/terms.svg';
import ExitIcon from '../../../assets/imgs/exit.svg';
import PasswordIcon from '../../../assets/imgs/password.svg';
import UpArrowImage from '../../../assets/imgs/arrow-up.svg';
import DownArrowImage from '../../../assets/imgs/arrow-down.svg';
import { AuthContext } from '../../../contexts/Auth/AuthContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const auth: any = useContext(AuthContext);

    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();
    // TODO: Naveção aninhada
    //Aguardando retorno do Backend o type do usuário da rota used-looged
    //rota atualizada
    const handleNavigation = () => {
        if (auth.user.companyName) {
            navigate('/profile-settings');
        } else {
            navigate('/candidate-settings');
        }
    };

    const logout = () => {
        auth.logout();
        navigate('/');
    };

    const handleKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {

        if (ev.key === "Enter") {
            ev.currentTarget.click()
        }
    };

    return (
        <Container>
            <PopUp>
                <MenuItems>
                    {/* <li onClick={handleNavigation}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >

                        <img src={ProfileIcon} alt="perfil" />
                        Meu perfil
                    </li>

                    <Border /> */}

                    {auth.user.type !== 'USER' && (
                        <li
                            onClick={() => navigate('/addjobs')}
                            onKeyDown={handleKeyDown}
                            tabIndex={0}
                            className="jobs"
                        >
                            <img src={NewJobIcon} alt="vagas" />
                            Anunciar vagas
                        </li>
                    )}
                    {/* <Border /> */}
                    <li
                        onClick={() => {
                            setVisible(!visible);
                        }}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >
                        <img src={ConfigIcon} alt="configurações" />
                        <span>Configurações</span>
                        {visible ? (
                            <img src={UpArrowImage} alt="seta" />
                        ) : (
                            <img src={DownArrowImage} alt="seta" />
                        )}
                    </li>
                    {visible && (
                        <>
                            <Border />
                            <div>
                                <li
                                    tabIndex={0}
                                    onKeyDown={handleKeyDown}
                                    onClick={() => navigate('/change-password')}
                                >
                                    <img
                                        src={PasswordIcon}
                                        alt="alterar senha"
                                    />
                                    Alterar senha
                                </li>
                            </div>
                        </>
                    )}
                    {/* <Border />
                    <li
                        tabIndex={0}
                        onKeyDown={handleKeyDown}
                    >
                        <img src={TermsIcon} alt="termos" />
                        Termo de uso e Privacidade
                    </li> */}
                    <Border />
                    <li onClick={logout}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >
                        <img src={ExitIcon} alt="sair" />
                        Sair do Portal de Vagas
                    </li>
                </MenuItems>
            </PopUp>
        </Container>
    );
};

export default Menu;

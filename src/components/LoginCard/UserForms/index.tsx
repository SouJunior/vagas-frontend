import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/Auth/AuthContext';
import { EmailIcon } from '../../EmailIcon';
import { PasswordIcon } from '../../PasswordIcon';
import { PopUpRegisterSucess } from '../PopUpRegisterSuccess';
import PopupHandler from '../PopUpRegisterSuccess/CloseModalEsc';
import {
    schemaUserLoginForm,
    schemaUserRegisterForm,
} from '../../../validations/UserValidations/index';
import {
    MessageError,
    MessageError2,
    Divider,
    Form,
    Title,
    InputContainer,
    IconWrapper,
    Input,
    Label,
    CheckboxInput,
    CheckboxContainer,
    SecondDivider,
    ButtonContainer,
    LoginButton,
    RegisterButton,
    LoginLink,
    RegisterSubmitButton,
    TermsLink,
    Checklist,
    List,
    MessageChecklist,
} from '../styles';
import { Popup } from '../PopUpRegisterSuccess/styles';

export const UserForms = (props: any): JSX.Element => {
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState(false);
    const [otherErrors, setOtherErrors] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const characters = /^(?=.{8,20}$).*$/;
    const letters = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
    const number = /^(?=.*\d).*$/;
    const specialCharacters = /^(?=.*\W).*$/;

    const { errorEmail, isLogin, setIsLogin, isRegistered, setPopUpAntiFraudOpen } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [popup, setPopup] = useState(false);

    const navigate = useNavigate();
    const auth: any = useContext(AuthContext);

    // Recebe o tipo do usuário
    const userType = props.type;

    // Define qual formulário deverá ser validado
    const getFormValidation =
        isLogin === 'login' ? schemaUserLoginForm : schemaUserRegisterForm;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(getFormValidation),
    });

    // Realiza o login e maniopula dados
    async function handleFormOnSubmit() {
        setIsFormSubmitted(true);

        try {
            // Recebe dados do contexto para verificação
            await auth.login(email, password, userType);
            navigate('/candidate-portal');
            setPopUpAntiFraudOpen(true);
        } catch (err: any) {
            if (err.response.status > 400) {
                setError(true);
            } else {
                setOtherErrors(true);
            }

            // TODO: Tratar os erros com as mensagens do backend e exibir em tela
            // TODO: Fazer toastfy funcioinar
            // setHasError(data.message);
            // toast.error('Ops, algo não está certo!', {
            //     position: 'top-right',
            //     theme: 'colored',
            // });
        }
    }

    const handleClearErrorMessage = () => {
        setError(false);
    };

    // =================================================
    // Validação e manipulação do formulário de cadastro
    // =================================================

    // Abre popup quando cadastro concluído com sucesso

    const closePopup = () => {
        setPopup(false);
        navigate('/');
    };

    async function handleRegisterSubmit() {
        await auth.register(
            registerCheck[0],
            registerCheck[1],
            registerCheck[2],
            registerCheck[3],
        );
        try {
            if (isRegistered.status > 400) {
                errorEmail();
            } else {
                setIsLogin('login');
                setPopup(true);
            }
        } catch (error) {}
    }

    // Monitora os input enquanto preechidos
    const registerCheck = watch([
        'registerName',
        'registerEmail',
        'registerPassword',
        'confirmPassword',
    ]);

    return (
        <>
            {isLogin === 'login' ? (
                <Title>Candidato</Title>
            ) : (
                <Title>Cadastro de candidato</Title>
            )}

            <Divider
                style={{ marginBottom: isLogin === 'login' ? '32px' : '20px' }}
            />
            {/* renderiza se existe(true) um formulário do tipo login */}
            {isLogin === 'login' ? (
                <Form
                    id="login-form"
                    onSubmit={handleSubmit(handleFormOnSubmit)}
                >
                    <InputContainer>
                        <div>
                            <Input
                                type="text"
                                {...register('email', {
                                    onChange: (e) => setEmail(e.target.value),
                                })}
                                placeholder="E-mail"
                                aria-label="Email"
                                onClick={handleClearErrorMessage}
                            />
                            <IconWrapper>
                                <EmailIcon />
                            </IconWrapper>
                        </div>
                        <MessageError>
                            {errors.email && <>{errors.email.message}</>}
                        </MessageError>
                    </InputContainer>
                    <InputContainer>
                        <div>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', {
                                    onChange: (e) =>
                                        setPassword(e.target.value),
                                })}
                                placeholder="Senha"
                                aria-label="Senha"
                                onClick={handleClearErrorMessage}
                            />
                            <IconWrapper
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: 'pointer' }}
                            >
                                <PasswordIcon />
                            </IconWrapper>
                        </div>

                        {/* TODO: Mensagem do backend não é mais inserida */}
                        <MessageError>
                            {errors.password && <>{errors.password.message}</>}
                        </MessageError>
                        <MessageError>
                            {error && <>desculpe, algo inesperado aconteceu</>}
                        </MessageError>
                        <MessageError>
                            {otherErrors && <>e-mail ou senha não conferem</>}
                        </MessageError>
                    </InputContainer>
                    <InputContainer>
                        <CheckboxContainer>
                            <Label>
                                {/* TODO: monitorar também o valor deste campo, pois será enviado à API */}
                                <CheckboxInput id="default-checkbox" value="" />
                                Me mantenha conectado
                            </Label>
                            <a href="confirm-email?type=user">
                                Esqueci minha senha
                            </a>
                        </CheckboxContainer>
                    </InputContainer>

                    <SecondDivider />

                    <ButtonContainer>
                        <LoginButton
                            type="submit"
                            id="submit-button"
                            disabled={false}
                            // TODO: Verificar porque disable não funciona
                        >
                            Entrar
                        </LoginButton>

                        <RegisterButton
                            type="button"
                            onClick={() => {
                                setIsLogin('register');
                            }}
                        >
                            Criar conta
                        </RegisterButton>
                    </ButtonContainer>
                </Form>
            ) : (
                // renderiza se isLogin === false
                <Form
                    id="register-form"
                    onSubmit={handleSubmit(handleRegisterSubmit)}
                >
                    <InputContainer>
                        <Input
                            type="text"
                            {...register('registerName')}
                            placeholder="Digite seu nome completo"
                            aria-label="Nome do candidato"
                            maxLength={50}
                        ></Input>
                        <MessageError>
                            {errors.registerName && (
                                <>{errors.registerName.message}</>
                            )}
                        </MessageError>
                    </InputContainer>
                    <InputContainer>
                        <div>
                            <Input
                                type="text"
                                {...register('registerEmail')}
                                placeholder="Digite seu email"
                                aria-label="Email"
                            ></Input>
                            <IconWrapper>
                                <EmailIcon />
                            </IconWrapper>
                        </div>
                        <MessageError>
                            {errors.registerEmail && (
                                <>{errors.registerEmail.message}</>
                            )}
                        </MessageError>
                    </InputContainer>
                    <InputContainer>
                        <div>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                {...register('registerPassword')}
                                placeholder="Senha"
                                aria-label="Senha"
                            />
                            <IconWrapper
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: 'pointer' }}
                            >
                                <PasswordIcon />
                            </IconWrapper>
                        </div>
                        <MessageError>
                            {errors.registerPassword && (
                                <>{errors.registerPassword.message}</>
                            )}
                        </MessageError>
                    </InputContainer>
                    <InputContainer>
                        <div>
                            <Input
                                type={showConfirmPassword ? 'text' : 'password'}
                                {...register('confirmPassword')}
                                placeholder="Confirme sua senha"
                                aria-label="Senha"
                            />
                            <IconWrapper
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                style={{ cursor: 'pointer' }}
                            >
                                <PasswordIcon />
                            </IconWrapper>
                        </div>
                        <MessageError>
                            {errors.confirmPassword && (
                                <>{errors.confirmPassword.message}</>
                            )}
                        </MessageError>
                    </InputContainer>
                    <Checklist>
                        <ul>
                            <List valid={registerCheck[2]?.match(characters)}>
                                <MessageChecklist>
                                    No mínimo 8 caracteres
                                </MessageChecklist>
                            </List>
                            <List valid={registerCheck[2]?.match(letters)}>
                                <MessageChecklist>
                                    Letras maiúsculas e minúsculas
                                </MessageChecklist>
                            </List>
                            <List valid={registerCheck[2]?.match(number)}>
                                <MessageChecklist>
                                    No mínimo 1 número
                                </MessageChecklist>
                            </List>
                            <List
                                valid={registerCheck[2]?.match(
                                    specialCharacters,
                                )}
                            >
                                <MessageChecklist>
                                    No mínimo um caracter especial (!@?{}
                                    ...)
                                </MessageChecklist>
                            </List>
                        </ul>
                    </Checklist>
                    <InputContainer>
                        <Label>
                            <CheckboxInput {...register('privacyTerms')} />
                            <TermsLink>
                                {/* TODO: Direcionar para as páginas correspondentes após criadas */}
                                Li e aceito os <a href="/">Termos de Uso</a> e{' '}
                                <br /> <a href="/">Política de Privacidade</a>
                            </TermsLink>
                        </Label>
                        {hasError && (
                            <MessageError2>
                                {errors.privacyTerms && (
                                    <>{errors.privacyTerms.message}</>
                                )}
                            </MessageError2>
                        )}
                    </InputContainer>
                    <MessageError2>
                        {errorEmail && <>{errorEmail} </>}
                    </MessageError2>
                    <br />
                    <RegisterSubmitButton
                        type="submit"
                        id="register-submit-button"
                        disabled={false}
                    >
                        Criar conta
                    </RegisterSubmitButton>
                    <LoginLink>
                        Já tem conta? {/* redireciona se isLogin === true */}
                        <button
                            onClick={() => {
                                return setIsLogin('login');
                            }}
                        >
                            Faça o Login
                        </button>
                    </LoginLink>
                </Form>
            )}
            {popup ? (
                <PopUpRegisterSucess
                    email={registerCheck[1]}
                    close={closePopup}
                />
            ) : null}
            <PopupHandler setPopup={setPopup} Popup={Popup} />
        </>
    );
};

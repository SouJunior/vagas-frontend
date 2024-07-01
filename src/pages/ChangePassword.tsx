import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangePasswordSchema } from '../validations/ConfirmPasswordValidation';
import {
  Container,
  Form,
  StyledIconOpenEyes,
  StyledIconClosedEyes,
  Button,
  Checklist,
  List,
  ErrorMessages,
  MessageChecklist,
  ChangePasswordErrorMessage,
  Border,
} from './styles/ChangePasswordStyles';
import { useApi } from '../hooks/useApi';
import Header from '../components/Portal/Header';
import Footer from '../components/Portal/Footer';
import ChangePasswordModal from '../components/Portal/ProfileModal/ChangePasswordModal'; 
import CancelModal from '../components/Portal/ProfileModal/CancelModal';

interface ChangePasswordForm {
  oldPassword: string;
  password: string;
  confirmNewPassword: string;
};

const ChangePassword = () => {
  const [oldVisible, setOldVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [changePasswordModal, setChangePasswordModal] = useState(false); 
  const [cancelModal, setCancelModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm<ChangePasswordForm>({
    resolver: yupResolver(ChangePasswordSchema),
  });

  const characters = /(?=^.{8,20}$).*$/;
  const letters = /(?=.*[a-z])(?=.*[A-Z])\w+/;
  const number = /(?=.*[0-9])\w+/;
  const specialCharacters = /(?=.*\W+).*$/;
  const newPasswordValue = watch("password");
  const api = useApi();

  const onSubmitHandler: SubmitHandler<ChangePasswordForm> = async (data, e) => {
    e?.preventDefault();
    try {
      await api.changePassword(data.oldPassword, data.password, data.confirmNewPassword);
      setChangePasswordModal(true); 
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    };
  };

  const handleCancelModal = (e: any) => {
    e.preventDefault();
    setIsModalOpen(false);
    setCancelModal(true);
    window.scrollTo(0, 0);
  };

  return (
    <Container>
      <Header />
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        <h1>Alterar senha</h1>
        <Border />
        <label>
          <span>Senha atual</span>
          <ChangePasswordErrorMessage error={errors.oldPassword !== undefined}>
            <input
              maxLength={20}
              type={oldVisible ? "text" : "password"}
              {...register("oldPassword", { onChange: () => isSubmitted && trigger("oldPassword") })}
              placeholder='Insira sua senha'
            />
            <button
              type="button"
              onClick={() => setOldVisible(!oldVisible)}
            >
              {oldVisible ? <StyledIconClosedEyes /> : <StyledIconOpenEyes />}
            </button>
          </ChangePasswordErrorMessage>
        </label>
        <ErrorMessages>
          {errors.oldPassword && <>{errors.oldPassword.message}</>}
        </ErrorMessages>

        <label>
          <span>Nova senha</span>
          <ChangePasswordErrorMessage error={errors.password !== undefined}>
            <input
              maxLength={20}
              type={visible ? "text" : "password"}
              {...register("password", { onChange: () => isSubmitted && trigger("password") })}
              placeholder='Insira sua nova senha'
            />
            <button
              type="button"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <StyledIconClosedEyes /> : <StyledIconOpenEyes />}
            </button>
          </ChangePasswordErrorMessage>
        </label>
        <ErrorMessages>
          {errors.password && <>{errors.password.message}</>}
        </ErrorMessages>    

        <label>
          <span>Confirmar nova senha</span>
          <ChangePasswordErrorMessage error={errors.confirmNewPassword !== undefined}>
            <input
              type={confirmVisible ? "text" : "password"}
              onFocus={async () => await trigger("password")}
              {...register("confirmNewPassword")}
              placeholder='Confirme sua nova senha'
            />
            <button
              type="button"
              onClick={() => setConfirmVisible(!confirmVisible)}
            >
              {confirmVisible ? <StyledIconClosedEyes /> : <StyledIconOpenEyes />}
            </button>
          </ChangePasswordErrorMessage>
        </label>
        <ErrorMessages>
          {errors.confirmNewPassword && <>{errors.confirmNewPassword?.message}</>}
        </ErrorMessages>
        <div>
          {isSubmitSuccessful && !errorMessage && (
            <h2>Senha alterada com sucesso.</h2>
          )}
        </div>
        <ErrorMessages>
          {errorMessage && (
            <h2>{errorMessage}</h2>
          )}
        </ErrorMessages>
        <Checklist>
          <h2>Sua senha deve conter:</h2>
          <ul>
            <List valid={!!newPasswordValue && !!newPasswordValue.match(characters)}>
              <MessageChecklist>No mínimo 8 caracteres</MessageChecklist>
            </List>
            <List valid={!!newPasswordValue && !!newPasswordValue.match(letters)}>
              <MessageChecklist>Letras maiúsculas e minúsculas</MessageChecklist>
            </List>
            <List valid={!!newPasswordValue && !!newPasswordValue.match(number)}>
              <MessageChecklist>No mínimo 1 número</MessageChecklist>
            </List>
            <List valid={!!newPasswordValue && !!newPasswordValue.match(specialCharacters)}>
              <MessageChecklist>No mínimo um caracter especial (!@?{ }...)</MessageChecklist>
            </List>
          </ul>
        </Checklist>
        <div>
          <Button
            style={{ backgroundColor: "#086BCF", color: "white" }}
            type="submit"
            onClick={handleSubmit(onSubmitHandler)}
          >
            Alterar senha
          </Button>
          <Button 
          type="button" 
          onClick={handleCancelModal}
          >
            Cancelar
          </Button>
        </div>
      </Form>
      {changePasswordModal && <ChangePasswordModal setChangePasswordModal={setChangePasswordModal} />} 
      {cancelModal && <CancelModal setCancelModal={setCancelModal} open={isModalOpen} />}
      <Footer />
    </Container>
  );
};

export default ChangePassword;

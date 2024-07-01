import profilePicture from '../../assets/imgs/profile-image.svg';
import trashPicture from '../../assets/imgs/trash.svg';
import {
    Container,
    Form,
    ProfilePicWrapper,
    Title,
    CurriculoWrapper,
    CurriculumLink,
    Trash,
    ExtraLine,
    Required,
    Buttons,
    ErrorMessages,
    Spacing,
} from './style';
import { Position, Main, Row } from '../styles/CandidatePortalStyles';
import InputWrapper from '../../components/InputWrapper';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import location from '../ProfileSettings/data/location';
import { HandleInputsRenderCandidate } from './utils/handleInputsRenderCandidate';
import inputConfigCandidate from './data/inputConfigCandidate';
import { useState, useContext, useEffect } from 'react';
import ConfirmModal from '../../components/Portal/ProfileModal/ConfirmModal';
import CancelModal from '../../components/Portal/ProfileModal/CancelModal';
import { handleImgFile } from '../ProfileSettings/utils/handleImgFile';
import { useApi } from '../../hooks/useApi';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CandidateUpdateFormSchema } from '../../validations/CandidateUpdateFormValidation';
import InputMask from 'react-input-mask';
import { ProfileImg } from '../styles/CompanyPortalStyles';
import Header from '../../components/Portal/Header';
import Footer from '../../components/Portal/Footer';

export const CandidateSettings: React.FC = () => {
    const HandleOptionsRender = (arr: any): [] => {
        return arr.map((element: any) => {
            const key = element.id;
            return (
                <option key={key} value={element.sigla}>
                    {element.nome}
                </option>
            );
        });
    };
    const [deleteButton1, setDeleteButton1] = useState(false);
    const [deleteButton2, setDeleteButton2] = useState(false);
    const [cancelModal, setCancelModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | any>(null);
    const [imagePreview, setImagePreview] = useState<Blob | null>(null);
    const [file1, setFile1] = useState<File | any>();
    const [file2, setFile2] = useState<File | any>();
    const [fileKey1, setFileKey1] = useState<string>();
    const [fileKey2, setFileKey2] = useState<string>();
    const [fileUrl1, setFileUrl1] = useState<string>();
    const [fileUrl2, setFileUrl2] = useState<string>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        clearErrors,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(CandidateUpdateFormSchema),
    });

    const api = useApi();
    const auth = useContext(AuthContext);

    useEffect(() => {
        const userCurriculum = () => {
            const curriculums = auth.user.curriculums;
            if (curriculums == null) {
                return;
            }
            
            if (curriculums[0]) {
                const userCurriculum1 = curriculums[0];
                setFileKey1(userCurriculum1.fileKey);
                setFileUrl1(userCurriculum1.file);
                setDeleteButton1(true);
                setValue('fileInput1', [fileUrl1]);
            }

            if (curriculums[1]) {
                const userCurriculum2 = curriculums[1];
                setFileKey2(userCurriculum2.fileKey);
                setFileUrl2(userCurriculum2.file);
                setDeleteButton2(true);
                setValue('fileInput2', [fileUrl2]);
            }

            return () => {
                userCurriculum();
            };
        };
        userCurriculum();
    }, []);

    const formatPhoneNumberForForm = (
        phoneNumber: string,
        formatted: boolean,
    ) => {
        const length = formatted ? 15 : 11;
        return (phoneNumber || '').length < length
            ? '(99) 9999-99999'
            : '(99) 99999-9999';
    };

    const [mask1, setMask1] = useState(
        formatPhoneNumberForForm(auth.user.mainPhone, false),
    );
    const [mask2, setMask2] = useState(
        formatPhoneNumberForForm(auth.user.phone, false),
    );

    const handlePhoneNumberChange1 = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = e.target.value;
        setMask1(formatPhoneNumberForForm(value, true));
    };

    const handlePhoneNumberChange2 = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = e.target.value;
        setMask2(formatPhoneNumberForForm(value, true));
    };

    const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileObj1 = e.target.files && e.target.files[0];
        setFile1(fileObj1);

        if (!fileObj1) {
            return;
        }
        setDeleteButton1(true);
        clearErrors('fileInput1');
    };

    const handleFileChange2 = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const fileObj2 = e.target.files && e.target.files[0];
        setFile2(fileObj2);

        if (!fileObj2) {
            return;
        }
        setDeleteButton2(true);
    };

    const resetFileInput1 = async () => {
        if (fileKey1) {
            try {
                await api.deleteUserCurriculum(fileKey1);
            } catch (error) {
                //TODO ver mensagem de erro para o usuário
            }
        }
        setValue('fileInput1', '');
        setDeleteButton1(false);
        setFile1(false);
        setFileKey1(undefined);
    };

    const resetFileInput2 = async () => {
        if (fileKey2) {
            try {
                await api.deleteUserCurriculum(fileKey2);
            } catch (error) {
                //TODO ver mensagem de erro para o usuário
            }
        }
        setValue('fileInput2', '');
        setDeleteButton2(false);
        setFile2(false);
        setFileKey2(undefined);
    };

    const handleCancelModal = (e: any) => {
        e.preventDefault();
        setIsModalOpen(false);
        setCancelModal(true);
        window.scrollTo(0, 0);
    };

    const onSubmit = async (data: any, e: any) => {
        e.preventDefault();

        const regExPhoneNumber1 = data.phoneNumber1.replace(/\D/g, '');
        const regExPhoneNumber2 = data.phoneNumber2.replace(/\D/g, '');

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('mainPhone', regExPhoneNumber1);
        formData.append('phone', regExPhoneNumber2);
        formData.append('city', data.city);
        formData.append('state', data.uf);

        if (selectedImage) {
            formData.append('file', selectedImage);
            formData.append('profileKey', auth.user.profileKey ?? 'lkjhgfdsa');
        }

        let formDataCurriculum1;

        if (file1) {
            formDataCurriculum1 = new FormData();
            formDataCurriculum1.append('file', file1);
            formDataCurriculum1.append(
                'fileKey',
                auth.user.fileKey ?? 'lkjhgfdsa',
            );
        }

        let formDataCurriculum2;

        if (file2) {
            formDataCurriculum2 = new FormData();
            formDataCurriculum2.append('file', file2);
            formDataCurriculum2.append(
                'fileKey',
                auth.user.fileKey ?? 'lkjhgfdsa',
            );
        }

        try {
            if (formData) {
                await api.updateCandidateProfile(formData);
            }

            if (formDataCurriculum1) {
                await api.updateUserCurriculum(formDataCurriculum1);
            }

            if (formDataCurriculum2) {
                await api.updateUserCurriculum(formDataCurriculum2);
            }

            setConfirmModal(true);
            window.scrollTo(0, 0);
            document.body.style.overflow = 'hidden';
        } catch (error) {
            //TODO ver mensagem de erro para o usuário
        }
    };

    return (
        <Container>
            <Header />
            <form onSubmit={handleSubmit(onSubmit)}>
                <ProfilePicWrapper>
                    <ProfileImg
                        src={
                            imagePreview ||
                            (auth.user.profile ?? profilePicture)
                        }
                        alt="Foto de perfil"
                        width={'138px'}
                    />
                    <div className="upload">
                        <label htmlFor="profPic">Alterar foto</label>
                        <input
                            {...register('profPic', {
                                onChange: (e: any) =>
                                    handleImgFile({
                                        e,
                                        setSelectedImage,
                                        setImagePreview,
                                    }),
                            })}
                            id="profPic"
                            type="file"
                            accept=".jpg, .jpeg, .png"
                        />
                    </div>
                    <p>Somente formatos jpg, jpeg e png</p>
                    <span>Tamanho ou formato inválido</span>
                    <div>
                        <ErrorMessages>
                            {errors.profPic && <>{errors.profPic.message}</>}
                        </ErrorMessages>
                    </div>
                </ProfilePicWrapper>
                <Main>
                    <Row />
                </Main>
                <Title>Dados Pessoais</Title>
                <Form>
                    <div className="form__left">
                        <InputWrapper>
                            {HandleInputsRenderCandidate(
                                inputConfigCandidate,
                                register,
                                errors,
                            )}
                            <label>
                                Telefone 1<Required>*</Required>
                                <InputMask
                                    mask={mask1}
                                    maskChar=""
                                    defaultValue={auth.user.mainPhone}
                                    type="tel"
                                    placeholder="(00) 00000-0000"
                                    {...register('phoneNumber1', {
                                        onChange: handlePhoneNumberChange1,
                                    })}
                                />
                            </label>
                            <ErrorMessages>
                                {errors.phoneNumber1 && (
                                    <>{errors.phoneNumber1.message}</>
                                )}
                            </ErrorMessages>
                        </InputWrapper>
                    </div>
                    <div className="form__right">
                        <InputWrapper>
                            <label>
                                Cidade<Required>*</Required>
                                <input
                                    defaultValue={auth.user.city}
                                    {...register('city')}
                                    type="text"
                                    placeholder="Insira sua cidade"
                                />
                            </label>
                            <ErrorMessages>
                                {errors.city && <>{errors.city.message}</>}
                            </ErrorMessages>
                            <Spacing />
                        </InputWrapper>
                        <Select>
                            <label htmlFor="states">
                                UF<Required>*</Required>
                            </label>
                            <select
                                id="states"
                                defaultValue={auth.user.state}
                                {...register('uf')}
                            >
                                <option value="DEFAULT">--</option>
                                {HandleOptionsRender(location)}
                            </select>
                        </Select>
                        <ErrorMessages>
                            {errors.uf && <>{errors.uf.message}</>}
                        </ErrorMessages>
                        <Spacing />
                        <InputWrapper>
                            <label>
                                Telefone 2
                                <InputMask
                                    mask={mask2}
                                    maskChar=""
                                    type="tel"
                                    defaultValue={auth.user.phone}
                                    {...register('phoneNumber2', {
                                        onChange: handlePhoneNumberChange2,
                                    })}
                                    placeholder="(00) 00000-0000"
                                />
                            </label>
                        </InputWrapper>
                    </div>
                </Form>
                <Main>
                    <Row />
                </Main>
                <Title>Dados Profissionais</Title>
                <Form>
                    <div className="form__left">
                        <CurriculoWrapper>
                            <span>
                                Currículo 1 <Required>*</Required>
                            </span>
                            <div>
                                {!file1 && fileUrl1 && deleteButton1 && (
                                    <CurriculumLink
                                        href={fileUrl1}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Visualizar currículo
                                    </CurriculumLink>
                                )}
                                {file1 && (
                                    <label htmlFor="fileInput1">
                                        {file1.name}
                                    </label>
                                )}
                                {!deleteButton1 && (
                                    <label htmlFor="fileInput1">
                                        Insira seu currículo em PDF
                                    </label>
                                )}
                                {deleteButton1 && (
                                    <Trash onClick={resetFileInput1}>
                                        <img
                                            src={trashPicture}
                                            alt="Deletar arquivo"
                                        />
                                    </Trash>
                                )}
                            </div>
                            <ErrorMessages>
                                {errors.fileInput1 && (
                                    <>{errors.fileInput1.message}</>
                                )}
                            </ErrorMessages>
                            <input
                                type="file"
                                id="fileInput1"
                                accept=".pdf"
                                {...register('fileInput1', {
                                    onChange: handleFileChange1,
                                })}
                            />
                        </CurriculoWrapper>
                    </div>
                    <div className="form__right">
                        <CurriculoWrapper>
                            <span>Currículo 2</span>
                            <div>
                                {!file2 && fileUrl2 && deleteButton2 && (
                                    <CurriculumLink
                                        href={fileUrl2}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Visualizar currículo
                                    </CurriculumLink>
                                )}
                                {file2 && (
                                    <label htmlFor="fileInput2">
                                        {file2.name}
                                    </label>
                                )}
                                {!deleteButton2 && (
                                    <label htmlFor="fileInput2">
                                        Insira seu currículo em PDF
                                    </label>
                                )}
                                {deleteButton2 && (
                                    <Trash onClick={resetFileInput2}>
                                        <img
                                            src={trashPicture}
                                            alt="Deletar arquivo"
                                        />
                                    </Trash>
                                )}
                            </div>
                            <input
                                {...register('fileInput2', {
                                    onChange: handleFileChange2,
                                })}
                                type="file"
                                id="fileInput2"
                                accept=".pdf"
                            />
                        </CurriculoWrapper>
                    </div>
                </Form>
                <Main>
                    <Row />
                </Main>
                <Buttons>
                    <div>
                        <Button type="submit">Atualizar</Button>
                    </div>
                    <div>
                        <Button
                            background="outline"
                            onClick={handleCancelModal}
                        >
                            Cancelar
                        </Button>
                    </div>
                </Buttons>
                <ExtraLine>
                    <Row />
                </ExtraLine>
            </form>
            {confirmModal && <ConfirmModal setConfirmModal={setConfirmModal} />}
            {cancelModal && <CancelModal setCancelModal={setCancelModal} open={isModalOpen} />}
            <Position>
                <Main />
                <Footer />
            </Position>
        </Container>
    );
};

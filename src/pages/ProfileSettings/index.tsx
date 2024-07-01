import profilePicture from '../../assets/imgs/profile-image.svg';
import { Form, ProfileImgWrapper } from './style';
import {
    Container,
    Main,
    Position,
    Row,
    ProfileImg,
} from '../styles/CompanyPortalStyles';
import InputWrapper from '../../components/InputWrapper';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';

import inputConfigs from './data/inputSettings';
import location from './data/location';
import companyType from './data/companyType';
import {} from '../../components/HeaderDefault/styles';
import { HandleInputsRender } from './utils/handleInputsRender';
import { HandleOptionsRender } from './utils/handleOptionsRender';
import { useContext, useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { handleSubmitForm } from './utils/handleSubimitForm';
import { handleImgFile } from './utils/handleImgFile';
import { checkImgZise } from './utils/checkImgSize';
import Header from '../../components/Portal/Header';
import Footer from '../../components/Portal/Footer';

import { useForm } from 'react-hook-form';
import ConfirmModal from '../../components/Portal/ProfileModal/ConfirmModal';
import CancelModal from '../../components/Portal/ProfileModal/CancelModal';

export const ProfileSettings: React.FC = () => {
    const [charCount, setCharCount] = useState(0);
    const [currChar, setCurrChar] = useState(0);
    const [selectedImage, setSelectedImage] = useState<File | null | any>(null);
    const [imagePreview, setImagePreview] = useState<Blob | null>(null);
    const [cancelModal, setCancelModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleCancelModal = (e: any) => {
        e.preventDefault();
        setIsModalOpen(false);
        setCancelModal(true);
        window.scrollTo(0, 0);
    };

    const api = useApi();
    const auth = useContext(AuthContext);

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setCurrChar(2000 - charCount);
    }, [charCount]);

    const onSubmit = (data: any) => {
        handleSubmitForm({ data, selectedImage, api, auth, setConfirmModal });
    };

    return (
        <Container>
            <Header />
            <form onSubmit={handleSubmit(onSubmit)}>
                <ProfileImgWrapper>
                    <ProfileImg
                        src={
                            imagePreview ||
                            (auth.user.profile ?? profilePicture)
                        }
                        alt="Foto de perfil"
                        width={'10%'}
                    />
                    <div className="upload">
                        <label htmlFor="profiPic">Alterar foto</label>
                        {/**
                         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
                         */}
                        <input
                            name="profPic"
                            id="profiPic"
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e: any) =>
                                handleImgFile({
                                    e,
                                    setSelectedImage,
                                    setImagePreview,
                                })
                            }
                        />
                    </div>
                    <p>Aceitável somente os formatos .jpg, .jpeg e .png</p>
                    <span className="img__error">
                        {checkImgZise(selectedImage)}
                    </span>
                </ProfileImgWrapper>
                <Main>
                    <Row />
                </Main>
                <Form charQtde={currChar}>
                    <div className="form__left">
                        <InputWrapper>
                            {HandleInputsRender(
                                inputConfigs,
                                register,
                                setValue,
                            )}
                        </InputWrapper>
                    </div>
                    <div className="form__right">
                        {/*TODO: Isso é um wrapper deveria chamar SelectWrapper */}
                        <Select>
                            <label htmlFor="states">
                                UF<sup>*</sup>
                            </label>
                            <select
                                id="states"
                                defaultValue={auth.user.uf ?? 'DEFAULT'}
                                {...register('uf', {
                                    validate: (value) =>
                                        value !== 'DEFAULT' ||
                                        'O campo UF é obrigatório',
                                })}
                                className={errors.uf ? 'error' : ''}
                            >
                                <option value="DEFAULT" disabled>
                                    --
                                </option>
                                {HandleOptionsRender(location)}
                            </select>
                            {errors.uf && (
                                <p
                                    style={{
                                        color: 'red',
                                        paddingBottom: '8px',
                                    }}
                                >
                                    {errors.uf.message?.toString()}
                                </p>
                            )}

                            <label htmlFor="companyType">Tipo de Empresa</label>
                            <select
                                id="companyType"
                                defaultValue={
                                    auth.user.companyType ?? 'DEFAULT'
                                }
                                {...register('type')}
                            >
                                <option value="DEFAULT" disabled>
                                    --
                                </option>
                                {HandleOptionsRender(companyType)}
                            </select>
                            <label htmlFor="companySize">
                                Porte da Empresa
                            </label>
                            <select
                                id="companySize"
                                defaultValue={
                                    auth.user.companySize ?? 'DEFAULT'
                                }
                                {...register('size')}
                            >
                                <option value="DEFAULT" disabled>
                                    --
                                </option>
                                <option value="SMALL SIZE">
                                    Pequeno - até 49 funcionários
                                </option>
                                <option value="HALF SIZE">
                                    Médio: 50 a 99 funcionários
                                </option>
                                <option value="BIG SIZE">
                                    Grande: a partir de 100 funcionários
                                </option>
                            </select>
                        </Select>
                        <div className="form__textarea">
                            <label>Decrição da empresa</label>
                            <textarea
                                placeholder="Breve descrição da empresa"
                                {...register('description')}
                                defaultValue={auth.user.description}
                                onChange={(e) =>
                                    setCharCount(e.target.value.length)
                                }
                            />
                        </div>
                        <span>{currChar} caracteres restantes</span>
                    </div>

                    <div className="form__change">
                        <Button type="submit">Alterar</Button>
                    </div>
                    <div className="form__cancel">
                        <Button
                            background="outline"
                            onClick={handleCancelModal}
                        >
                            Cancelar
                        </Button>
                    </div>
                </Form>
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

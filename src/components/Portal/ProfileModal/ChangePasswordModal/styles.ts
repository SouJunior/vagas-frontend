import styled from 'styled-components';

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    position: fixed;
    background: white;
    border-radius: 8px;

    img {
        width: 30%;
    }

    .modal--texts {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 24px 24px 24px;
    }

    @media (max-width: 540px) {
        width: 80%;
    }
`;

export const ModalTitle = styled.h2`
    font-family: 'Radio Canada';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 48px;
    padding: 0 0 16px 0;
    color: ${({theme}) => theme.colors.primaryDark};

    @media (max-width: 280px) {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 18px;
    }

    @media (max-width: 480px) {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 18px;
    }
`;

export const CloseModal = styled.div`
    display: flex;
    justify-content: flex-end;
    align-self: flex-end;
    padding-left: 150px;

    @media (max-width: 280px) {
        margin-right: 10px;
    }

    @media (max-width: 480px) {
        width: 80%;
        margin-top: 10px;
    }
`;

export const ModalCloseButton = styled.button`
    width: 45px;
    height: 45px;
    background-color: #fff;
    color: ${({theme}) => theme.colors.primaryDark};
    font-weight: bold;
    border-radius: 8px;
    &:hover {
        background-color: red;
        border: 1px solid;
        color: #fff;
    }
    `;
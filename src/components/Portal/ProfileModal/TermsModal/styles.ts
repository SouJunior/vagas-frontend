import styled from 'styled-components';

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    position: fixed;
    background: white;
    border-radius: 8px;
    overflow-y: auto; 
    max-height: 60%; 
    max-width: 20%;

    scrollbar-width: thin; 
    scrollbar-color: ${({ theme }) => theme.colors.primaryDark} transparent; 

    &::-webkit-scrollbar {
        width: 10px; 
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.colors.primaryDark}; 
        border-radius: 8px; 
    }

    &::-webkit-scrollbar-track {
        background-color: #f1f1f1; 
        border-radius: 8px; 
    }

    .modal--texts {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 24px 24px 24px;
    }

    @media (max-width: 540px) {
        max-width: 90%; 
        max-height: 50%; 
    }
`;

export const Border = styled.span`
    border: 2px solid ${({theme}) => theme.colors.primaryDark};
    width: 60%;
    margin-bottom: 10px;
    border-radius: 10px;
`;

export const ModalContainer = styled.div`
    display: flex;
    margin-top 30px;
`;

export const CloseModal = styled.div`
    justify-content: flex-end;
    align-self: flex-end;
    padding-left: 150px;
    position: absolute;
    top: 0; 
    right: 0; 
`;

export const ModalCloseButton = styled.button`
    width: 45px;
    height: 45px;
    color: ${({theme}) => theme.colors.primaryDark};
    font-weight: bold;
    border-radius: 8px;
    &:hover {
        background-color: red;
        border: 1px solid;
        color: #fff;
        border-radius: 10px;
    }
`;

export const ModalTextInicio = styled.p`
    font-size: 15px;
    text-align: center;
    color: ${({theme}) => theme.colors.primaryDark};
`;

export const ModalText = styled.p`
    font-family: Inter;    
    font-weight: 400;
    font-size: 15px;
    line-height: 26px;
    padding: 0 0 16px 0;
    text-align: justify;
    white-space: pre-line;

    color: ${({theme}) => theme.colors.mutedDarker};

    @media (max-width: 480px) {
        width: 80%;
    }
`;

export const ModalTitle = styled.h2`
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    padding: 0 0 16px 0;
    color: ${({theme}) => theme.colors.primaryDark};

    @media (max-width: 280px) {
        font-size: 15px;
        text-align: center;    
    }

    @media (max-width: 480px) {
        display: flex;
        font-size: 15px;
        text-align: center;
    }
`;
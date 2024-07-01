import styled from "styled-components";
import { AiFillEye } from 'react-icons/ai'
import { RiEyeCloseLine } from "react-icons/ri";
import tickImage from '../../assets/imgs/tick.svg';
import disabledImage from '../../assets/imgs/disabled.svg';

export const Border = styled.span`
    border: 1px solid #dcdcdc;
    width: 50%;
    margin-bottom: 30px;
`

export const Container = styled.main`
    height: 100vh;
    overflow-y: auto;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    place-items: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    
    h1 {
        text-align: center;
        color: var(--Logo-Cor, #046AD0);
        font-family: "Radio Canada";
        font-size: 40px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        font-weight: 700;
        padding-top: 2rem;
        padding-bottom: 1rem;
    }

    label {
        margin-bottom: 10px;
        display: inline-flex;
        flex-direction: column;
       
        span {
        text-align: center;
        font-weight: 600;
        font-size: 24px;
        color: #515050;
        font-family: "Radio Canada";
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        }

    }
      
    label div {
        display: flex;
        background-color: #FDFFFC;
        margin-top: 5px;
        padding: 0.5rem;
        border-radius: 5px;
        border-width: 2px;

        input {
            outline-color: transparent;
            width: 280px;
            font-family: "Radio Canada";

            @media (max-width: 600px) {
                width: 250px;
            }

            @media (max-width: 280px) {
                width: 150px;
            }
        }

        button {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
        }
    }
`

export const ErrorMessages = styled.div`
    color: red;
    padding-bottom: 10px;
`

interface ErrorProps {
    error: boolean;
}

export const ConfirmPasswordErrorMessage = styled.div <ErrorProps>`
    border-color: ${props => props.error ? "red" : "none"}
`

export const ChangePasswordErrorMessage = styled.div <ErrorProps>`
    border-color: ${props => props.error ? "red" : "none"};
   
`

export const StyledIconOpenEyes = styled(AiFillEye)`
    height: 30px;
    width: 30px;
    justify-self: end;
    fill: #cbd5e1;
`

export const StyledIconClosedEyes = styled(RiEyeCloseLine)`
    height: 30px;
    width: 30px;
    justify-self: end;
    fill: #cbd5e1;
`

export const Checklist = styled.div`
    display:flex;
    flex-direction: column;
    padding: 1.5rem;
    border-radius: 5px;
    border: 1px solid;
    border-color: #086BCF;

    h2 {
        font-weight: 600;
        margin-bottom: 5px;
        align-self: center;
    }
`

interface ListProps {
    valid: boolean;
}

export const List = styled.li<ListProps>`
    display: flex;
    flex-direction: space-between;
    list-style: none;
    font-size: 14px;
    background-repeat: no-repeat;
    background-position-y: center;
    background-image: ${props => props.valid ? `url(${tickImage})` : `url(${disabledImage})`};
    color: ${props => props.valid ? "#149911" : "#C1292E"};
`

export const MessageChecklist = styled.div`
    padding-left: 32px;
`

export const Button = styled.button`
    padding: 2px;
    margin-top: 30px;
    margin-right: 20px;
    border-width: 1px;
    border-radius: 5px;
    border-color: #086BCF;
    width: 252px;
    height: 58px;
    color: #086BCF;
    font-weight: bold;

    @media (max-width: 600px) {
        width: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 25px;
    }

    @media (max-width: 280px) {
        width: 150px;
        font-size: 1em;
    }
  
    &:hover{
        opacity: 0.8;
    }
`
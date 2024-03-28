import styled from 'styled-components';
import { TiSocialFacebook } from 'react-icons/ti';
import { RiInstagramFill } from 'react-icons/ri';
import { BsYoutube, BsTelegram, BsGithub } from 'react-icons/bs';
import { AiFillLinkedin } from 'react-icons/ai';

export const Footer = styled.footer`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 25px 0;

    .mobile-wrapper {
        display: none;
    }

    .desktop-wrapper {
        display: inline-flex;
        width: 90%;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-self: center;
        align-items: flex-start;
        gap: 50px;
    }

    div:first-child {
        align-self: center;
    }

    @media (max-width: 280px) {
        flex-direction: column;
        text-align: center;
        align-items: center;
    }

    @media (max-width: 700px) {
        .mobile-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            width: 80% !important;

            h2 {
                font-size: 1.5rem;
                font-weight: 700;
            }

            small {
                color: ${(props) => props.theme.colors.primary};
                font-weight: 700;
            }

            .contacts {
                display: flex;
                flex-direction: row;
                gap: 20px;

                svg {
                    color: #046ad0;
                }
            }
        }

        .desktop-wrapper {
            display: none;
        }

        .about {
            display: block;
        }

        .hashtag {
            display: block;

            h2 {
                font-size: 1.8rem !important;
                font-weight: 700;
            }
        }
    }

    @media (min-width: 281px) and (max-width: 639px) {
        div:first-child {
            width: 100%;
            text-align: center;
        }

        img {
            display: inline;
            cursor: pointer;
        }
    }

    @media (min-width: 640px) and (max-width: 920px) {
        div:first-child {
            width: 100%;
            text-align: center;
        }
        img {
            display: inline;
            cursor: pointer;
        }
    }

    h3 {
        font-size: 18px;
        font-weight: 700;
        padding-bottom: 10px;
        color: #046ad0;
    }

    li {
        list-style-type: none;
        font-size: 14px;
        line-height: 30px;
        margin: 0;
        color: #4d4d4d;
        &:hover {
            color: #046ad0;
        }
        max-width: 300px;
    }

    @media (max-width: 320px) {
        bottom: 700px;
    }
`;
export const Grid = styled.ul`
    display: grid;
    grid-template-columns: auto auto auto;
    column-width: 10px;
    gap: 10px;
`;
export const FacebookIcon = styled(TiSocialFacebook)`
    width: 20px;
    height: 20px;
    color: #212121;
`;

export const YouTubeIcon = styled(BsYoutube)`
    width: 20px;
    height: 20px;
    color: #212121;
`;
export const GitHubIcon = styled(BsGithub)`
    width: 20px;
    height: 20px;
    color: #212121;
`;
export const LinkedInIcon = styled(AiFillLinkedin)`
    width: 20px;
    height: 20px;
    color: #212121;
`;
export const InstagramIcon = styled(RiInstagramFill)`
    width: 20px;
    height: 20px;
    color: #212121;
`;
export const TelegramIcon = styled(BsTelegram)`
    width: 20px;
    height: 20px;
    color: #212121;
`;

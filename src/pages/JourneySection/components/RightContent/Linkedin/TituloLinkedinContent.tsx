import { Article } from 'phosphor-react';
import { Container, Img, ImgWrap, Paragrafo } from '../styles';

const TituloLinkedinContent: React.FC = () => {
    return (
        <Container>
            <ImgWrap>
                <Article size={200} color="#046AD0" opacity="0.6" />
            </ImgWrap>
            <Paragrafo>
                Esta é sem dúvida uma das partes mais importantes do seu perfil
                do LinkedIn. É aquela descrição de 120 caracteres diretamente
                abaixo do seu nome. O resumo aparece na sua página de perfil,
                mas também aparece toda vez que você se envolve no LinkedIn.
                Seja específico. Liste as habilidades técnicas e os cargos. Use
                palavras-chave para a posição desejada.
            </Paragrafo>
            <br />
            <Paragrafo>
                Dica profissional: agora você pode adicionar uma breve
                introdução de áudio. Você precisa usar seu dispositivo móvel
                para adicionar a introdução de áudio. Selecione o lápis para
                editar seu perfil. Onde ele pedir a pronúncia do seu nome, grave
                sua introdução. Você tem 10 segundos. Diga oi, conte às pessoas
                o que você faz e peça para elas se conectarem.
            </Paragrafo>
        </Container>
    );
};

export default TituloLinkedinContent;

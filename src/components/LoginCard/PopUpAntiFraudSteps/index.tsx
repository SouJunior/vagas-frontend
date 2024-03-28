import { Dialog, DialogContent, IconButton, Typography, Button, Box, useMediaQuery } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { SetStateAction } from "react";

interface PopUpAntiFraudStepsProps {
    openFollowTheseSteps: boolean;
    setOpenFollowTheseSteps: React.Dispatch<SetStateAction<boolean>>;
    setPopUpAntiFraudOpen: React.Dispatch<SetStateAction<boolean>>;
};

const PopUpAntiFraudSteps: React.FC<PopUpAntiFraudStepsProps> = ({ openFollowTheseSteps, setOpenFollowTheseSteps, setPopUpAntiFraudOpen }) => {
    
    const telaMobile = useMediaQuery('(max-width:600px)');

    const handleClose = () => {
        setOpenFollowTheseSteps(false);
        setPopUpAntiFraudOpen(false);
    };

    return (
        <Dialog open={openFollowTheseSteps} fullScreen>
            <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleClose}
                sx={{ display: "flex", alignSelf: "end", margin: "10px" }}
            >
                <CloseIcon fontSize="inherit" />
            </IconButton>
            <DialogContent sx={{ marginX: !telaMobile ? "60px" : "8px", display: "flex", flexDirection: "column", gap: "18px" }}>
                <Box>
                    <Typography fontWeight="bold">"Acho que fui vítima de fraude".</Typography>
                    <Typography fontWeight="bold" >O que posso fazer?</Typography>
                </Box>
                <Box>
                    <Typography>Acha que pode ter sido vítima de fraude?</Typography>
                    <Typography>A seguir, veja dicas e medidas a tomar:</Typography>
                </Box>
                <Typography>
                    Em primeiro lugar, interrompa a comunicação com qualquer pessoa que você acha que esteja tentando ou já tenha enganado você.
                    Depois, denuncie a fraude. É importante contatar as autoridades competentes assim que possível para tentar recuperar o dinheiro perdido e impedir que outras pessoas sejam vítimas do mesmo golpe.
                    Se tiver alguma desconfiança sobre uma vaga que encontrar na SouJunior ou se receber comunicações de ofertas de vaga que levantem suspeitas, denuncie a vaga.
                </Typography>
                <Typography>
                    Se acredita que alguém está aplicando golpes usando o nome de uma empresa legítima, você pode entrar em contato com a empresa e informá-la de que seu nome está sendo usado para fins fraudulentos.
                    Se perdeu dinheiro, divulgou informações privadas e confidenciais a alguém que acredita estar aplicando golpes, ou se participou inadvertidamente de atividades possivelmente ilegais, você pode querer contatar as autoridades ou o departamento de crimes cibernéticos locais.
                </Typography>
                <Typography>
                    Se perdeu dinheiro, compartilhou seus dados de conta bancária ou acredita estar em perigo de roubo de identidade, é recomendável também denunciar a fraude ao seu banco ou instituição financeira.
                </Typography>
                <Typography>
                    Se acredita que seu computador ou dispositivo foi infectado com malware ou comprometido de algum forma, execute uma análise de vírus, certifique-se de que a segurança do computador está atualizada e altere as senhas de suas contas on-line.
                </Typography>
                <Button onClick={handleClose} variant="contained" sx={{ width: "180px", alignSelf: "center", marginTop: "50px", marginBottom: "20px" }}>Eu entendi</Button>
            </DialogContent>
        </Dialog>
    )
}

export default PopUpAntiFraudSteps
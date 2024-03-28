import { Link, Alert, IconButton, Box, AlertTitle, Typography, Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/Auth/AuthContext';
import PopUpAntiFraudSteps from '../PopUpAntiFraudSteps';

const PopUpAntiFraudMessage = () => {

    const { setPopUpAntiFraudOpen } = useContext(AuthContext);
    const [expand, setExpand] = useState(false);
    const [openFollowTheseSteps, setOpenFollowTheseSteps] = useState(false);

    const handleClose = () => {
        setPopUpAntiFraudOpen(false);
    };

    const handleExpand = () => {
        setExpand(true);
    };

    const handleOpenFollowTheseSteps = () => {
        setOpenFollowTheseSteps(true);
    };

    return (
        <>
            <Box sx={{ alignSelf: "center" }}>
                <Box sx={{ marginTop: "8px", marginX: "5px", }}>
                    {!expand &&
                        <Alert
                            variant="outlined"
                            icon={false}
                            severity="info"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={handleClose}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{
                                background: '#FFFF',
                                borderRadius: "8px",
                                color: "#4D4D4D",
                                fontSize: "16px",
                                fontWeight: "400",
                                '& .MuiAlert-message': { width: "100%" },
                            }}
                        >
                            <AlertTitle>
                                Cuidado com fraudes de pessoas ou empresas que tentam se passar pela SouJunior! <Link sx={{ cursor: "pointer" }} underline="none" onClick={handleExpand}>Ler Mais</Link>.
                            </AlertTitle>
                        </Alert>
                    }
                    <Dialog open={expand} onClose={handleClose} sx={{ '& .MuiDialog-container': { display: "flex", alignItems: "start", marginTop: "47px" } }}>
                        <Box>
                            <Alert
                                variant="outlined"
                                icon={false}
                                severity="info"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setPopUpAntiFraudOpen(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{
                                    background: '#FFFF',
                                    color: "#4D4D4D",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    '& .MuiAlert-message': { borderRadius: "8px" },
                                }}
                            >
                                <AlertTitle sx={{ marginBottom: "20px" }}>
                                    Cuidado com fraudes de pessoas ou empresas que tentam se passar pela SouJunior! Ler Mais:
                                </AlertTitle>
                                <>
                                    <Typography>A SouJunior é portal gratuito para candidatos e empresas. Você nunca deve enviar pagamentos a empresas ou pessoas que afirmam ser representantes da SouJunior.</Typography>
                                    <Typography> Se você achar que pode ter sido vítima de fraude, siga <Link onClick={handleOpenFollowTheseSteps} sx={{ cursor: 'pointer' }} underline="none">esses passos</Link>.</Typography>
                                    <Typography> Link <Link sx={{ cursor: 'pointer' }} underline="none">Termos de uso.</Link></Typography>
                                </>
                            </Alert>
                        </Box>
                    </Dialog>
                </Box>
            </Box>
            <PopUpAntiFraudSteps
                openFollowTheseSteps={openFollowTheseSteps}
                setOpenFollowTheseSteps={setOpenFollowTheseSteps}
                setPopUpAntiFraudOpen={setPopUpAntiFraudOpen}
            />
        </>
    )
}

export default PopUpAntiFraudMessage
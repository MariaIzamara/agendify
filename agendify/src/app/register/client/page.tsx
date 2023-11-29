"use client";
import InformationModal from "@/components/InformationModal";
import { AuthContext } from "@/context/AuthContext";
import { RegisterContext } from "@/context/RegisterContext";
import useHttp from "@/hooks/useHttp";
import { USER_ALREADY_REGISTERED } from "@/utils/constants";
import { REGISTER_REQUEST } from "@/utils/requests";
import { CancelOutlined, ReportProblemOutlined } from "@mui/icons-material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { LoadingButton } from "@mui/lab";
import {
    Box,
    Container,
    IconButton,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { redirect } from "next/navigation";
import { ReactNode, useContext, useEffect, useState } from "react";
import { CLIENT, blobToString } from "../utils";

export default function RegisterClient() {
    const theme = useTheme();
    const authContext = useContext(AuthContext);
    const registerContext = useContext(RegisterContext);

    const { setToken, setUserType, setName } = authContext;
    const { email, password } = registerContext;

    const [photo, setPhoto] = useState<File>();
    const [fullName, setFullName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const { loading, success, error, data, requestHttp } = useHttp();

    const unfilledInputs = fullName === "" || phone === "";

    const userAlreadyRegistered = success && data === USER_ALREADY_REGISTERED;

    useEffect(() => {
        if (success && !userAlreadyRegistered) {
            const { token, type, name } = data;
            setToken(token);
            setUserType(type);
            setName(name);
            redirect("/main");
        }
    }, [success, data, userAlreadyRegistered, setName, setToken, setUserType]);

    const renderError = (): ReactNode => (
        <InformationModal
            icon={<CancelOutlined fontSize="medium" />}
            text="Algo deu errado, tente novamente!"
            backgroundColor={theme.palette.error.main}
        />
    );

    const renderUserAlreadyRegistered = (): ReactNode => (
        <InformationModal
            icon={<ReportProblemOutlined fontSize="medium" />}
            text="Usuário já cadastrado!"
            backgroundColor={theme.palette.primary.main}
        />
    );

    const imageData = photo ? {
        imageName: photo.name,
        imageType: photo.type,
        imageData: blobToString(photo),
    } : {}
    
    return (
        <>
            {error && renderError()}
            {userAlreadyRegistered && renderUserAlreadyRegistered()}
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "fit-content",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <Typography
                    sx={{
                        width: 600,
                        fontSize: 32,
                        fontWeight: 400,
                        textAlign: "left",
                    }}
                >
                    Olá, Cliente!
                </Typography>
                <Typography
                    sx={{
                        width: 640,
                        height: 73,
                        fontSize: 32,
                        fontWeight: 400,
                        textAlign: "center",
                        borderBlockEnd:
                            "1px solid " + theme.palette.primary.main,
                    }}
                >
                    Complete os dados para criar a sua conta.
                </Typography>
                <Box
                    sx={{
                        width: 400,
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "10px",
                        marginTop: "20px",
                    }}
                >
                    <Box>
                        <Typography>Foto</Typography>
                        <IconButton
                            component="label"
                            sx={{
                                width: 150,
                                height: 150,
                            }}
                        >
                            <FileUploadIcon />
                            <input
                                type="file"
                                hidden
                                onChange={(e) =>
                                    setPhoto(
                                        e.target.files
                                            ? e.target.files[0]
                                            : undefined
                                    )
                                }
                            />
                        </IconButton>
                    </Box>
                    <Box>
                        <Typography>Nome Completo *</Typography>
                        <TextField
                            error={!fullName}
                            sx={{ width: 400 }}
                            onChange={(event) =>
                                setFullName(event.target.value)
                            }
                        />
                    </Box>
                    <Box>
                        <Typography>Telefone *</Typography>
                        <MuiTelInput
                            error={!phone}
                            value={phone}
                            onChange={(value) => setPhone(value)}
                            placeholder="00 00000 0000"
                        />
                    </Box>
                    <Box
                        sx={{
                            alignSelf: "flex-end",
                        }}
                    >
                        <Tooltip
                            title={
                                unfilledInputs &&
                                "Campo obrigatório vazio ou preenchido incorretamente."
                            }
                            placement={"top"}
                        >
                            <span>
                                <LoadingButton
                                    variant="contained"
                                    loading={loading}
                                    disabled={unfilledInputs}
                                    onClick={() =>
                                        requestHttp(REGISTER_REQUEST, {
                                            type: CLIENT,
                                            email,
                                            password,
                                            name: fullName,
                                            phone,
                                            ...imageData
                                        })
                                    }
                                >
                                    Cadastrar
                                </LoadingButton>
                            </span>
                        </Tooltip>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

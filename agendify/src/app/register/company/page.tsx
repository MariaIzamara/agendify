"use client";
import CustomMultipleSelect from "@/components/CustomMultipleSelect";
import InformationModal from "@/components/InformationModal";
import { AuthContext } from "@/context/AuthContext";
import { RegisterContext } from "@/context/RegisterContext";
import useHttp from "@/hooks/useHttp";
import { USER_ALREADY_REGISTERED, category, weekDays } from "@/utils/constants";
import { REGISTER_REQUEST } from "@/utils/requests";
import { CancelOutlined, ReportProblemOutlined } from "@mui/icons-material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { LoadingButton } from "@mui/lab";
import {
    Box,
    Container,
    Grid,
    IconButton,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { redirect } from "next/navigation";
import { ReactNode, useContext, useEffect, useState } from "react";
import { COMPANY, blobToString } from "../utils";

export default function RegisterCompany() {
    const theme = useTheme();
    const authContext = useContext(AuthContext);
    const registerContext = useContext(RegisterContext);

    const { setToken, setUserType, setName } = authContext;
    const { email, password } = registerContext;

    const [picture, setPicture] = useState<File>();
    const [fullName, setFullName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [number, setNumber] = useState<string>("");
    const [neighborhood, setNeighborhood] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [city, setCity] = useState<string>("");

    const { loading, success, error, data, requestHttp } = useHttp();

    const unfilledInputs =
        fullName === "" ||
        selectedCategory.length === 0 ||
        selectedDays.length === 0 ||
        description === "" ||
        phone === "" ||
        startTime === "" ||
        endTime === "" ||
        street === "" ||
        number === "" ||
        neighborhood === "" ||
        state === "" ||
        city === "";

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

    const imageData = picture
        ? {
              imageName: picture.name,
              imageType: picture.type,
              imageData: blobToString(picture),
          }
        : {};

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
                    Olá, Empresa!
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
                <Grid
                    container
                    spacing={0}
                    sx={{
                        width: 640,
                    }}
                >
                    <Grid item xs={4}>
                        <Typography>Imagem</Typography>
                        <IconButton
                            component="label"
                            sx={{
                                width: 176,
                                height: 136,
                                backgroundColor: theme.palette.primary.light,
                            }}
                        >
                            <FileUploadIcon height={300} />
                            <input
                                type="file"
                                hidden
                                onChange={(e) =>
                                    setPicture(
                                        e.target.files
                                            ? e.target.files[0]
                                            : undefined
                                    )
                                }
                            />
                        </IconButton>
                    </Grid>
                    <Grid item container xs={8} spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Nome *</Typography>
                            <TextField
                                error={!fullName}
                                sx={{ width: "100%" }}
                                onChange={(event) =>
                                    setFullName(event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Descrição *</Typography>
                            <TextField
                                error={!description}
                                sx={{ width: "100%" }}
                                multiline
                                rows={2}
                                size={"small"}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} spacing={2}>
                        <Grid item xs={6}>
                            <Typography>Telefone *</Typography>
                            <MuiTelInput
                                error={!phone}
                                value={phone}
                                onChange={(value) => setPhone(value)}
                                sx={{ width: "100%" }}
                                placeholder="00 00000 0000"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Categorias *</Typography>
                            <CustomMultipleSelect
                                error={!selectedCategory.length}
                                options={category}
                                onChange={(category: string[]) =>
                                    setSelectedCategory(category)
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Dias *</Typography>
                            <CustomMultipleSelect
                                error={!selectedDays.length}
                                options={weekDays}
                                onChange={(days: string[]) =>
                                    setSelectedDays(days)
                                }
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>Abertura *</Typography>
                            <TextField
                                error={!startTime}
                                sx={{ width: "100%" }}
                                onChange={(event) =>
                                    setStartTime(event.target.value)
                                }
                                placeholder="00:00"
                                type="time"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>Fechamento *</Typography>
                            <TextField
                                error={!endTime}
                                sx={{ width: "100%" }}
                                onChange={(event) =>
                                    setEndTime(event.target.value)
                                }
                                placeholder="00:00"
                                type="time"
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>Localização *</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={9}>
                                <TextField
                                    error={!street}
                                    sx={{ width: "100%" }}
                                    onChange={(event) =>
                                        setStreet(event.target.value)
                                    }
                                    placeholder="Rua"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    error={!number}
                                    sx={{ width: "100%" }}
                                    onChange={(event) =>
                                        setNumber(event.target.value)
                                    }
                                    placeholder="Nº"
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    error={!neighborhood}
                                    sx={{ width: "100%" }}
                                    onChange={(event) =>
                                        setNeighborhood(event.target.value)
                                    }
                                    placeholder="Bairro"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    error={!city}
                                    sx={{ width: "100%" }}
                                    onChange={(event) =>
                                        setCity(event.target.value)
                                    }
                                    placeholder="Cidade"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    error={!state}
                                    sx={{ width: "100%" }}
                                    onChange={(event) =>
                                        setState(event.target.value)
                                    }
                                    placeholder="UF"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Box
                            sx={{
                                display: "flex",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <Tooltip
                                title={
                                    unfilledInputs &&
                                    "Campo obrigatório vazio ou preenchido incorretamente."
                                }
                                placement={"top"}
                            >
                                <span
                                    style={{
                                        alignSelf: "flex-end",
                                        marginLeft: "auto",
                                    }}
                                >
                                    <LoadingButton
                                        variant="contained"
                                        loading={loading}
                                        disabled={unfilledInputs}
                                        onClick={() =>
                                            requestHttp(REGISTER_REQUEST, {
                                                type: COMPANY,
                                                email,
                                                password,
                                                name: fullName,
                                                description,
                                                phone,
                                                category: selectedCategory,
                                                workDays: selectedDays,
                                                startTime,
                                                endTime,
                                                street,
                                                homeNumber: number,
                                                neighborhood,
                                                city,
                                                state,
                                                ...imageData,
                                            })
                                        }
                                    >
                                        Cadastrar
                                    </LoadingButton>
                                </span>
                            </Tooltip>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

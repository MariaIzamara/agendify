"use client";
import { RegisterContext } from "@/context/RegisterContext";
import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    Radio,
    RadioGroup,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRouter } from "next/navigation";
import { ReactNode, useContext, useState } from "react";
import { emailRegex, validatePassword } from "./utils";

export default function RegisterDefault() {
    const theme = useTheme();
    const router = useRouter();
    const context = useContext(RegisterContext);

    const { setEmail, setPassword } = context;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const [option, setOption] = useState<string>("");
    const [email, setEmailState] = useState<string>("");
    const [password, setPasswordState] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [invalidPassword, validParams] = validatePassword(
        password,
        confirmPassword
    );

    const unfilledInputs =
        option === "" || !emailRegex.test(email) || invalidPassword;

    const handleContinueButton = () => {
        setEmail(email);
        setPassword(password);
        router.push(`register/${option}`);
    };

    const renderPasswordRequirements = (
        text: string,
        valid: boolean
    ): ReactNode => (
        <Typography
            sx={{
                color: valid
                    ? theme.palette.success.light
                    : theme.palette.error.light,
            }}
        >
            {(valid ? "✓ " : "✗ ") + text}
        </Typography>
    );

    const changeVisibilityPassword = () => setShowPassword(!showPassword)
    const changeVisibilityConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

    return (
        <Container
            disableGutters
            maxWidth={false}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "fit-content",
                rowGap: "40px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
        >
            <Typography
                sx={{
                    width: 640,
                    height: 72,
                    fontSize: 32,
                    fontWeight: 400,
                    textAlign: "center",
                    borderBlockEnd: "1px solid " + theme.palette.primary.main,
                }}
            >
                Crie a sua conta
            </Typography>
            <Grid
                container
                spacing={1}
                sx={{
                    alignSelf: "center",
                    width: 1400,
                }}
            >
                <Grid item xs={4} />
                <Grid item xs={4} sx={{}}>
                    <Container
                        disableGutters
                        sx={{
                            width: 400,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            rowGap: "20px",
                        }}
                    >
                        <FormControl
                            sx={{
                                alignSelf: "flex-start",
                            }}
                        >
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={(event) =>
                                    setOption(event.target.value)
                                }
                            >
                                <FormControlLabel
                                    value="client"
                                    control={<Radio />}
                                    label="Cliente"
                                />
                                <FormControlLabel
                                    value="company"
                                    control={<Radio />}
                                    label="Empresa"
                                />
                            </RadioGroup>
                        </FormControl>
                        <Box>
                            <Typography>E-mail *</Typography>
                            <TextField
                                error={!emailRegex.test(email)}
                                sx={{ width: 400 }}
                                onChange={(event) =>
                                    setEmailState(event.target.value)
                                }
                            />
                        </Box>
                        <Box>
                            <Typography>Senha *</Typography>
                            <TextField
                                error={validParams.slice(0,5).includes(false)}
                                sx={{ width: 400 }}
                                type={showPassword ? "text" :"password"}
                                onChange={(event) =>
                                    setPasswordState(event.target.value)
                                }
                                InputProps={ {
                                    endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        sx={{
                                            padding: 0,
                                            backgroundColor: "transparent",
                                            '&:hover': { backgroundColor: "transparent", color: "#353a3d" } 
                                        }   
                                        }                               
                                        aria-label="toggle password visibility"
                                        onClick={changeVisibilityPassword}
                                      >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                      </IconButton> 
                                    </InputAdornment>
                                      ),
                                }
                                  }
                            />
                        </Box>
                        <Box>
                            <Typography>Confirmar Senha *</Typography>
                            <TextField
                                error={!validParams[5]}
                                sx={{ width: 400 }}
                                type={showConfirmPassword ? "text" :"password"}
                                onChange={(event) =>
                                    setConfirmPassword(event.target.value)
                                }
                                InputProps={ {
                                    endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        sx={{
                                            padding: 0,
                                            backgroundColor: "transparent",
                                            '&:hover': { backgroundColor: "transparent", color: "#353a3d" } 
                                        }   
                                        }                               
                                        aria-label="toggle password visibility"
                                        onClick={changeVisibilityConfirmPassword}
                                      >
                                        {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                      </IconButton> 
                                    </InputAdornment>
                                      ),
                                }
                                  }
                            />
                        </Box>
                        <Box sx={{ alignSelf: "flex-end" }}>
                            <Tooltip
                                title={
                                    unfilledInputs &&
                                    "Campo obrigatório vazio ou preenchido incorretamente"
                                }
                                placement={"top"}
                            >
                                <span>
                                    <Button
                                        variant="contained"
                                        disabled={unfilledInputs}
                                        onClick={() => handleContinueButton()}
                                    >
                                        Continuar
                                    </Button>
                                </span>
                            </Tooltip>
                        </Box>
                        <Typography>
                            Já tem uma conta?{" "}
                            <Link
                                color="primary"
                                underline="hover"
                                onClick={() => router.push("/login")}
                                sx={{cursor: "pointer"}}
                            >
                                Entrar
                            </Link>
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={4} sx={{ display: "flex" }}>
                    <Box sx={{ alignSelf: "center" }}>
                        <Typography>Sua senha necessita de:</Typography>
                        {renderPasswordRequirements(
                            "Pelo menos oito caracteres",
                            validParams[0]
                        )}
                        {renderPasswordRequirements(
                            "Pelo menos uma letra maiúscula",
                            validParams[1]
                        )}
                        {renderPasswordRequirements(
                            "Pelo menos uma letra minúscula",
                            validParams[2]
                        )}
                        {renderPasswordRequirements(
                            "Pelo menos um número",
                            validParams[3]
                        )}
                        {renderPasswordRequirements(
                            "Pelo menos um caractere especial",
                            validParams[4]
                        )}
                        {renderPasswordRequirements(
                            "Ser a mesma da confirmação",
                            validParams[5]
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

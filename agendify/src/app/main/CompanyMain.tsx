import ConfirmationModal from "@/components/ConfirmationModal";
import ScheduleCard from "@/components/ScheduleCard";
import { AuthContext } from "@/context/AuthContext";
import useHttp from "@/hooks/useHttp";
import {
    SERVICE_CREATE_REQUEST,
    SERVICE_DELETE_REQUEST,
    USER_SERVICES_REQUEST,
} from "@/utils/requests";
import { LoadingButton } from "@mui/lab";
import {
    Box,
    CircularProgress,
    Container,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import { ReactNode, useContext, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { timeToMin } from "./utils";

export default function CompanyMain() {
    const theme = useTheme();
    const context = useContext(AuthContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [value, setValue] = useState("");
    const [cancelService, setCancelService] = useState<Service | null>(null);
    const [services, setServices] = useState<Service[]>([]);

    const { loading, requestHttp } = useHttp();
    const {
        loading: pageLoading,
        data: pageData,
        requestHttp: pageRequestHttp,
    } = useHttp();

    useEffect(() => {
        pageRequestHttp(USER_SERVICES_REQUEST, {}, context.token);
    }, []);

    useEffect(() => {
        if (pageData) {
            setServices(pageData);
        }
    }, [pageData]);

    const handleDelete = (service: Service) => {
        setCancelService(service);
    };

    const deleteService = () => {
        if (!cancelService) return;
        requestHttp(
            SERVICE_DELETE_REQUEST,
            {
                serviceId: cancelService.id,
            },
            context.token
        );
        setTimeout(
            () => pageRequestHttp(USER_SERVICES_REQUEST, {}, context.token),
            1000
        );
        setCancelService(null);
    };

    const handleCreateService = () => {
        requestHttp(
            SERVICE_CREATE_REQUEST,
            {
                name: name,
                description: description,
                duration: timeToMin(duration),
                cost: parseFloat(value),
            },
            context.token
        );
        setName("");
        setDescription("");
        setDuration("");
        setValue("");
        setTimeout(
            () => pageRequestHttp(USER_SERVICES_REQUEST, {}, context.token),
            1000
        );
    };

    const renderConfirm = (): ReactNode => (
        <ConfirmationModal
            title={cancelService ? "Cancelar: " + cancelService.name : ""}
            subtitle={
                cancelService
                    ? cancelService.date +
                      " - " +
                      cancelService.time +
                      "\nR$ " +
                      cancelService.cost.toFixed(2)
                    : ""
            }
            onConfirm={deleteService}
            onClose={() => setCancelService(null)}
        />
    );

    const enableConfirm =
        (name !== "" && duration !== "" && value !== "") || loading;

    return (
        <>
            {cancelService && renderConfirm()}
            <div className={styles.main_container}>
                <div
                    style={{ borderColor: `${theme.palette.primary.main}` }}
                    className={`${styles.main_item} ${styles.main_form}`}
                >
                    <Typography
                        sx={{
                            alignSelf: "flex-start",
                            fontSize: 20,
                        }}
                    >
                        Cadastros
                    </Typography>
                    <Box sx={{ width: "100%" }}>
                        <Typography sx={{ alignSelf: "flex-start" }}>
                            Serviço *
                        </Typography>
                        <TextField
                            sx={{ width: "100%" }}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <Typography sx={{ alignSelf: "flex-start" }}>
                            Descrição
                        </Typography>
                        <TextField
                            sx={{ width: "100%" }}
                            multiline
                            rows={4}
                            size={"small"}
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                        />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <Typography sx={{ alignSelf: "flex-start" }}>
                            Duração *
                        </Typography>
                        <TextField
                            value={duration}
                            onChange={(event) =>
                                setDuration(event.target.value)
                            }
                            placeholder="00:00"
                            type="time"
                            sx={{ width: "100%" }}
                        />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <Typography sx={{ alignSelf: "flex-start" }}>
                            Valor *
                        </Typography>
                        <TextField
                            value={value}
                            onChange={(event) => setValue(event.target.value)}
                            sx={{ width: "100%" }}
                            placeholder="00,00"
                            type="number"
                        />
                    </Box>
                    <Tooltip
                        title={
                            !enableConfirm &&
                            "Necessário preencher os campos de serviço, duração e valor."
                        }
                        placement="top"
                    >
                        <span>
                            <LoadingButton
                                sx={{ width: "100%" }}
                                variant="contained"
                                loading={loading}
                                disabled={!enableConfirm}
                                onClick={handleCreateService}
                            >
                                Cadastrar
                            </LoadingButton>
                        </span>
                    </Tooltip>
                </div>
                <div
                    style={{ borderColor: `${theme.palette.primary.main}` }}
                    className={`${styles.main_item} ${styles.main_list}`}
                >
                    {pageLoading ? (
                        <Container
                            sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <CircularProgress />
                        </Container>
                    ) : (
                        <div className={styles.main_scroll}>
                            {services &&
                                services.map((service: Service, i) => (
                                    <ScheduleCard
                                        onDelete={handleDelete}
                                        key={service.name + i}
                                        {...service}
                                    />
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

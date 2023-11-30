import { AuthContext } from "@/context/AuthContext";
import useHttp from "@/hooks/useHttp";
import { SERVICES_COMPANY_CHECK } from "@/utils/requests";
import { CancelOutlined } from "@mui/icons-material";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React, { ReactNode, useEffect } from "react";
import CustomSelect from "./CustomSelect";
import InformationModal from "./InformationModal";

type ServiceCardProps = {
    id: number;
    name: string;
    cost: number;
    duration: number;
    description: string;
    onConfirm: (a: Service) => void;
};

export default function ServiceCard({
    id,
    name,
    cost,
    duration,
    description,
    onConfirm,
}: ServiceCardProps) {
    const context = React.useContext(AuthContext);
    const theme = useTheme();
    const [date, setDate] = React.useState<string>();
    const [time, setTime] = React.useState<string>();
    const [error, setError] = React.useState<boolean>(false);
    const [possibleTimes, setPossibleTimes] = React.useState<string[]>([]);

    const { loading, success, data, requestHttp } = useHttp();

    const minDate = new Date();
    const maxDate = new Date(new Date().setDate(minDate.getDate() + 30));

    useEffect(() => {
        if (!data) return;
        setPossibleTimes(data);
    }, [data]);

    useEffect(() => {
        if (!date) return;
        requestHttp(SERVICES_COMPANY_CHECK(id, date), {}, context.token);
    }, [date]);

    const handleConfirm = () => {
        if (!context.token) {
            setError(true);
            return;
        }
        if (!date) return;
        onConfirm({
            id: id,
            name: name,
            cost: cost,
            duration: duration,
            description: description,
            date: date ? date : "",
            time: time ? time : "",
        });
        requestHttp(SERVICES_COMPANY_CHECK(id, date), {}, context.token);
    };

    const renderError = (): ReactNode => (
        <InformationModal
            icon={<CancelOutlined fontSize="medium" />}
            text="Entre com uma conta para confirmar um agendamento."
            backgroundColor={theme.palette.error.main}
            onClose={() => setError(false)}
        />
    );

    return (
        <>
            {error && renderError()}
            <Box
                sx={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "space-between",
                    paddingLeft: "20px",
                    paddingRight: "25px",
                    borderRadius: "10px",
                    "&:hover": {
                        backgroundColor: theme.palette.primary.light + "20",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexFlow: "column",
                    }}
                >
                    <Typography sx={{ fontSize: 24 }}>{name}</Typography>
                    <Typography sx={{ fontSize: 16 }}>
                        {"Duração de " + duration + " minutos"}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }}>{description}</Typography>
                    <Typography>&nbsp;</Typography>
                    <Typography>{"R$ " + cost.toFixed(2)}</Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexFlow: "column",
                        justifyContent: "center",
                        width: "300px",
                        gap: "20px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            gap: "10px",
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem label="Data">
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    disablePast
                                    maxDate={dayjs(maxDate)}
                                    onChange={(value) =>
                                        setDate(value?.format("DD/MM/YY"))
                                    }
                                    sx={{
                                        width: 200,
                                        ".MuiButtonBase-root": {
                                            color: theme.palette.primary.main,
                                            padding: "0 8px",
                                            backgroundColor: "transparent",
                                        },
                                    }}
                                />
                            </DemoItem>
                        </LocalizationProvider>
                        <Box sx={{ width: "100%" }}>
                            <Typography sx={{ alignSelf: "flex-start" }}>
                                Horários
                            </Typography>
                            <CustomSelect
                                disabled={!success}
                                options={possibleTimes}
                                onChange={(time) => setTime(time)}
                            />
                        </Box>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleConfirm}
                        disabled={!(date && time)}
                    >
                        Agendar
                    </Button>
                </Box>
            </Box>
        </>
    );
}

import { AuthContext } from "@/context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { usePathname } from "next/navigation";
import { useContext } from "react";

type ScheduleCardProps = {
    id: number;
    name: string;
    cost: number;
    duration: number;
    description: string;
    date: string;
    time: string;
    customerName?: string;
    customerPhone?: string;
    onDelete: (a: Service) => void;
};

export default function ScheduleCard({
    id,
    name,
    cost,
    duration,
    description,
    date,
    time,
    customerName,
    customerPhone,
    onDelete,
}: ScheduleCardProps) {
    const pathname = usePathname();
    const theme = useTheme();
    const context = useContext(AuthContext);

    const handleDelete = () => {
        onDelete({
            id: id,
            name: name,
            cost: cost,
            duration: duration,
            description: description,
            date: date ? date : "",
            time: time ? time : "",
        });
    };

    const customerData =
        context.userType === "COMPANY" && pathname === "/schedules"
            ? customerName &&
              customerPhone &&
              " (" + customerName + ", " + customerPhone + ")"
            : "";

    return (
        <Box
            sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "start",
                padding: "15px",
                borderRadius: "10px",
                "&:hover": {
                    backgroundColor: theme.palette.primary.light + "20",
                },
            }}
        >
            <IconButton
                component="label"
                sx={{
                    width: 130,
                    height: 130,
                    border: "1px solid",
                    borderColor: `${theme.palette.primary.main}`,
                    backgroundColor: "#FFCFCF",
                    "&:hover": {
                        backgroundColor: "#FFCFCF99",
                    },
                }}
                onClick={handleDelete}
            >
                <DeleteIcon fontSize="large" />
            </IconButton>
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
                <Typography sx={{ fontSize: 14 }}>
                    {description + (customerData && customerData)}
                </Typography>
                <Typography sx={{ fontSize: 14 }}>
                    {date ? date + " - " + time : <>&nbsp;</>}
                </Typography>
                <Typography>{"R$ " + cost.toFixed(2)}</Typography>
            </Box>
        </Box>
    );
}

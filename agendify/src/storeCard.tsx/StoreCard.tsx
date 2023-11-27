import { Box, Typography } from "@mui/material";
import styles from "./index.module.scss";

type StoreCardProps = {
    image: string;
    name: string;
    category: string[];
    description: string;
    workDays: string[];
    startTime: string;
    endTime: string;
    street: string;
    homeNumber: string;
    neighborhood: string;
    state: string;
    city: string;
    onClick?: () => {};
};

export default function StoreCard({
    image,
    name,
    category,
    description,
    workDays,
    startTime,
    endTime,
    street,
    homeNumber,
    neighborhood,
    state,
    city,
    onClick,
}: StoreCardProps) {
    return (
        <Box
            sx={{
                display: "flex",
                gap: "10px",
            }}
            onClick={onClick}
        >
            <img src={image} alt={name} className={styles.store_card_img} />
            <Box
                sx={{
                    display: "flex",
                    flexFlow: "column",
                    gap: "6px",
                }}
            >
                <Typography sx={{ fontSize: 24 }}>{name}</Typography>
                <Typography sx={{ fontSize: 16 }}>
                    {category.join(", ")}
                </Typography>
                <Typography sx={{ fontSize: 14 }}>{description}</Typography>
                <Typography sx={{ fontSize: 14 }}>
                    {workDays.join(", ") + " - " + startTime + " às " + endTime}
                </Typography>
                <Typography sx={{ fontSize: 14 }}>
                    {[street, homeNumber, neighborhood, city, state].join(", ")}
                </Typography>
            </Box>
        </Box>
    );
}

import { Box, Modal, Typography, useTheme } from "@mui/material";
import { ReactNode, useState } from "react";

export default function InformationModal({
    icon,
    text,
    backgroundColor,
    onClose,
}: {
    icon: ReactNode;
    text: string;
    backgroundColor: string;
    onClose?: () => void;
}): ReactNode {
    const theme = useTheme();

    const [open, setOpen] = useState<boolean>(true);

    const handleClose = () => {
        setOpen(false);
        onClose && onClose();
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    padding: "24px 32px",
                    boxShadow: 24,
                    borderRadius: 4,
                    color: theme.palette.primary.contrastText,
                    backgroundColor: backgroundColor,
                }}
            >
                {icon}
                <Typography
                    sx={{
                        fontSize: 16,
                        fontWeight: 400,
                    }}
                >
                    {text}
                </Typography>
            </Box>
        </Modal>
    );
}

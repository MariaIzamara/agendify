import { CompanyContext } from "@/context/CompanyContext";
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function CompanyCard({
    button,
    company,
}: {
    button?: boolean;
    company: CompanyType;
}) {
    const router = useRouter();
    const context = useContext(CompanyContext);

    const { setCompany } = context;

    const {
        imageData,
        name,
        category,
        description,
        workDays,
        startTime,
        endTime,
        street,
        homeNumber,
        neighborhood,
        city,
        state,
    } = company;

    const renderListItem = () => (
        <>
            <ListItemAvatar>
                <Avatar
                    src={imageData}
                    alt={name}
                    variant="rounded"
                    sx={{ width: 144, height: 144 }}
                />
            </ListItemAvatar>
            <ListItemText
                secondary={
                    <>
                        <Typography sx={{ fontSize: 24 }}>{name}</Typography>
                        <Typography sx={{ fontSize: 16 }}>
                            {category.join(", ")}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                            {description}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                            {workDays.join(", ")}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                            {startTime + " às " + endTime}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                            {[
                                street,
                                homeNumber,
                                neighborhood,
                                city,
                                state,
                            ].join(", ")}
                        </Typography>
                    </>
                }
            />
        </>
    );

    return button ? (
        <ListItemButton
            divider
            sx={{ gap: "16px" }}
            onClick={() => {
                setCompany(company);
                router.push("/main/services");
            }}
        >
            {renderListItem()}
        </ListItemButton>
    ) : (
        <ListItem sx={{ gap: "16px" }}>{renderListItem()}</ListItem>
    );
}

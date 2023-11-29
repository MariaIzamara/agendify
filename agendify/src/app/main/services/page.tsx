"use client";
import CompanyCard from "@/components/CompanyCard";
import ConfirmationModal from "@/components/ConfirmationModal";
import ServiceCard from "@/components/ServiceCard";
import { CompanyContext } from "@/context/CompanyContext";
import useHttp from "@/hooks/useHttp";
import { SERVICES_COMPANY_REQUEST, USER_RESERVATION_CREATE } from "@/utils/requests";
import { CircularProgress, Container, useTheme } from "@mui/material";
import { ReactNode, useContext, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { AuthContext } from "@/context/AuthContext";
import InformationModal from "@/components/InformationModal";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Login() {
    const theme = useTheme();
    const context = useContext(CompanyContext);
    const authContext = useContext(AuthContext);

    const {
        email,
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
    } = context;

    const company: CompanyType = {
        email,
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
    };

    const [confirmService, setConfirmService] = useState<Service | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const { requestHttp } = useHttp();
    const { loading, data, requestHttp: contentRequestHttp } = useHttp();

    useEffect(() => {
        contentRequestHttp(SERVICES_COMPANY_REQUEST(email), {});
    }, []);

    const handleConfirm = (service: Service) => {
        setConfirmService(service);
    };

    const commitConfirmService = () => {
        if(!confirmService) return;
        requestHttp(USER_RESERVATION_CREATE, {
            serviceId: confirmService.id,
            time: confirmService.time,
            date: confirmService.date,
        }, authContext.token);
        setConfirmService(null);
        setSuccess(true);
    }

    const renderConfirm = (): ReactNode => (
        <ConfirmationModal
            title={confirmService ? confirmService.name : ""}
            subtitle={
                confirmService
                    ? confirmService.date +
                      " - " +
                      confirmService.time +
                      "\nR$ " +
                      confirmService.cost.toFixed(2)
                    : ""
            }
            onConfirm={commitConfirmService}
            onClose={() => setConfirmService(null)}
        />
    );

    const renderSuccess = (): ReactNode => (
        <InformationModal
            icon={<CheckCircleOutlineIcon fontSize="medium" />}
            text="Agendamento realizado com sucesso!"
            backgroundColor={theme.palette.success.light}
            onClose={() => setSuccess(false)}
        />
    );

    return (
        <>
            {confirmService && renderConfirm()}
            {success && renderSuccess()}
            <div className={styles.main_container}>
                <CompanyCard company={company} />
                <div
                    className={styles.services_container}
                    style={{ borderColor: `${theme.palette.primary.main}` }}
                >
                    {loading ? (
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
                            {data && data.length && 
                                data.map((service: any, i: number) => (
                                    <ServiceCard
                                        onConfirm={handleConfirm}
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

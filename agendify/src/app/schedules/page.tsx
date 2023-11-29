"use client";
import { CircularProgress, Container, useTheme } from "@mui/material";
import styles from "./index.module.scss"
import ScheduleCard from "@/components/ScheduleCard";
import ConfirmationModal from "@/components/ConfirmationModal";
import { ReactNode, useContext, useEffect, useState } from "react";
import useHttp from "@/hooks/useHttp";
import { USER_RESERVATIONS_REQUEST, USER_RESERVATIONS_REQUEST_DELETE } from "@/utils/requests";
import { AuthContext } from "@/context/AuthContext";

export default function Schedules() {
    
    const theme = useTheme();
    const context = useContext(AuthContext);
    const { loading, data, requestHttp: pageRequestHttp  } = useHttp();
    const { requestHttp } = useHttp();
    const [cancelService, setCancelService] = useState<Service | null>(null);
    const [reservations, setReservations] = useState<Service[]>();

    useEffect(() => {
        pageRequestHttp(USER_RESERVATIONS_REQUEST, {}, context.token);
    }, [])

    useEffect(() => {
        if(data){
            context.userType === "COMPANY" ?
            setReservations(data.map((reservation: any):Service => ({
                id: reservation.id,
                name: reservation.service.name,
                cost: reservation.service.cost,
                duration: reservation.service.duration,
                description: reservation.service.description,
                date: reservation.date,
                time: reservation.start,
                customerName: reservation.user.name,
                customerPhone: reservation.user.phone,
            }))) :
            setReservations(data.map((reservation: any):Service => ({
                id: reservation.id,
                name: reservation.service.name,
                cost: reservation.service.cost,
                duration: reservation.service.duration,
                description: reservation.service.description,
                date: reservation.date,
                time: reservation.start,
            }))) 
            ;
        }
    }, [loading, data])

    const handleConfirm = (service:Service) => {
        setCancelService(service);
    }

    const deleteSchedule = () => {
        if(cancelService) {
            requestHttp(USER_RESERVATIONS_REQUEST_DELETE, {
                "reservationId": cancelService.id
            }, context.token);
        }
        setTimeout(() => pageRequestHttp(USER_RESERVATIONS_REQUEST, {}, context.token), 1000)
        setCancelService(null)
    }
    
    const renderConfirm = (): ReactNode => (
        <ConfirmationModal
            title={cancelService ? "Cancelar: " + cancelService.name : ""}
            subtitle={cancelService ? cancelService.date + " - " + cancelService.time + "\nR$ " + cancelService.cost.toFixed(2) : ""}
            onConfirm={deleteSchedule}
            onClose={() => setCancelService(null)}
        />
    );

    return (
        <>
            {cancelService && renderConfirm()}
            <div className={styles.main_container} style={{borderColor: `${theme.palette.primary.main}`}}>
                
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
                ):
                <div className={styles.main_scroll}>
                    {reservations && 
                     reservations.map((schedule, i) => (
                        <ScheduleCard
                            key={schedule.name + i}
                            onDelete={handleConfirm}
                            {...schedule}
                        />
                    ))}
                </div>
                }
            </div>
        </>
    )
}

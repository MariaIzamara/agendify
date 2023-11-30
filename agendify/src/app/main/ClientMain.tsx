import CompanyCard from "@/components/CompanyCard";
import CustomMultipleSelect from "@/components/CustomMultipleSelect";
import useHttp from "@/hooks/useHttp";
import { COMPANIES_REQUEST } from "@/utils/requests";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    List,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { mountFilter, parseHour } from "./utils";

export default function ClientMain() {
    const theme = useTheme();

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [companies, setCompanies] = useState<CompanyType[]>();
    const [categories, setCategories] = useState<string[]>([]);
    const [states, setStates] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);
    const [statesSelected, setStatesSelected] = useState<string[]>([]);
    const [citiesSelected, setCitiesSelected] = useState<string[]>([]);

    const { loading, data, requestHttp } = useHttp();

    useEffect(() => {
        requestHttp(COMPANIES_REQUEST, {});
    }, []);

    useEffect(() => {
        if (data) {
            setCompanies(data);
            const { categoriesFilter, statesFilter, citiesFilter } =
                mountFilter(data);
            setCategories(categoriesFilter);
            setStates(statesFilter);
            setCities(citiesFilter);
        }
    }, [data]);

    const filterCompanies = () => {
        setCompanies(
            data &&
                data.filter(
                    (c: any) =>
                        (categoriesSelected.length
                            ? c.category.filter((cat: any) =>
                                  categoriesSelected.includes(cat)
                              ).length > 0
                            : true) &&
                        (startTime != "" && endTime != ""
                            ? parseHour(startTime) <= parseHour(c.endTime) &&
                              parseHour(endTime) >= parseHour(c.startTime)
                            : true) &&
                        (statesSelected.length
                            ? statesSelected.includes(c.state)
                            : true) &&
                        (citiesSelected.length
                            ? citiesSelected.includes(c.city)
                            : true)
                )
        );
    };

    return (
        <Container
            disableGutters
            sx={{
                height: "100%",
                display: "flex",
                padding: "32px 0px",
                gap: "24px",
            }}
        >
            <Container
                maxWidth={false}
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    borderRadius: 8,
                    border: `1px solid ${theme.palette.primary.main}`,
                    maxWidth: 300,
                }}
            >
                <Typography sx={{ fontSize: 24 }}>Filtros</Typography>
                <Box sx={{ width: "100%" }}>
                    <Typography sx={{ alignSelf: "flex-start" }}>
                        Categorias
                    </Typography>
                    <CustomMultipleSelect
                        disabled={loading}
                        options={categories}
                        onChange={(category: string[]) =>
                            setCategoriesSelected(category)
                        }
                    />
                </Box>
                <Box sx={{ width: "100%" }}>
                    <Typography sx={{ alignSelf: "flex-start" }}>
                        Horários
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <TextField
                            onChange={(event) =>
                                setStartTime(event.target.value)
                            }
                            placeholder="00:00"
                            type="time"
                        />
                        <Typography>às</Typography>
                        <TextField
                            onChange={(event) => setEndTime(event.target.value)}
                            placeholder="00:00"
                            type="time"
                        />
                    </Box>
                </Box>
                <Box sx={{ width: "100%" }}>
                    <Typography sx={{ alignSelf: "flex-start" }}>
                        Estado
                    </Typography>
                    <CustomMultipleSelect
                        disabled={loading}
                        options={states}
                        onChange={(states: string[]) =>
                            setStatesSelected(states)
                        }
                    />
                </Box>
                <Box sx={{ width: "100%" }}>
                    <Typography sx={{ alignSelf: "flex-start" }}>
                        Cidade
                    </Typography>
                    <CustomMultipleSelect
                        disabled={loading}
                        options={cities}
                        onChange={(cities: string[]) =>
                            setCitiesSelected(cities)
                        }
                    />
                </Box>
                <Button
                    variant="contained"
                    disabled={loading}
                    onClick={filterCompanies}
                >
                    Aplicar
                </Button>
            </Container>
            <Container
                sx={{
                    height: "100%",
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: 8,
                    padding: "8px", 
                }}
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
                    <Container
                        sx={{
                            height: "100%",
                            overflowY: "auto",
                        }}
                    >
                        <List>
                            {companies &&
                                companies.map((store: CompanyType) => (
                                    <CompanyCard
                                        key={store.email}
                                        button={true}
                                        company={store}
                                    />
                                ))}
                        </List>
                    </Container>
                )}
            </Container>
        </Container>
    );
}

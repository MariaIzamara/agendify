"use client";
import { useReducer } from "react";
import { CompanyContext } from "./CompanyContext";

const ID = "COMPANY";

const INITIAL_STATE: CompanyType = {
    email: "",
    imageData: "",
    name: "",
    category: [],
    description: "",
    workDays: [],
    startTime: "",
    endTime: "",
    street: "",
    homeNumber: "",
    neighborhood: "",
    state: "",
    city: "",
};

const SET_COMPANY = `SET_COMPANY_${ID}`;

export default function CompanyProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const {
        email,
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
        state: x,
        city,
    } = state;

    const setCompany = (value: CompanyType) =>
        dispatch({ type: SET_COMPANY, value });

    const context: Company = {
        email,
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
        state: x,
        city,
        setCompany,
    };

    return (
        <CompanyContext.Provider value={context}>
            {children}
        </CompanyContext.Provider>
    );
}

const reducer = (state: CompanyType, action: Action) => {
    const { type, value } = action;
    switch (type) {
        case SET_COMPANY:
            return { ...state, ...value };
        default:
            return { ...INITIAL_STATE };
    }
};

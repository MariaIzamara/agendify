type Action = {
    type: string;
    value?: any;
};

type AuthType = {
    token: string;
    userType: string;
    name: string;
};

type Auth = Pick<AuthType, "token" | "userType" | "name"> & {
    setToken: Function;
    setUserType: Function;
    setName: Function;
    clear: Function;
};

type RegisterType = {
    email: string;
    password: string;
};

type Register = Pick<RegisterType, "email" | "password"> & {
    setEmail: Function;
    setPassword: Function;
};

type AccessibilityType = {
    mode: "light" | "dark";
    zoom: number;
};

type Accessibility = Pick<AccessibilityType, "mode" | "zoom"> & {
    setMode: Function;
    setZoom: Function;
};

type Service = {
    id: number;
    name: string;
    cost: number;
    duration: number;
    description: string;
    date: string;
    time: string;
    customerName?: string;
    customerPhone?: string;
};

type CompanyType = {
    email: string;
    imageData: string;
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
};

type Company = Pick<
    CompanyType,
    | "email"
    | "imageData"
    | "name"
    | "category"
    | "description"
    | "workDays"
    | "startTime"
    | "endTime"
    | "street"
    | "homeNumber"
    | "neighborhood"
    | "state"
    | "city"
> & {
    setCompany: Function;
};

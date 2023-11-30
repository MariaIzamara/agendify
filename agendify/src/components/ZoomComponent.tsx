"use client";
import { AccessibilityContext } from "@/context/AccessibilityContext";
import { Container } from "@mui/material";
import { ReactNode, useContext } from "react";

export default function ZoomComponent({ children }: { children: ReactNode }) {
    const accessibilityContext = useContext(AccessibilityContext);

    const { zoom } = accessibilityContext;

    return (
        <div style={{ zoom: `${zoom}%` }}>
            {children}
        </div> 
    );
}

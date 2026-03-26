import {ReactNode} from "react";
import "./globals.css";
import RootLayout from "@/layout/RootLayout";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({children}: LayoutProps) {
    return (
        <RootLayout>
            {children}
        </RootLayout>
    );
}

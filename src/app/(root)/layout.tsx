import "../globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "react-datepicker/dist/react-datepicker.css";

// import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TLCCRM",
    description: "The Lord's Chosen Charismatic Revival Movement",
    icons: {
        icon: "/assets/images/logo.svg"
    }
};

export default function RootLayout({
    children
}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
           
                <body className={`${inter.className} bg-dark-2`}>
                    {/*<Toaster />*/}
                    {children}
                </body>
        
        </html>
    );
}

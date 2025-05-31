import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Syllabusy",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            style={{ colorScheme: "dark", backgroundColor: "#060606" }}
        >
            <body>{children}</body>
        </html>
    );
}

import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

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
            <body>
                <Nav />
                {children}
                <Footer />
            </body>
        </html>
    );
}

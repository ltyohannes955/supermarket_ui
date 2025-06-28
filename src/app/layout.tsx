"use client";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "./store/store";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const theme = createTheme({
  primaryColor: "customRed",
  fontFamily: "Inter, sans-serif",
  colors: {
    customRed: [
      "#ffe5e6",
      "#fab3b5",
      "#f58084",
      "#f14f55",
      "#ed2b32",
      "#e92933",
      "#c2202b",
      "#9b1823",
      "#75111b",
      "#4f0912",
    ],
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Provider store={store}>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </Provider>
      </body>
    </html>
  );
}

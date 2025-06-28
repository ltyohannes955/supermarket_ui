import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  primaryColor: "customRed",
  colors: {
    customRed: [
      "#ffe5e6", // 0
      "#fab3b5", // 1
      "#f58084", // 2
      "#f14f55", // 3
      "#ed2b32", // 4 <- darker version
      "#e92933", // 5 <- base color
      "#c2202b", // 6
      "#9b1823", // 7
      "#75111b", // 8
      "#4f0912", // 9
    ],
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}

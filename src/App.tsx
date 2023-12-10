import { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";

import { Root } from "./components/Root";
import { GlobalStyle, theme } from "./styles";

import "line-awesome/dist/line-awesome/css/line-awesome.min.css";


const queryClient = new QueryClient();

export const App: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Root />
            </ThemeProvider>
        </QueryClientProvider>
    );
};

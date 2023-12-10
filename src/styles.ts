import { createGlobalStyle, css, DefaultTheme } from "styled-components";


export const GlobalStyle = createGlobalStyle`
    :root {
        --font-family: Figtree, Roboto, Rubik, Noto Kufi Arabic, Noto Sans JP, sans-serif;
    }

    * {
        box-sizing: border-box;

        &:not(i):not(em) {
            font-family: var(--font-family);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    }

    html, body, #root {
        width: 100%;
        height: 100%;
    }

    body {
        margin: 0;
    }
`;

export const theme: DefaultTheme = {
    color: {
        text: {
            primary: "#272727",
            secondary: "#818181"
        },
        background: {
            rest: "#feffff",
            hover: "#dcdcdc",
            active: "#ffe390",
            active2: "#ffd52e"
        },
        border: "#e6e6e6"
    }
};

export const inputBaseCss = css`
    width: 100%;
    border: 1px solid ${p => p.theme.color.background.hover};
    border-radius: 8px;
    padding: 8px 16px;
    outline: none;

    &:focus,
    &:active {
        border: 2px solid ${p => p.theme.color.background.active2};
    }
`;

export const trimCss = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

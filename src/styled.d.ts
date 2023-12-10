import "styled-components";


declare module "styled-components" {
    export interface DefaultTheme {
        color: {
            text: {
                primary: string;
                secondary: string;
            },
            background: {
                rest: string;
                hover: string;
                active: string;
                active2: string;
            };
            border: string;
        };
    }
}

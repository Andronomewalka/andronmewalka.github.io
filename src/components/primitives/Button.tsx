import { FC, HTMLAttributes } from "react";
import styled from "styled-components";


type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
    text: string;
};

export const Button: FC<ButtonProps> = ({ text, ...rest }) => {
    return (
        <ButtonWrapper {...rest}>
            {text}
        </ButtonWrapper>
    );
};

const ButtonWrapper = styled.button`
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    background-color: ${p => p.theme.color.background.active};

    &:hover {
        background-color: ${p => p.theme.color.background.hover};
    }

    &:active {
        background-color: ${p => p.theme.color.background.active2};
    }
`;

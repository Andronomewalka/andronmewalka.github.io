import { FC, HTMLAttributes } from "react";
import styled from "styled-components";

import { cx } from "../../utils";


type IconButtonProps = HTMLAttributes<HTMLButtonElement> & {
    icon: string;
};

export const IconButton: FC<IconButtonProps> = ({ icon, ...rest }) => {
    const className = cx("las", icon);

    return (
        <IconButtonWrapper {...rest}>
            <i className={className}></i>
        </IconButtonWrapper>
    );
};

const IconButtonWrapper = styled.button`
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    background-color: transparent;
    box-sizing: border-box;

    i {
        font-size: 20px;
    }

    &:hover {
        background-color: ${p => p.theme.color.background.hover};
    }

    &:active {
        background-color: ${p => p.theme.color.background.active2};
    }
`;

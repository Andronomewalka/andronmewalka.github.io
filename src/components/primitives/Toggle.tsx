import { ChangeEvent, FC, } from "react";
import styled from "styled-components";


type ToggleProps = {
    checked?: boolean;
    label?: string;
    onChange?: (value: boolean) => void;
};

export const Toggle: FC<ToggleProps> = ({ checked, label, onChange }) => {
    const onChangeInner = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.checked);
    };

    return (
        <ToggleContainer>
            <ToggleInner>
                <ToggleCheckbox type="checkbox" checked={checked} onChange={onChangeInner} />
                <ToggleSlider />
            </ToggleInner>
            {label && <span>{label}</span>}
        </ToggleContainer>
    );
};

const ToggleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-size: 14px;
`;

const ToggleInner = styled.label`
    position: relative;
    display: inline-block;
    width: 42px;
    height: 25px;
`;

const ToggleSlider = styled.span`
    position: absolute;
    cursor: pointer;
    inset: 0;
    background-color: ${p => p.theme.color.background.hover};
    border-radius: 34px;
    transition: .2s;

    &::before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 4px;
        top: 50%;
        transform: translateY(-50%);
        background-color: ${p => p.theme.color.background.rest};
        border-radius: 50%;
        transition: .2s;
    }
`;

const ToggleCheckbox = styled.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + ${ToggleSlider} {
      background-color: ${p => p.theme.color.background.active2};
    }
    
    &:focus + ${ToggleSlider} {
      box-shadow: 0 0 1px ${p => p.theme.color.background.active2};
    }

    &:checked + ${ToggleSlider}::before {
      transform: translate(16px, -50%);
    }
`;

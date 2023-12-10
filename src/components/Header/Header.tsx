import { FC } from "react";
import styled from "styled-components";

import { HeaderCreateNote } from "./HeaderCreateNote";
import { HeaderNoteTabs } from "./HeaderNoteTabs";
import { HeaderSearch } from "./HeaderSearch";


export const Header: FC = () => {
    return (
        <HeaderWrapper>
            <HeaderCreateNote />
            <HeaderSearch />
            <HeaderNoteTabs />
        </HeaderWrapper>
    );
};


const HeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    gap: 8px;
`;

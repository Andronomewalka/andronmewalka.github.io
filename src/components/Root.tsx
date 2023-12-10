import { FC } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { Header } from "./Header/Header";
import { NotesList } from "./NotesList/NotesList";
import { useQueryNotes } from "../hooks/useQueryNotes";
import { NoNotes } from "./NoNotes";


export const Root: FC = () => {
    const { notes, isFetched } = useQueryNotes();

    if (!isFetched) {
        return null;
    }

    return (
        <RootWrapper>
            {!notes?.length ?
                <NoNotes /> :
                <>
                    <Nav>
                        <NotesList />
                    </Nav>
                    <Divider />
                    <Main>
                        <Header />
                        <Content>
                            <Outlet />
                        </Content>
                    </Main>
                </>
            }
        </RootWrapper>
    );
};

const RootWrapper = styled.main`
    display: flex;
    width: 100%;
    height: 100%;
    color: ${p => p.theme.color.text.primary};
    background-color: ${p => p.theme.color.background.rest};
`;

const Nav = styled.nav`
    padding: 10px;
`;

const Divider = styled.div`
    width: 1px;
    height: 100%;
    background-color: ${p => p.theme.color.border};
`;

const Main = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 16px;
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    max-width: 960px;
    margin: 0 auto;
`;

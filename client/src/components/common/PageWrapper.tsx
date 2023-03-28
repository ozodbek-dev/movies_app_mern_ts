import React, { useEffect} from 'react';
import {useAppDispatch} from "../../hooks/reduxHooks";
import {setAppState} from "../../redux/features/appState/app.state.slice";
import {PropsWithChildren} from "react";

type Props = {
    state:string,
    children:JSX.Element
}

const PageWrapper = ({state,children}:Props) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        window.scroll({
            behavior:"smooth",
        })
        window.scrollTo(0,0)
      dispatch(setAppState)
    }, [state,dispatch]);

    return (
        children
    );
};

export default PageWrapper;

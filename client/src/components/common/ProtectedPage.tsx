import React, { useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {setAuthModalOpen} from "../../redux/features/user/auth.modal.slice";

type Props = {
    children:JSX.Element
}
const ProtectedPage = ({children}:Props) => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state=>state.user)
    useEffect(() => {
        dispatch(setAuthModalOpen(Boolean(!user)))
    }, [user, dispatch]);

      if(user) return children
     return null;

};

export default ProtectedPage;

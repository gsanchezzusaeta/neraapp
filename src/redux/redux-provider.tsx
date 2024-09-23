"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { persistStore } from "redux-persist";
import { useAppSelector } from "./hooks";
import { useEffect, useState, Suspense } from "react";
import { redirect } from "next/navigation";
import { usePathname } from 'next/navigation'
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";

persistStore(store)
export default function ReduxProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <Provider store={store}>
            <Suspense fallback={<LoadingSpinner />}>
                <Validator />
            </Suspense>
            {children}
        </Provider>)
}

const Validator = () => {

    const [isMounted, setIsMounted] = useState(false);

    const state = useAppSelector(state => state.persistedReducer.loggedUser)
    const pathName = usePathname()


    useEffect(() => {
        pathName !== '/login' && !state.auth && redirect('/login')
    }, [state])

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }


    return <></>
}
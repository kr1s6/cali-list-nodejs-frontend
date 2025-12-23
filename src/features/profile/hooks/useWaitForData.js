'use client'
import { useEffect, useState } from "react";

export default function useWaitForData() {
    const [isWaitingForData, setIsWaitingForData] = useState(true);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;
        setIsWaitingForData(false);
    }, [isClient]);


    return {
        isWaitingForData
    }
}
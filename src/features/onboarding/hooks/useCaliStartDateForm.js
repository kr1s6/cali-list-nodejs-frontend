'use client'
import { HREF } from "features/shared/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLocalStorageItem } from "utils/local-storage-utils";
import { patchUserCaliStartDate } from "../services/patchUserCaliStartDateService";

export default function useCaliStartDateForm() {
    const router = useRouter();
    const [errorValue, setErrorValue] = useState(null);
    const [caliStartDate, setCaliStartDate] = useState("");
    const [trainingDuration, setTrainingDuration] = useState(getLocalStorageItem("user").trainingDuration || null);

    useEffect(() => {
        if (trainingDuration) {
            console.log("Push from set training duration");
            router.push(HREF.PROFILE_PAGE);
        }
    }, []);

    const submit = async () => {
        const requestBody = {
            caliStartDate: caliStartDate
        };
        const result = await patchUserCaliStartDate(requestBody, router);
        if (!result.ok) {
            setErrorValue(result.error);
        }
    };

    return {
        caliStartDate,
        setCaliStartDate,
        submit,
        errorValue
    }
}


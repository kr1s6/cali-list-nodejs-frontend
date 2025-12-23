'use client'
import { HREF } from "features/shared/constants";
import { useEffect, useState } from "react";
import { getLocalStorageItem } from "utils/local-storage-utils";
import { patchUserBirthdate } from "../services/patchUserBirthdateService";
import { useRouter } from "next/navigation";

export default function useBirthdateForm() {
    const router = useRouter();
    const [birthdate, setBirthdate] = useState(getLocalStorageItem("user").birthdate || null);
    const [errorValue, setErrorValue] = useState(null);

    useEffect(() => {
        if (birthdate) {
            console.log("Push from set birthday.");
            router.push(HREF.PROFILE_PAGE);
        }
    }, []);

    const submit = async () => {
        const requestBody = {
            birthdate: birthdate
        };
        const result = await patchUserBirthdate(requestBody, router);
        if (!result.ok) {
            setErrorValue(result.error);
        }
    };

    return {
        birthdate,
        setBirthdate,
        submit,
        errorValue
    };
}
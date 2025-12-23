'use client'
import { LoadingNavabar } from "components/navbar";
import TrainingDurationMaeter from "../components/TrainingDurationMeter";
import useWaitForData from "../hooks/useWaitForData";
import Footer from "components/footer";
import { useState } from "react";
import { getLocalStorageItem } from "utils/local-storage-utils";

export default function ProfilePage() {
    const { isWaitingForData } = useWaitForData();
    const [userAvatarImg, setUserAvatarImg] = useState(getLocalStorageItem("user").avatarKey || null);

    if (isWaitingForData) {
        return (
            <>
                <LoadingNavabar></LoadingNavabar>
                <Footer></Footer>
            </>
        );
    }

    return (
        <TrainingDurationMaeter />
    );
}
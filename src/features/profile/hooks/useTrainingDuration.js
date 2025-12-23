'use client'
import { getLocalStorageItem } from "utils/local-storage-utils";

export default function useTrainingDuration() {
    const trainingDuration = getLocalStorageItem("user")?.trainingDuration || null;

    return { trainingDuration };
}
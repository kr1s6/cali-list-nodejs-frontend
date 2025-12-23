'use client'
import useTrainingDuration from "../hooks/useTrainingDuration";

export default function TrainingDurationMaeter() {
    const {
        trainingDuration
    } = useTrainingDuration();

    return (
        <div className="bg-accent-content flex px-60">
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-title">TRAINED FOR</div>
                    <div className="stat-value">{trainingDuration}</div>
                </div>
            </div>
        </div>
    );
}
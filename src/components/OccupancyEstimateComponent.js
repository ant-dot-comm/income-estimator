import React, { useState, useEffect } from "react";
import { Slider } from "antd";

import { shadeColor } from "../utils";

const OccupancyEstimateComponent = ({
    spaceData,
    label,
    onProfitChange,
    color,
}) => {
    const { numSpaces, dailyRate, monthlyRate, distribution } = spaceData;

    // Calculate initial spaces distribution
    const monthlySpaces = Math.round((numSpaces * distribution) / 100);
    const dailySpaces = numSpaces - monthlySpaces;

    // State for occupancy estimates (percentage of spaces expected to be filled)
    const [monthlyOccupancy, setMonthlyOccupancy] = useState(0); // In percentage
    const [dailyOccupancy, setDailyOccupancy] = useState(0); // In percentage

    // Calculate filled spaces based on occupancy percentage
    const monthlyFilledSpaces = Math.round(
        (monthlySpaces * monthlyOccupancy) / 100
    );
    const dailyFilledSpaces = Math.round((dailySpaces * dailyOccupancy) / 100);

    // Calculate potential and actual profits
    const monthlyActualProfit = monthlyFilledSpaces * monthlyRate;
    const dailyActualProfit = dailyFilledSpaces * dailyRate;

    // Notify parent of profit changes
    useEffect(() => {
        onProfitChange({
            monthlyProfit: monthlyActualProfit,
            dailyProfit: dailyActualProfit,
        });
    }, [monthlyActualProfit, dailyActualProfit, onProfitChange]);

    return (
        <div className="occupancy-estimate">
            <div className="bg-neutral-200 px-8">
                <h2 className="text-lg font-semibold mb-4">
                    {label} ({numSpaces})
                </h2>
            </div>
            <div className="flex justify-between px-8 pb-8">
                {/* Monthly Occupancy Column */}
                <div className="w-1/2">
                    <h3 className="text-md font-semibold">Monthly</h3>
                    <p>
                        <span className="text-xl">{monthlyFilledSpaces}</span><span className="text-sm text-neutral-600"> / {monthlySpaces} spaces filled</span>
                    </p>
                    <Slider
                        min={0}
                        max={100}
                        value={monthlyOccupancy}
                        onChange={setMonthlyOccupancy}
                        tooltip={{ formatter: (value) => `${value}%` }}
                        className="custom-slider"
                        style={{
                            "--slider-track-color": color,
                            "--slider-step-color": shadeColor(color, 10), // Lighter shade for steps
                        }}
                    />
                    <div>
                        <p>
                        <span className="text-xl" style={{color: color}}>${monthlyActualProfit}</span><span className="text-sm text-neutral-600"> / ${monthlySpaces * monthlyRate}</span>
                        </p>
                    </div>
                </div>

                {/* Daily Occupancy Column */}
                <div className="w-1/2">
                    <h3 className="text-md font-semibold">Daily</h3>
                    <p>
                        <span className="text-xl">{dailyFilledSpaces}</span><span className="text-sm text-neutral-600"> / {dailySpaces} spaces filled</span>
                    </p>
                    <Slider
                        min={0}
                        max={100}
                        value={dailyOccupancy}
                        onChange={setDailyOccupancy}
                        tooltip={{ formatter: (value) => `${value}%` }}
                        className="custom-slider"
                        style={{
                            "--slider-track-color": color,
                            "--slider-step-color": shadeColor(color, 10), // Lighter shade for steps
                        }}
                    />
                    <div>
                        <p>
                            <span className="text-xl" style={{color: color}}>${dailyActualProfit}</span><span className="text-sm text-neutral-600"> / ${dailySpaces * dailyRate}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OccupancyEstimateComponent;

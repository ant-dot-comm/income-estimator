import React from "react";
import { Checkbox, Input, Slider } from "antd";

import { shadeColor } from "../utils";
import StyledInput from "./StyledInput";

const SpaceDistributionComponent = ({
    label,
    color,
    data,
    onCheckboxChange,
    onNumSpacesChange,
    onDailyRateChange,
    onMonthlyRateChange,
    onDistributionChange,
}) => {
    const { isChecked, numSpaces, dailyRate, monthlyRate, distribution } = data;

    const calculateDistribution = () => {
        const monthlySpaces = Math.round((numSpaces * distribution) / 100);
        const dailySpaces = numSpaces - monthlySpaces;
        return { monthlySpaces, dailySpaces };
    };

    const { monthlySpaces, dailySpaces } = calculateDistribution();

    return (
        <div className="space-distribution-component mb-8">
            <Checkbox
                checked={isChecked}
                onChange={(e) => onCheckboxChange(e.target.checked)}
            >
                <p className="text-lg font-bold">{label}</p>
            </Checkbox>

            {isChecked && (
                <div className="mt-4 ml-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <StyledInput label="# of Spaces" type="number" min={0} value={numSpaces} onChange={(e) => onNumSpacesChange(Number(e.target.value))} placeholder="Enter # of spaces" />

                        <StyledInput label="Daily Rate" type="number" min={0} value={dailyRate} onChange={(e) => onDailyRateChange(Number(e.target.value))} placeholder="Enter daily rate" />

                        <StyledInput label="Monthly Rate" type="number" min={0} value={monthlyRate} onChange={(e) => onMonthlyRateChange(Number(e.target.value))} placeholder="Enter monthly rate" />
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <div className="text-left">
                                <label className="text-lg font-semibold" style={{color: color}}>Monthly</label>
                                <div>
                                    <span className="text-lg font-bold">{monthlySpaces}</span> spaces / {Math.round(
                                        (monthlySpaces / numSpaces) * 100
                                    ) || 0}
                                    %
                                </div>
                            </div>
                            <div className="text-right">
                                <label className="text-lg font-semibold" style={{color: shadeColor(color, 10)}}>Daily</label>
                                <div>
                                <span className="text-lg font-bold">{dailySpaces}</span> spaces / {Math.round(
                                        (dailySpaces / numSpaces) * 100
                                    ) || 0}
                                    %
                                </div>
                            </div>
                        </div>
                        <Slider
                            min={0}
                            max={100}
                            value={distribution}
                            onChange={onDistributionChange}
                            tooltip={{ formatter: null }}
                            className="custom-slider"
                            style={{
                                '--slider-track-color': color,
                                '--slider-step-color': shadeColor(color, 10), // Lighter shade for steps
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpaceDistributionComponent;

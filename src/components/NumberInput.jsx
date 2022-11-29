import React from "react";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';

// import { useState } from "react";

export const NumberInput = ({ value, onChange }) => {
    return (
        <div className="numberInput">
            <AddCircleOutlinedIcon onClick={() => onChange(value + 1)} className="increaseButton"></AddCircleOutlinedIcon>
            <input type="number" value={value} min={1} onChange={(e) => onChange(Number(e.target.value))}></input>
            <RemoveCircleOutlinedIcon onClick={() => value > 0 ? onChange(value - 1) : onChange(1)} className="decreaseButton"></RemoveCircleOutlinedIcon>

        </div>
    )
}
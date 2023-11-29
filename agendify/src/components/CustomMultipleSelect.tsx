import {
    Checkbox,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

export default function CustomMultipleSelect({
    disabled,
    options,
    onChange,
    error=false,
}: {
    disabled?: boolean;
    options: string[];
    onChange?: (a: string[]) => void;
    error?: boolean
}) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleSelect = (event: SelectChangeEvent<typeof selectedOptions>) => {
        const {
            target: { value },
        } = event;
        setSelectedOptions(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
        onChange &&
            onChange(typeof value === "string" ? value.split(",") : value);
    };

    return (
        <Select
            error={error}
            title={selectedOptions.join(", ")}
            value={selectedOptions}
            renderValue={(selected: string[]) => selected.join(", ")}
            onChange={handleSelect}
            input={<OutlinedInput label="Selecione" />}
            sx={{ width: "100%" }}
            disabled={disabled}
            multiple
        >
            {options.map((option) => (
                <MenuItem key={option} value={option}>
                    <Checkbox checked={selectedOptions.indexOf(option) > -1} />
                    <ListItemText primary={option} />
                </MenuItem>
            ))}
        </Select>
    );
}

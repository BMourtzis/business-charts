export type ValidationRule = (value: any) => true | string;

export const required: ValidationRule = (value) => {
    return value !== null && value !== undefined && value !== ""
        ? true
        : "This field is required.";
};

export const emailFormat: ValidationRule = (value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string" && value.trim() === "") return true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(value))
        ? true
        : "Please enter a valid email address.";
};

export const phoneFormat: ValidationRule = (value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string" && value.trim() === "") return true;

    const phoneRegex = /^\+?[1-9]\d{9,14}$/;
    return phoneRegex.test(String(value)) ? true : "Please enter a valid phone number.";
};

export const minLength = (min: number): ValidationRule => {
    return (value) => {
        if (value === null || value === undefined) return true;
        if (typeof value === "string" && value.trim() === "") return true;

        return typeof value === "string" && value.length >= min
            ? true
            : `Minimum length is ${min} characters.`;
    };
};

export const maxLength = (max: number): ValidationRule => {
    return (value) => {
        if (value === null || value === undefined) return true;
        if (typeof value === "string" && value.trim() === "") return true;

        return typeof value === "string" && value.length <= max
            ? true
            : `Maximum length is ${max} characters.`;
    };
};

export const rangeLength = (min: number, max: number): ValidationRule => {
    return (value) => {
        if (value === null || value === undefined) return true;
        if (typeof value === "string" && value.trim() === "") return true;

        return (typeof value === "string" && value.length >= min && value.length <= max)
            ? true
            : `Length must be between ${min} and ${max} characters.`;
    };
};

export const numeric: ValidationRule = (value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string" && value.trim() === "") return true;

    return !isNaN(parseFloat(String(value))) && isFinite(Number(value))
        ? true
        : "This field must be a numeric value.";
};

export const integer: ValidationRule = (value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string" && value.trim() === "") return true;

    return Number.isInteger(Number(value))
        ? true
        : "This field must be an integer value.";
};

export const positiveNumber: ValidationRule = (value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string" && value.trim() === "") return true;

    return typeof value === "number" && value > 0
        ? true
        : "This field must be a positive number.";
};

export const negativeNumber: ValidationRule = (value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string" && value.trim() === "") return true;

    return typeof value === "number" && value < 0
        ? true
        : "This field must be a negative number.";
};

export function validateField(value: any, rules: ValidationRule[]): true | string {
    for (const rule of rules) {
        const result = rule(value);
        if (result !== true) {
            return result;
        }
    }
    return true;
}
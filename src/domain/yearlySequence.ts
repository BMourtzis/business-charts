export class YearlySequence {
    private constructor(
        public readonly year: number,
        public readonly value: number
    ) { }

    static create(year: number, value: number): YearlySequence {
        if (value <= 0) throw new Error("Sequence must be positive");
        return new YearlySequence(year, value);
    }

    static fromFormatted(formatted: string): YearlySequence {
        if (!formatted) throw new Error("Formatted string is empty");

        const parts = formatted.split("-");
        if (parts.length !== 2) {
            throw new Error(`Invalid format: ${formatted}. Expected "YYYY-<sequence>"`);
        }

        const yearPart = parts[0].trim();
        const valuePart = parts[1].trim();

        const year = Number(yearPart);
        const value = Number(valuePart);

        if (!Number.isInteger(year) || year <= 0) {
            throw new Error(`Invalid year in formatted string: ${yearPart}`);
        }

        if (!Number.isInteger(value) || value <= 0) {
            throw new Error(`Invalid sequence value in formatted string: ${valuePart}`);
        }

        return new YearlySequence(year, value);
    }

    format(padding = 6): string {
        return `${this.year}-${this.value.toString().padStart(padding, "0")}`;
    }
}
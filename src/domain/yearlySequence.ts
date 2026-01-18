const clientNumberPadding = 4;
const valuePadding = 4;

export class YearlyClientSequence {
    private constructor(
        public readonly year: number,
        public readonly clientNumber: number,
        public readonly value: number
    ) { }

    static create(year: number, clientNumber: number, value: number): YearlyClientSequence {
        if (value <= 0) throw new Error("Sequence must be positive");
        return new YearlyClientSequence(year, clientNumber, value);
    }

    static fromFormatted(formatted: string): YearlyClientSequence {
        if (!formatted) throw new Error("Formatted string is empty");

        const parts = formatted.split("-");
        if (parts.length !== 2) {
            throw new Error(`Invalid format: ${formatted}. Expected "YY-<sequence>"`);
        }

        const yearPart = parts[0].trim();
        const clientPart = parts[1].substring(0, 4).trim();
        const valuePart = parts[1].substring(4, 8).trim();

        const year = Number(yearPart);
        const clientNumber = Number(clientPart)
        const value = Number(valuePart)

        if (!Number.isInteger(year) || year <= 0) {
            throw new Error(`Invalid year in formatted string: ${yearPart}`);
        }

        if (!Number.isInteger(clientNumber) || clientNumber <= 0) {
            throw new Error(`Invalid client number in formatted string: ${clientPart}`);
        }

        if (!Number.isInteger(value) || value <= 0) {
            throw new Error(`Invalid sequence value in formatted string: ${valuePart}`);
        }

        return new YearlyClientSequence(year, clientNumber, value);
    }

    format(): string {
        return `${this.year}-${getNumberWithPadding(this.clientNumber, clientNumberPadding)}${getNumberWithPadding(this.value, valuePadding)}`;
    }
}

function getNumberWithPadding(value: number, padding: number) {
    return value.toString().padStart(padding, "0");
}
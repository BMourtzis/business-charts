import { YearlyClientSequence } from "../yearlySequence"

export class MovementYearlyClientSequence extends YearlyClientSequence {
    static prefix = "MM";
    private constructor(
        public readonly year: number,
        public readonly clientNumber: number,
        public readonly value: number
    ) { 
        super(year, clientNumber, value);
    }

    static create(year: number, clientNumber: number, value: number): MovementYearlyClientSequence {
        return new MovementYearlyClientSequence(year, clientNumber, value);
    }

    static fromFormatted(formatted: string): MovementYearlyClientSequence {
        if (!formatted) throw new Error("Formatted string is empty");

        const idx = formatted.indexOf("-");
        if (idx === -1) {
            throw new Error(`Invalid format: ${formatted}`);
        }

        const prefix = formatted.slice(0, idx);
        const remainder = formatted.slice(idx + 1);

        if (prefix !== this.prefix) {
            throw new Error(`Invalid prefix: ${prefix}`);
        }

        const yearlySequence = YearlyClientSequence.fromFormatted(remainder);

        return new MovementYearlyClientSequence(
            yearlySequence.year, 
            yearlySequence.clientNumber, 
            yearlySequence.value);
    }

    format(): string {
        return `${MovementYearlyClientSequence.prefix}-${super.format()}`;
    }
}
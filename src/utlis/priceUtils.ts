//TODO: later probably make into a composable

export function stringPriceToGreekFormatLocale(amount: string) {
    const price = parseFloat(amount);
    return numberPriceToGreekFormatLocale(price);
}

export function numberPriceToGreekFormatLocale(amount: number): string{
    if(isNaN(amount)) {
        return `0,00 ${getMonetarySign()}`;
    }
    const priceString = amount.toFixed(2);
    const greekLocalePrice = dotToComma(priceString);
    return `${greekLocalePrice} ${getMonetarySign()}`;
}

export function intlToGreekLocale(amount: string) {
    return dotToComma(amount);
}

export function greekToIntlLocale(amount: string) {
    return commaToDot(amount);
}

function dotToComma(value: string) {
    return value.replace(".", ",");
}

function commaToDot(value: string) {
    return value.replace(",", ".");
}

export function getMonetarySign() {
    return "€";
}

export function toGreekLocale(value: string) {
    const parts = value.replace(/[^\d,]/g, '').split(',');
    if (parts.length > 2) {
        const result = parts.shift() + ',' + parts.join('');
        return result;
    }
    return parts.join(',');
}
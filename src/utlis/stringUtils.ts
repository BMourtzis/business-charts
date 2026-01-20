export function isNullOrEmpty(value?: string) {
    if(!value) return true;
    if(value === "") return true;
    return false;
}
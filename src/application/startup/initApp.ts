import { loadPartners } from "../commands/loadPartnersCommand";


export async function initApplication() {
    await Promise.all([
        loadPartners()
    ]);
}
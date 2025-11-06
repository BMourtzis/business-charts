import { loadOrders } from "../commands/order/loadOrdersCommand";
import { loadPartners } from "../commands/partner/loadPartnersCommand";

export async function initApplication() {
    await Promise.all([
        loadPartners(),
        loadOrders()
    ]);
}
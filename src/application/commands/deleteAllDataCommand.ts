import { orderRepository } from "@/infrastructure/repositories/orderRepository.local";
import { partnerRepository } from "@/infrastructure/repositories/partnerRepository.local";
import { loadPartners } from "./loadPartnersCommand";

export async function deleteAllDataCommand() {
    await partnerRepository.removeAll();
    await orderRepository.removeAll();

    //TODO: probably encapsulate all the calls to a separate command
    loadPartners();
}
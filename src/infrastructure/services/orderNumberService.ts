import { orderRepository } from "../repositories/orderRepository.local";
import { YearlyClientSequence } from "@/domain/yearlySequence";
import { partnerRepository } from "../repositories/partnerRepository.local";

export class OrderNumberService {
    static async getNext(partnerId: string): Promise<YearlyClientSequence> {
        const lastTwoDigitsOfYear = new Date().getFullYear() % 100;

        const orders = await orderRepository.load();

        const partner = await partnerRepository.getById(partnerId);
        if (!partner) throw new Error(`Partner with id:${partnerId} doesn't exist`);

        const partnersOrders = orders.filter(o => o.partnerId === partnerId);

        if(partnersOrders.length === 0) 
            return YearlyClientSequence.create(lastTwoDigitsOfYear, partner.clientNumber, 1);

        const lastSequence = partnersOrders
            .map(o => o.sequence)
            .filter(s => s.year === lastTwoDigitsOfYear)
            .sort((a, b) => a.format().localeCompare(b.format()))
            .at(-1);

        if(!lastSequence) throw new Error(`error with find the sequence`);

        return YearlyClientSequence.create(lastTwoDigitsOfYear, partner.clientNumber, lastSequence.value + 1);
    }
}
import { MovementYearlyClientSequence } from "@/domain/payment/movementYearlySequence";
import { moneyMovementRepository } from "../repositories/moneyMovementRepository.local";
import { partnerRepository } from "../repositories/partnerRepository.local";

export class MovementNumberService {
    static async getNext(partnerId: string): Promise<MovementYearlyClientSequence> {
        const lastTwoDigitsOfYear = new Date().getFullYear() % 100;

        const movements = await moneyMovementRepository.load();

        const partner = await partnerRepository.getById(partnerId);
        if (!partner) throw new Error(`Partner with id:${partnerId} doesn't exist`);

        const partnersMovements = movements.filter(o => o.partnerId === partnerId);

        if(partnersMovements.length === 0) 
            return MovementYearlyClientSequence.create(lastTwoDigitsOfYear, partner.clientNumber, 1);

        const lastSequence = partnersMovements
            .map(o => o.sequence)
            .filter(s => s.year === lastTwoDigitsOfYear)
            .sort((a, b) => a.format().localeCompare(b.format()))
            .at(-1);

        if(!lastSequence) throw new Error(`Error finding the sequence`);

        return MovementYearlyClientSequence.create(lastTwoDigitsOfYear, partner.clientNumber, lastSequence.value + 1);
    }
}
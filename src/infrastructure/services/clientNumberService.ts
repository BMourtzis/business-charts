import { partnerRepository } from "../repositories/partnerRepository.local";

export class ClientNumberService {
    static async getNext(): Promise<number> {
        const partners = await partnerRepository.getAll();

        if(partners.length === 0) return 1;

        const lastClientNumber = partners
            .sort((a, b) => a.clientNumber - b.clientNumber)
            .map(p => p.clientNumber)
            .at(-1);

        if(!lastClientNumber) throw new Error("Could not find last client number")

        return lastClientNumber+1;
    }
}
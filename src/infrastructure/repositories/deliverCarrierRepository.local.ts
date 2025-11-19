import { DeliveryCarrierDTO } from "@/application/dto/deliveryCarrierDTO";
import { Repository } from "./type";
import { DeliveryCarrier } from "@/domain/deliveryCarrier/deliveryCarrier";
import { DeliveryCarrierMapper } from "@/application/mapper/deliverCarrierMapper";

const STORAGE_KEY = "delivery_carriers";

async function loadDTOs(): Promise<DeliveryCarrierDTO[]> {
    const json = localStorage.getItem(STORAGE_KEY);
    if (!json) return [];
    return JSON.parse(json);
}

async function saveDTOs(dtos: DeliveryCarrierDTO[]): Promise<void> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dtos));
}

export const deliveryCarrierRepository: Repository<DeliveryCarrier, DeliveryCarrierDTO> = {
    async getAll() {
        return loadDTOs();
    },
    async saveAll(carrierDTOs) {
        return saveDTOs(carrierDTOs);
    },
    async load() {
        const dtos = await loadDTOs();
        return dtos.map(DeliveryCarrierMapper.toModel);
    },
    async getById(id: string) {
        const dtos = await loadDTOs();
        const carrier = dtos.find(p => p.id === id);
        if(!carrier) return undefined;

        return DeliveryCarrierMapper.toModel(carrier);
    },
    async add(carrier) {
        const dtos = await loadDTOs();
        dtos.push(DeliveryCarrierMapper.toDTO(carrier));
        saveDTOs(dtos);
    },
    async update(carrier) {
        const dtos = await loadDTOs();
        const i = dtos.findIndex((o: DeliveryCarrierDTO) => o.id === carrier.id);
        if (i !== -1) dtos[i] = DeliveryCarrierMapper.toDTO(carrier);
        saveDTOs(dtos);
    },

    async remove(id) {
        const dtos = await loadDTOs();
        const filtered = dtos.filter((o: DeliveryCarrierDTO) => o.id !== id);
        saveDTOs(filtered);
    },
    async removeAll() {
        await saveDTOs([]);
    }
}
import { partnerRepository } from '@/infrastructure/repositories/partnerRepository.local';
import { orderRepository } from '@/infrastructure/repositories/orderRepository.local';
import { deliveryCarrierRepository } from '@/infrastructure/repositories/deliverCarrierRepository.local';

import { type PartnerDTO } from '@/application/dto/partnerDTO';
import { type DeliveryCarrierDTO } from '@/application/dto/deliveryCarrierDTO';
import { type OrderDTO } from '@/application/dto/orderDTO';

export class FilePersistenceService {
    async exportAll(includePartners: boolean, includeCarriers: boolean, includeOrders: boolean) {
        const data = {
            partners: [] as PartnerDTO[],
            orders: [] as OrderDTO[],
            carriers: [] as DeliveryCarrierDTO[],
        }

        if(includePartners) {
            data.partners = await partnerRepository.getAll();
        }

        if(includeCarriers) {
            data.carriers = await deliveryCarrierRepository.getAll();
        }

        if(includeOrders) {
            data.orders = await orderRepository.getAll();
        }

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `export-${new Date().toISOString().slice(0, 10)}.json`
        a.click()
        URL.revokeObjectURL(url)
    }

    async importAll(file: File, includePartners: boolean, includeCarriers: boolean, includeOrders: boolean) {
        const text = await file.text();
        const data = JSON.parse(text);

        if (includePartners && data.partners) {
            await partnerRepository.saveAll(data.partners);
        }

        if (includeCarriers && data.orders) {
            await orderRepository.saveAll(data.orders);
        }

        if(includeOrders && data.carriers) {
            await deliveryCarrierRepository.saveAll(data.carriers);
        }
    }
}
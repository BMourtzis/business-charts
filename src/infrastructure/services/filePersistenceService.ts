import { partnerRepository } from '@/infrastructure/repositories/partnerRepository.local';
import { orderRepository } from '@/infrastructure/repositories/orderRepository.local';
import { PartnerDTO } from '@/application/dto/partnerDTO';
import { OrderDTO } from '@/domain/order/models/order';
import { DeliveryCarrierDTO } from '@/application/dto/deliveryCarrierDTO';
import { deliveryCarrierRepository } from '../repositories/deliverCarrierRepository.local';

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

    async importAll(file: File) {
        const text = await file.text();
        const data = JSON.parse(text);

        if (data.partners) {
            await partnerRepository.saveAll(data.partners);
        }

        if (data.orders) {
            await orderRepository.saveAll(data.orders);
        }

        if(data.carriers) {
            await deliveryCarrierRepository.saveAll(data.carriers);
        }
    }
}
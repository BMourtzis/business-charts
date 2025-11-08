import { Order, OrderDTO } from "@/domain/models/order";
import { Repository } from "./type";

const STORAGE_KEY = 'orders';

async function loadDTOs(): Promise<OrderDTO[]> {
    const json = localStorage.getItem(STORAGE_KEY);
    if (!json) return [];
    return JSON.parse(json);
}

async function saveDTOs(dtos: OrderDTO[]): Promise<void> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dtos));
}

//TODO: update this to save with DTO
export const orderRepository: Repository<Order, OrderDTO> = {
    async getAll() {
        return loadDTOs();
    },
    async saveAll(orderDtos) {
        saveDTOs(orderDtos)
    },
    async load() {
        const json = localStorage.getItem(STORAGE_KEY);
        if (!json) return [];
        const plain = JSON.parse(json);
        return plain;
    },
    async add(order) {
        const all = await this.load();
        all.push(order);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    },

    async update(order) {
        const all = await this.load();
        const i = all.findIndex((o: Order) => o.id === order.id);
        if (i !== -1) all[i] = order;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    },

    async remove(id) {
        const all = await this.load();
        const filtered = all.filter((o: Order) => o.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    },
};
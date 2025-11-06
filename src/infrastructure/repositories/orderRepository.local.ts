import { OrderRepository } from "./type";
import { OrderDTO } from "@/application/dto/orderDTO";
import { fromOrderDTO } from "@/application/mapper/orderMapper";

const STORAGE_KEY = 'orders';

async function loadDTOs(): Promise<OrderDTO[]> {
    const json = localStorage.getItem(STORAGE_KEY);
    if (!json) return [];
    return JSON.parse(json);
}

async function saveDTOs(dtos: OrderDTO[]): Promise<void> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dtos));
}

export const orderRepository: OrderRepository = {
  async load() {
    const dtos = await loadDTOs();
    return dtos.map(fromOrderDTO);
  },

  async add(order) {
    const dtos = await loadDTOs();
    dtos.push(order);
    saveDTOs(dtos);
  },

  async update(order) {
    const dtos = await loadDTOs();
    const i = dtos.findIndex((o: OrderDTO) => o.id === order.id);
    if (i !== -1) dtos[i] = order;
    saveDTOs(dtos);
  },

  async remove(id) {
    const dtos = await loadDTOs();
    const filtered = dtos.filter((o: OrderDTO) => o.id !== id);
    saveDTOs(filtered);
  },
};
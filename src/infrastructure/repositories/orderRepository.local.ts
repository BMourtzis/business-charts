import { Order } from "@/domain/models/order";
import { OrderRepository } from "./type";

const STORAGE_KEY = 'orders';

export const orderRepository: OrderRepository = {
  async load() {
    const json = localStorage.getItem(STORAGE_KEY);
    if (!json) return [];
    const plain = JSON.parse(json);
    // Here you could rehydrate with `Object.assign(new Order(...), plain)`
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
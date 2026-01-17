import { OrderMapperInstance } from "@/application/mapper/orderMapper";
import { orderRepository } from "../repositories/orderRepository.local";
import { YearlySequence } from "@/domain/yearlySequence";

export class OrderNumberService {
  static async getNext(): Promise<YearlySequence > {
    const year = new Date().getFullYear();
    
    const orders = await orderRepository.getAll();

    const lastSequence = orders
        .map(OrderMapperInstance.toModel)
        .map(o => o.sequence)
        .filter(s => s.year === year)
        .reduce((max, s) => Math.max(max, s.value), 0);

    return YearlySequence.create(year, lastSequence + 1);
  }
}
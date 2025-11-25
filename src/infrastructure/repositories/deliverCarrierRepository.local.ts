import { DeliveryCarrierDTO } from "@/application/dto/deliveryCarrierDTO";
import { DeliveryCarrier } from "@/domain/deliveryCarrier/deliveryCarrier";
import { DeliveryCarrierMapperInstance } from "@/application/mapper/deliverCarrierMapper";
import { LocalRepository } from "./localRepository";
import { LocalStorage } from "../persistence/LocalStorage";

export class DeliveryCarrierRepository extends LocalRepository<DeliveryCarrier, DeliveryCarrierDTO> { }

const STORAGE_KEY = "delivery_carriers";

export const deliveryCarrierRepository = 
    new DeliveryCarrierRepository(LocalStorage, DeliveryCarrierMapperInstance, STORAGE_KEY);
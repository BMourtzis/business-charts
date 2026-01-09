import { DeliveryCarrierDTO } from "@/application/dto/deliveryCarrierDTO";
import { DeliveryCarrier } from "@/domain/deliveryCarrier/deliveryCarrier";
import { DeliveryCarrierMapperInstance } from "@/application/mapper/deliverCarrierMapper";
import { LocalRepository } from "./localRepository";
import { encryptedStorageInstance } from "../persistence/EncryptedStorage";

export class DeliveryCarrierRepository extends LocalRepository<DeliveryCarrier, DeliveryCarrierDTO> { }

const STORAGE_KEY = "delivery_carriers";

export const deliveryCarrierRepository = 
    new DeliveryCarrierRepository(encryptedStorageInstance, DeliveryCarrierMapperInstance, STORAGE_KEY);
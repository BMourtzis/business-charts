import type { MoneyMovement } from "@/domain/payment/models/moneyMovement";
import { LocalRepository } from "./localRepository";
import type { MoneyMovementDTO } from "@/application/dto/moneyMovementDTO";
import { encryptedStorageInstance } from "../persistence/EncryptedStorage";
import { MoneyMovementMapperInstance } from "@/application/mapper/moneyMovementMapper";

export class MoneyMovementRepository extends LocalRepository<MoneyMovement, MoneyMovementDTO> { };

const STORAGE_KEY = "money_movement";

export const moneyMovementRepository = 
    new MoneyMovementRepository(encryptedStorageInstance, MoneyMovementMapperInstance, STORAGE_KEY);
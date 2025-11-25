import { LoadDeliveryCarriersCommandHandler } from "@/application/commands/deliveryCarrier/loadDeliveryCarriersCommand";
import { LoadPartnersCommandHandler } from "@/application/commands/partner/loadPartnersCommand";
import * as cryptoSession from "@/infrastructure/security/crypto-session";
import { computed, ref } from "vue";

const unlocked = ref(cryptoSession.isVaultUnlocked());

export function useVault() {
    const isUnlocked = computed(() => unlocked.value);
    const isLocked = computed(() => !unlocked.value);

    //TODO: make this 
    async function unlock(password: string) {
        await cryptoSession.unlockVault(password);
        unlocked.value = cryptoSession.isVaultUnlocked();

        new LoadPartnersCommandHandler().handle();
        new LoadDeliveryCarriersCommandHandler().handle();
    }

    async function lock() {
        cryptoSession.lockVault();
        unlocked.value = cryptoSession.isVaultUnlocked();
    }

    return { isUnlocked, isLocked, unlock, lock };
}
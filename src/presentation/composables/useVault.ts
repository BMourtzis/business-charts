import { LoadDeliveryCarriersCommandHandler } from "@/application/commands/deliveryCarrier/loadDeliveryCarriersCommand";
import { LoadPartnersCommandHandler } from "@/application/commands/partner/loadPartnersCommand";
import * as cryptoSession from "@/infrastructure/security/crypto-session";
import { computed, ref } from "vue";

const unlocked = ref(cryptoSession.isVaultUnlocked());

export function useVault() {
    const isUnlocked = computed(() => unlocked.value);
    const isLocked = computed(() => !unlocked.value);
    const isInitialSetup = computed(() => cryptoSession.isInitialSetup());

    //TODO: make this into a command, separate load to separate command
    async function unlock(password: string) {
        await cryptoSession.unlockVault(password);

        try {
            await new LoadPartnersCommandHandler().handle();
            await new LoadDeliveryCarriersCommandHandler().handle();
        } catch(e) {
            console.log(e);
            cryptoSession.lockVault();
            throw e;
        }

        unlocked.value = cryptoSession.isVaultUnlocked();
    }

    //TODO: clean stores
    async function lock() {
        cryptoSession.lockVault();
        unlocked.value = cryptoSession.isVaultUnlocked();
    }

    return { isUnlocked, isLocked, unlock, lock, isInitialSetup };
}
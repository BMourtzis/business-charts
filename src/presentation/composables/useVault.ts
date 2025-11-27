import { computed, ref } from "vue";

import { VaultSession } from "@/infrastructure/security/crypto-session";

import { ClearStoresCommandHandler } from "@/application/commands/clearStoresCommand";
import { LoadDeliveryCarriersCommandHandler } from "@/application/commands/deliveryCarrier/loadDeliveryCarriersCommand";
import { LoadAllDataCommandHandler } from "@/application/commands/loadAllDataCommand";
import { LoadPartnersCommandHandler } from "@/application/commands/partner/loadPartnersCommand";
import { LockVaultCommandHandler } from "@/application/commands/vault/lockVaultCommand";
import { UnlockVaultCommandHandler } from "@/application/commands/vault/unlockVaultCommand";
import { ChangePasswordCommandHandler } from "@/application/commands/vault/changePasswordCommand";

const unlocked = ref(VaultSession.isVaultUnlocked());

export function useVault() {
    const isUnlocked = computed(() => unlocked.value);
    const isLocked = computed(() => !unlocked.value);
    const isInitialSetup = computed(() => VaultSession.isInitialSetup());

    async function unlock(password: string) {
        const allDataCmdHandler = new LoadAllDataCommandHandler(
            new LoadPartnersCommandHandler(),
            new LoadDeliveryCarriersCommandHandler()
        );
        const handler = new UnlockVaultCommandHandler(allDataCmdHandler);

        unlocked.value = await handler.handle({
            password
        });
    }

    async function lock() {
        const handler = new LockVaultCommandHandler(new ClearStoresCommandHandler());
        unlocked.value = await handler.handle();
    }

    async function changePassword(oldPassword: string, newPassword: string) {
        const handler = new ChangePasswordCommandHandler();
        await handler.handle({
            oldPassword,
            newPassword
        });
    }

    return { isUnlocked, isLocked, unlock, lock, isInitialSetup, changePassword };
}
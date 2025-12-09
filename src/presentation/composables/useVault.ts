import { computed, ref, onMounted } from "vue";

import { VaultSession } from "@/infrastructure/security/crypto-session";

import { ClearStoresCommandHandler } from "@/application/commands/clearStoresCommand";
import { LoadDeliveryCarriersCommandHandler } from "@/application/commands/deliveryCarrier/loadDeliveryCarriersCommand";
import { LoadAllDataCommandHandler } from "@/application/commands/loadAllDataCommand";
import { LoadPartnersCommandHandler } from "@/application/commands/partner/loadPartnersCommand";
import { LockVaultCommandHandler } from "@/application/commands/vault/lockVaultCommand";
import { UnlockVaultCommandHandler } from "@/application/commands/vault/unlockVaultCommand";
import { ChangePasswordCommandHandler } from "@/application/commands/vault/changePasswordCommand";
import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';
import { RequestKeyCommandHandler } from "@/application/commands/vault/requestKeyCommand";

const unlocked = ref(VaultSession.isVaultUnlocked());
const initialSetup = ref(VaultSession.isInitialSetup());

export function useVault() {
    const { tCap } = useLocalizationHelpers();

    const isUnlocked = computed(() => unlocked.value);
    const isLocked = computed(() => !unlocked.value);
    const isInitialSetup = computed(() => initialSetup.value);

    VaultSession.onUnlocked(() => {
        unlocked.value = true;
    });

    VaultSession.onLocked(() => {
        unlocked.value = false;
    });

    onMounted(() => {
        if(initialSetup.value) return;
        const handler = new RequestKeyCommandHandler();

        handler.handle();
    });

    async function unlock(password: string) {
        const allDataCmdHandler = new LoadAllDataCommandHandler(
            new LoadPartnersCommandHandler(),
            new LoadDeliveryCarriersCommandHandler()
        );

        const handler = new UnlockVaultCommandHandler(allDataCmdHandler);
        
        await handler.handle({
            password
        });
        initialSetup.value = false;
    }

    async function lock() {
        const handler = new LockVaultCommandHandler(new ClearStoresCommandHandler());
        await handler.handle();
    }

    async function changePassword(oldPassword: string, newPassword: string) {
        const handler = new ChangePasswordCommandHandler();
        await handler.handle({
            oldPassword,
            newPassword
        });
    }

    function calculatePasswordStrength(password: string) {
        let score = 0;

        if (!password) return { score: 0, label: '', color: 'error' };

        // Rules
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        if (password.length >= 12) score++;

        let label = '';
        let color = '';
        switch(score) {
            case 0:
            case 1:
            label = tCap('vault.pwStrengthWeak');
            color = 'error';
            break;
            case 2:
            label = tCap('vault.pwStrengthFair');
            color = 'warning';
            break;
            case 3:
            label = tCap('vault.pwStrengthGood');
            color = 'yellow';
            break;
            case 4:
            label = tCap('vault.pwStrengthStrong');
            color = 'light-green';
            break;
            case 5:
            label = tCap('vault.pwStrengthVeryStrong');
            color = 'green';
            break;
        }

        const percent = (score / 5) * 100;

        return { score, percent, label, color };
    }

    return { isUnlocked, isLocked, unlock, lock, isInitialSetup, changePassword, calculatePasswordStrength };
}
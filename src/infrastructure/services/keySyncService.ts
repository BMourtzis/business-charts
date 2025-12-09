import { VaultSession } from "../security/crypto-session";
import { broadcastChannelService } from "./broadcastChannelService";

const REQUEST_KEY_MESSAGE_TYPE = "REQUEST_KEY";
const SEND_KEY_MESSAGE_TYPE = "SEND_KEY";

class KeySyncService {
    private registered = false;
    private key_request = false;

    register() {
        if(this.registered) return;
        this.registered = true;

        broadcastChannelService.subscribe(REQUEST_KEY_MESSAGE_TYPE, async () => {
            if(!VaultSession.isVaultUnlocked()) return;

            VaultSession.exportKeyInternal((exportedKey) => {
                broadcastChannelService.publish(SEND_KEY_MESSAGE_TYPE, { key: exportedKey });
            });
        });

        broadcastChannelService.subscribe(SEND_KEY_MESSAGE_TYPE, async (data: { key: string }) => {
            if(!this.key_request) return;

            await VaultSession.importKey(data.key);
            this.key_request = false;
        });
    }

    requestKey() {
        broadcastChannelService.publish(REQUEST_KEY_MESSAGE_TYPE, {});
        this.key_request = true;
    }
}

export const keySyncService = new KeySyncService();
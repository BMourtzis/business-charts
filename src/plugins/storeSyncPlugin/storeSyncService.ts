import { BroadcastChannelService } from "@/infrastructure/services/broadcastChannelService";
import { StoreSyncAdapter } from "./storeSyncAdapter";

const STORE_PATCH_MESSAGE_TYPE = "STORE_PATCH";

export class StoreSyncService {
    private adapters = new Map<string, StoreSyncAdapter>();
    private bcService: BroadcastChannelService;
    private isApplyingRemote = false;
    private pending: Record<string, any> = {};

    private flushPending = debounce(() => {
        for (const storeId in this.pending) {
            this.bcService.publish(STORE_PATCH_MESSAGE_TYPE, {
                id: storeId,
                data: this.pending[storeId]
            });
        }
        this.pending = {};
    }, 100);

    constructor(bcService: BroadcastChannelService) {
        this.bcService = bcService;
        this.bcService.subscribe(STORE_PATCH_MESSAGE_TYPE, this.handleIncoming.bind(this));
    }

    registerStore(adapter: StoreSyncAdapter) {
        if (this.adapters.has(adapter.storeId)) return;
        this.adapters.set(adapter.storeId, adapter);

        adapter.onChange((patch: any) => {
            if (this.isApplyingRemote) return;
            this.queuePatch(adapter.storeId, patch);
        });
    }

    private queuePatch(storeId: string, patch: any) {
        this.pending[storeId] = {
            ...(this.pending[storeId] ?? {}),
            ...patch
        };
        this.flushPending();
    }

    private handleIncoming(payload: { id: string; data: any }) {
        const adapter = this.adapters.get(payload.id);
        if (!adapter || !adapter.ready) return;

        this.isApplyingRemote = true;
        try {
            adapter.applyPatch(payload.data);
        } finally {
            this.isApplyingRemote = false;
        }
    }
}

function debounce(fn: Function, wait: number) {
    let timeout: any;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), wait);
    };
}
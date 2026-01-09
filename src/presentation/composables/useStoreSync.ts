import type { StoreSyncPluginApi } from "@/plugins/storeSyncPlugin/storeSyncPluginApi";
import { inject } from "vue";


export function useStoreSync() {
    return inject<StoreSyncPluginApi>("storeSync")!;
}
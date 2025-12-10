import { App } from "vue";
import { StoreSyncService } from "./storeSyncService";
import { broadcastChannelService } from "@/infrastructure/services/broadcastChannelService";

export interface StoreSyncPluginApi {
    registerStore: StoreSyncService["registerStore"];
    service: StoreSyncService
}

export default {
    install(app: App) {
        const service = new StoreSyncService(broadcastChannelService);

        const api: StoreSyncPluginApi = {
            registerStore: service.registerStore.bind(service),
            service
        };

        app.provide("storeSync", api);
        app.config.globalProperties.$storeSync = api;
    }
};
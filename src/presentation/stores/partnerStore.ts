import { PartnerDTO } from '@/application/dto/partnerDTO';
import { PartnerType } from '@/domain/partner/partnerTypes';
import { StoreSyncAdapter } from '@/plugins/storeSyncPlugin/storeSyncAdapter';
import { defineStore } from 'pinia';

export const usePartnersStore = defineStore('partners', {
    state: () => ({
        partners: [] as PartnerDTO[]
    }),
    getters: {
        all: (state) => state.partners,
        getById: (state) => (id: string) => 
            state.partners.find(p => p.id === id),
        getByType: (state) => (type: PartnerType) =>
            state.partners.filter(p => p.type === type),
    },
    actions: {
        setPartners(partners: PartnerDTO[]) {
            this.partners = partners;
        },
        add(partner: PartnerDTO) {
            this.partners.push(partner);
        },
        update(updatedPartner: PartnerDTO) {
            const index = this.partners.findIndex(p => p.id === updatedPartner.id);
            if (index !== -1) {
                this.partners[index] = updatedPartner;
            }
        },
        remove(id: string) {
            this.partners = this.partners.filter(p => p.id !== id);
        }
    }
});

export function createPartnerStoreSyncAdapter(): StoreSyncAdapter {
    const store = usePartnersStore();
    type State = typeof store.$state;

    let lastState: State = clone(store.$state);

    const adapter: StoreSyncAdapter<State> = {
        storeId: "partners",
        ready: false,

        getState: () => clone(store.$state),

        onChange(callback: (patch: Partial<State>) => void) {
            store.$subscribe((_mutation, state) => {
                const patch: Partial<State> = {};
                const keys = Object.keys(state) as (keyof State)[];

                for (const key of keys) {
                    const newVal = state[key];
                    const oldVal = lastState[key];

                    if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                        patch[key] = clone(newVal);
                    }
                }

                if (Object.keys(patch).length > 0) {
                    callback(patch);
                    lastState = clone(state);
                }
            });
        },

        applyPatch(patch: Partial<State>) {
            store.$patch(patch);
            lastState = clone(store.$state);
        }
    };

    return adapter;
}

function clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}
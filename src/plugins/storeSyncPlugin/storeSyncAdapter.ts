import { type Store } from "pinia";

export interface StoreSyncAdapter<State = any> {
    storeId: string;
    getState: () => State;
    onChange: (cb: (patch: Partial<State>) => void) => void;
    applyPatch: (patch: Partial<State>) => void;
    ready: boolean;
}

function clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function createStoreSyncAdapter<S extends object>(store: Store<string, S>): StoreSyncAdapter<S> {
    let lastState: S = clone(store.$state) as S;

    const adapter: StoreSyncAdapter<S> = {
        storeId: store.$id,
        ready: false,

        getState: () => clone(store.$state) as S,

        onChange(callback: (patch: Partial<S>) => void) {
            store.$subscribe((_mutation, state) => {
                const patch: Partial<S> = {};

                const s = state as unknown as Record<keyof S, any>;
                const keys = Object.keys(state as S) as (keyof S)[];
                for (const key of keys) {
                    const newVal = s[key];
                    const oldVal = lastState[key];

                    if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                        patch[key] = clone(newVal);
                    }
                }

                if (Object.keys(patch).length > 0) {
                    callback(patch);
                    lastState = clone(state) as S;
                }
            });
        },

        applyPatch(patch: Partial<S>) {
            store.$patch(patch as S);
            lastState = clone(store.$state) as S;
        }
    }

    return adapter;
}
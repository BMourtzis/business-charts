export interface StoreSyncAdapter<State = any> {
    storeId: string;
    getState: () => State;
    onChange: (cb: (patch: Partial<State>) => void) => void;
    applyPatch: (patch: Partial<State>) => void;
    ready: boolean;
}
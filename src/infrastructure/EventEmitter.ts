export class EventEmitter<T = void> {
    private listeners = new Set<(payload: T) => void>();

    subscribe(cb: (payload: T) => void) {
        this.listeners.add(cb);
    }

    unsuscribe(cb: (payload: T) => void) {
        this.listeners.delete(cb);
    }

    emit(payload: T) {
        this.listeners
            .forEach(listener => listener(payload));
    }
}
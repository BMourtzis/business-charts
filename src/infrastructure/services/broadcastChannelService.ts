type MessageBase = { type: string; payload?: any; };

export class BroadcastChannelService {
    private channel: BroadcastChannel;
    private subscribers = new Map<string, Set<(payload: any) => void>>();

    constructor(channelName: string) {
        this.channel = new BroadcastChannel(channelName);

        this.channel.onmessage = (event) => {
            const message = event.data as MessageBase;

            const subs = this.subscribers.get(message.type);
            if (subs) {
                subs.forEach(callback => callback(message.payload));
            }
        };
    }

    publish(type: string, payload?: any, id?: string) {
        this.channel.postMessage({ type, payload, id });
    }

    subscribe(type: string, callback: (payload: any) => void) {
        if (!this.subscribers.has(type)) {
            this.subscribers.set(type, new Set());
        }

        this.subscribers.get(type)!.add(callback);

        return () => {
            this.subscribers.get(type)!.delete(callback);
        }
    }
}

const bcChannelName = 'business-charts-channel';

export const broadcastChannelService = new BroadcastChannelService(bcChannelName);
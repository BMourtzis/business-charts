import { LoadPartnersCommandHandler } from "../commands/loadPartnersCommand";


export async function initApplication() {
    await Promise.all([
        new LoadPartnersCommandHandler().handle()
    ]);
}
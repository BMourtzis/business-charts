import { LoadPartnersCommandHandler } from "../commands/partner/loadPartnersCommand";


export async function initApplication() {
    await Promise.all([
        new LoadPartnersCommandHandler().handle()
    ]);
}
import { FilePersistenceService } from '@/infrastructure/services/filePersistenceService';
import { LoadPartnersCommandHandler } from './partner/loadPartnersCommand';
import { LoadDeliveryCarriersCommandHandler } from './deliveryCarrier/loadDeliveryCarriersCommand';

export interface ImportDataCommand {
    file: File
    includeOrders: boolean,
    includePartners: boolean,
    includeCarriers: boolean
}

export class ImportDataCommandHandler {
    private _fileService: FilePersistenceService;
    private _loadPartnersCommandHandler: LoadPartnersCommandHandler;
    private _loadDeliveryCarriesCommandHandler: LoadDeliveryCarriersCommandHandler;

    constructor(fileService: FilePersistenceService) {
        this._fileService = fileService;
        this._loadPartnersCommandHandler = new LoadPartnersCommandHandler();
        this._loadDeliveryCarriesCommandHandler = new LoadDeliveryCarriersCommandHandler();
        
    }

    async handle(cmd: ImportDataCommand) {
        await this._fileService.importAll(
            cmd.file,
            cmd.includePartners,
            cmd.includeCarriers,
            cmd.includeOrders
        );

        if(cmd.includePartners) await this._loadPartnersCommandHandler.handle();
        if(cmd.includeCarriers) await this._loadDeliveryCarriesCommandHandler.handle();
    }
}
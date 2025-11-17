import { FilePersistenceService } from '@/infrastructure/services/filePersistenceService';
import { LoadPartnersCommandHandler } from './partner/loadPartnersCommand';
import { LoadDeliveryCarriersCommandHandler } from './deliveryCarrier/loadDeliveryCarriersCommand';

export interface ImportDataCommand {
    file: File
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
        await this._fileService.importAll(cmd.file);

        this._loadPartnersCommandHandler.handle();
         this._loadDeliveryCarriesCommandHandler.handle();
    }
}
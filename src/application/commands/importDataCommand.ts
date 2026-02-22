import { FilePersistenceService } from '@/infrastructure/services/filePersistenceService';
import { LoadPartnersCommandHandler } from './partner/loadPartnersCommand';
import { LoadDeliveryCarriersCommandHandler } from './deliveryCarrier/loadDeliveryCarriersCommand';
import { LoadOrdersCommandHandler } from './order/loadOrdersCommand';
import { LoadMoneyMovementsCommandHandler } from './moneyMovement/loadMoneyMovementsCommand';

export interface ImportDataCommand {
    file: File
    includeOrders: boolean,
    includePartners: boolean,
    includeCarriers: boolean,
    includeMovements: boolean,
}

export class ImportDataCommandHandler {
    private _fileService: FilePersistenceService;
    private _loadPartnersCommandHandler: LoadPartnersCommandHandler;
    private _loadDeliveryCarriesCommandHandler: LoadDeliveryCarriersCommandHandler;
    private _loadOrdersCommandHandler: LoadOrdersCommandHandler;
    private _loadMoneyMovementCommandHandler: LoadMoneyMovementsCommandHandler;

    constructor(fileService: FilePersistenceService) {
        this._fileService = fileService;
        this._loadPartnersCommandHandler = new LoadPartnersCommandHandler();
        this._loadDeliveryCarriesCommandHandler = new LoadDeliveryCarriersCommandHandler();
        this._loadOrdersCommandHandler = new LoadOrdersCommandHandler();
        this._loadMoneyMovementCommandHandler = new LoadMoneyMovementsCommandHandler();
    }

    async handle(cmd: ImportDataCommand) {
        await this._fileService.importAll(
            cmd.file,
            cmd.includePartners,
            cmd.includeCarriers,
            cmd.includeOrders,
            cmd.includeMovements
        );

        if(cmd.includePartners) await this._loadPartnersCommandHandler.handle();
        if(cmd.includeCarriers) await this._loadDeliveryCarriesCommandHandler.handle();
        if(cmd.includeOrders) await this._loadOrdersCommandHandler.handle();
        if(cmd.includeMovements) await this._loadMoneyMovementCommandHandler.handle();
    }
}
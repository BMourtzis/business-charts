import { FilePersistenceService } from '@/infrastructure/services/filePersistenceService';

export interface ExportDataCommand {
    includePartners: boolean;
    includeOrders: boolean;
}

export class ExportDataCommandHandler {
    private _fileService: FilePersistenceService;

    constructor(fileService: FilePersistenceService) {
        this._fileService = fileService;
    }

    async handle(cmd: ExportDataCommand) {
        await this._fileService.exportAll(
            cmd.includePartners,
            cmd.includeOrders
        );
    }
}
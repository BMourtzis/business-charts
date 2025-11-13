import { FilePersistenceService } from '@/infrastructure/services/filePersistenceService';

export interface ExportAllDataCommand {
    includePartners: boolean;
    includeOrders: boolean;
}

export class ExportAllDataCommandHandler {
    private _fileService: FilePersistenceService;

    constructor(fileService: FilePersistenceService) {
        this._fileService = fileService;
    }

    async handle(cmd: ExportAllDataCommand) {
        await this._fileService.exportAll(
            cmd.includePartners,
            cmd.includeOrders
        );
    }
}
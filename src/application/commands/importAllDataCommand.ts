import { FilePersistenceService } from '@/infrastructure/services/filePersistenceService';
import { LoadPartnersCommandHandler } from './loadPartnersCommand';

export interface ImportAllDataCommand {
    file: File
}

export class ImportAllDataCommandHandler {
    private _fileService: FilePersistenceService;
    private _loadPartnersCommandHandler: LoadPartnersCommandHandler;

    constructor(fileService: FilePersistenceService) {
        this._fileService = fileService;
        this._loadPartnersCommandHandler = new LoadPartnersCommandHandler();
    }

    async handle(cmd: ImportAllDataCommand) {
        await this._fileService.importAll(cmd.file);

        this._loadPartnersCommandHandler.handle();
    }
}
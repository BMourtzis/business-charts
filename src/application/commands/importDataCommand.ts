import { FilePersistenceService } from '@/infrastructure/services/filePersistenceService';
import { LoadPartnersCommandHandler } from './loadPartnersCommand';

export interface ImportDataCommand {
    file: File
}

export class ImportDataCommandHandler {
    private _fileService: FilePersistenceService;
    private _loadPartnersCommandHandler: LoadPartnersCommandHandler;

    constructor(fileService: FilePersistenceService) {
        this._fileService = fileService;
        this._loadPartnersCommandHandler = new LoadPartnersCommandHandler();
    }

    async handle(cmd: ImportDataCommand) {
        await this._fileService.importAll(cmd.file);

        this._loadPartnersCommandHandler.handle();
    }
}
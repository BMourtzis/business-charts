import { FilePersistenceService } from '@/infrastructure/services/filePersistenceService';
import { loadPartners } from './loadPartnersCommand';

export class ImportAllDataCommand {
    constructor(private fileService: FilePersistenceService) {}

    async execute(file: File): Promise<void> {
        await this.fileService.importAll(file);

        //TODO: probably encapsulate all the calls to a separate command
        //load data to store
        loadPartners();
    }
}
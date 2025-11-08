import { FilePersistenceService } from '@/infrastructure/services/filePersistenceService';

export class ExportAllDataCommand {
    constructor(private fileService: FilePersistenceService) {}

    async execute(): Promise<void> {
        await this.fileService.exportAll()
    }
}
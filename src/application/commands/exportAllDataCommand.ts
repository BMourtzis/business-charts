import { FilePersistenceService } from '@/infrastructure/services/filePersistenceService';

export async function exportAllDataCommand(): Promise<void> {
    const fileService = new FilePersistenceService();
    await fileService.exportAll()
}
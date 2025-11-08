import { FilePersistenceService } from '@/infrastructure/services/filePersistenceService';
import { loadPartners } from './loadPartnersCommand';

export async function importAllDataCommand(file: File): Promise<void> {
    const fileService = new FilePersistenceService();
    await fileService.importAll(file);

    //TODO: probably encapsulate all the calls to a separate command
    loadPartners();
}
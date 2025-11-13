import { DeleteDataCommandHandler } from '@/application/commands/deleteDataCommand';
import { ExportDataCommandHandler } from '@/application/commands/exportDataCommand';
import { ImportDataCommandHandler } from '@/application/commands/importDataCommand';
import { FilePersistenceService } from '@/infrastructure/services/filePersistenceService';

export function useDataManagement() {
    const filePersistenceService = new FilePersistenceService();
    
    return { 
        exportAllData: new ExportDataCommandHandler(filePersistenceService), 
        importAllDataCommandHandler: new ImportDataCommandHandler(filePersistenceService),
        deleteAllDataCommandHandler: new DeleteDataCommandHandler()
    };
}
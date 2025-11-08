import { ExportAllDataCommand } from '@/application/commands/exportAllDataCommand';
import { ImportAllDataCommand } from '@/application/commands/importAllDataCommand';
import { FilePersistenceService } from '@/infrastructure/services/filePersistenceService';

export function useDataManagement() {
    const filePersistenceService = new FilePersistenceService();
    const exportCmd = new ExportAllDataCommand(filePersistenceService);
    const importCmd = new ImportAllDataCommand(filePersistenceService);

    return { 
        exportData: () => exportCmd.execute(), 
        importData: (file: File) => importCmd.execute(file)
    };
}
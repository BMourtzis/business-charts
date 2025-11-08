import { exportAllDataCommand } from '@/application/commands/exportAllDataCommand';
import { importAllDataCommand } from '@/application/commands/importAllDataCommand';

export function useDataManagement() {
    return { 
        exportData: exportAllDataCommand, 
        importData: (file: File) => importAllDataCommand(file)
    };
}
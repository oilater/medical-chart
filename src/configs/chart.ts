import { Colors } from '../theme/colors';
import type { ChartConfig } from '../types/chart';

export const ChartConfigs: Record<string, ChartConfig> = {
  MedicalExpense: {
    xAxisKey: 'department',
    yAxisKeys: [
      {
        key: 'patientCount',
        color: Colors.pink300,
        name: '환자수',
        yAxisId: 'left',
        yAxisColor: Colors.pink300,
      },
      {
        key: 'daysInHospital',
        color: Colors.blue500,
        name: '입∙내원일수',
        yAxisId: 'right',
        yAxisColor: Colors.blue500,
      },
    ],
  },
};

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  type Chart as ChartType,
  type ChartData,
  type ChartOptions,
  type Plugin,
  type LegendItem,
  type TooltipItem,
  type ActiveElement,
  type ChartEvent,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const centerTextPlugin: Plugin<'doughnut'> = {
  id: 'centerText',
  beforeDraw: (chart) => {
    const { ctx, chartArea } = chart as ChartType<'doughnut'>;
    
    if (!chartArea) return;
    
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const centerX = chartArea.left + chartArea.width / 2;
    const centerY = chartArea.top + chartArea.height / 2;
    
    ctx.font = 'bold 46px Inter, sans-serif';
    ctx.fillStyle = '#024E8D';
    ctx.fillText('80', centerX, centerY - 10);

    ctx.font = '10px Inter, sans-serif';
    ctx.fillStyle = '#666666';
    ctx.fillText('PARCELAS', centerX, centerY + 20);
    ctx.fillText('VENCIDAS', centerX, centerY + 32);
    
    ctx.restore();
  }
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  centerTextPlugin
);

const ChartComponent: React.FC = () => {
  const data: ChartData<'doughnut'> = {
    labels: ['Próximas do vencimento', 'Vencidas recentemente', 'Vencidas 6 a 30 dias', 'Vencidas 31 a 60 dias', 'Acimas de 61 dias.'],
    datasets: [
      {
        data: [35, 25, 20, 20, 5],
        backgroundColor: [
          '#024E8D',
          '#00326B',
          '#3E7301',
          '#709C02',
          '#035847',
        ],
        borderWidth: 0,
      },
    ],
  };

  const urls = [
    '/proximas-vencimento',
    '/vencidas-recentemente', 
    '/vencidas-6-30-dias',
    '/vencidas-31-60-dias',
    '/acima-61-dias'
  ];

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    onClick: (
      _event: ChartEvent,
      elements: ActiveElement[],
      _chart: ChartType<'doughnut'>
    ) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const url = urls[index];
        window.open(url, '_blank');
      }
    },
    onHover: (
      _event: ChartEvent,
      elements: ActiveElement[],
      chart: ChartType<'doughnut'>
    ) => {
      chart.canvas.style.cursor = elements.length > 0 ? 'pointer' : 'default';
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        align: 'start' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 14,
            family: 'Inter, sans-serif',
          },
          textAlign: 'left' as const,
          generateLabels: (chart): LegendItem[] => {
            const chartTyped = chart as ChartType<'doughnut'>;
            const dataLocal = chartTyped.data;
            if (dataLocal.labels && dataLocal.labels.length && dataLocal.datasets.length) {
              const dataset = dataLocal.datasets[0];
              const values = dataset.data as number[];
              const colors = dataset.backgroundColor as string[];
              return (dataLocal.labels as string[]).map((label: string, i: number) => ({
                text: `${label}: ${values[i]}`,
                fillStyle: colors[i],
                strokeStyle: colors[i],
                lineWidth: 0,
                pointStyle: 'rect',
                hidden: false,
                index: i,
              }));
            }
            return [];
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'doughnut'>) => {
            const label = context.label || '';
            const value = context.parsed;
            
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg max-w-md mx-auto font-sans">
      <div className="h-80 relative flex items-center justify-center">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartComponent;

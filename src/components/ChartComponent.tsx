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
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart: any) => {
    const { ctx, chartArea } = chart;
    
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
  const data = {
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
        cutout: '70%',
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (event: any, elements: any) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const url = urls[index];
        window.open(url, '_blank');
      }
    },
    onHover: (event: any, elements: any) => {
      const canvas = event.native.target;
      if (elements.length > 0) {
        canvas.style.cursor = 'pointer';
      } else {
        canvas.style.cursor = 'default';
      }
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
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const dataset = data.datasets[0];
                const value = dataset.data[i];
                return {
                  text: `${label}: ${value}`,
                  fillStyle: dataset.backgroundColor[i],
                  strokeStyle: dataset.backgroundColor[i],
                  lineWidth: 0,
                  pointStyle: 'rect',
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
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

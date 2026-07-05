import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart3, LineChart } from 'lucide-react';

interface AnalyticsData {
  title: string;
  value: number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
  chartData?: number[];
}

interface AnalyticsCardProps {
  data: AnalyticsData;
  className?: string;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ data, className = '' }) => {
  const { title, value, unit = '', trend, trendValue, chartData } = data;

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : BarChart3;

  // Simple sparkline chart
  const SparklineChart = ({ data }: { data: number[] }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="h-16 w-full relative">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          />
        </svg>
      </div>
    );
  };

  return (
    <Card className={`glass-card hover-lift ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </span>
              {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            </div>
          </div>
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            <TrendIcon className="w-4 h-4" />
            {trendValue && (
              <span className="text-sm font-medium">
                {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{trendValue}%
              </span>
            )}
          </div>
        </div>
        
        {chartData && chartData.length > 0 && (
          <div className="mt-4">
            <SparklineChart data={chartData} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
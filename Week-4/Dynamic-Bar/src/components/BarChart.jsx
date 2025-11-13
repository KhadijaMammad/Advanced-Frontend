import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export const BarChart = ({ data, width = 800, height = 400 }) => {
  const { theme } = useTheme();
  const [tooltip, setTooltip] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({});
  const svgRef = useRef(null);

  const padding = { top: 40, right: 40, bottom: 60, left: 80 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Safely extract data
  const categories = data && typeof data === 'object' ? Object.keys(data) : [];
  const values = data && typeof data === 'object' ? Object.values(data).map(v => Number(v) || 0) : [];
  const maxValue = values.length > 0 ? Math.max(...values, 1) : 1;

  const barWidth = categories.length > 0 ? Math.max(chartWidth / categories.length, 1) : chartWidth;
  const barGap = Math.min(barWidth * 0.2, 10);
  const actualBarWidth = Math.max(barWidth - barGap, 1);

  useEffect(() => {
    if (!data || typeof data !== 'object' || categories.length === 0) {
      setAnimatedValues({});
      return;
    }

    const animationDuration = 800;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);

      const newAnimatedValues = {};
      categories.forEach((category) => {
        const value = Number(data[category]) || 0;
        newAnimatedValues[category] = value * easedProgress;
      });

      setAnimatedValues(newAnimatedValues);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [data, categories.length]);

  const handleMouseMove = (event, category, value) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      category,
      value,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const getColor = (index) => {
    const colors = theme === 'dark'
      ? ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
      : ['#2563eb', '#059669', '#d97706', '#dc2626', '#7c3aed'];
    return colors[index % colors.length];
  };

  const textColor = theme === 'dark' ? '#e5e7eb' : '#1f2937';
  const gridColor = theme === 'dark' ? '#374151' : '#d1d5db';
  const bgColor = theme === 'dark' ? '#1f2937' : '#ffffff';

  const yAxisTicks = 5;

  // Render empty state if no data
  if (!data || typeof data !== 'object' || categories.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500 dark:text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <div className="relative">
      <svg ref={svgRef} width={width} height={height} className="transition-colors duration-300">
        <rect width={width} height={height} fill={bgColor} rx="8" />

        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {[...Array(yAxisTicks + 1)].map((_, i) => {
            const y = chartHeight - (chartHeight / yAxisTicks) * i;
            const value = (maxValue / yAxisTicks) * i;
            return (
              <g key={i}>
                <line
                  x1={0}
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke={gridColor}
                  strokeWidth="1"
                  strokeDasharray="4"
                />
                <text
                  x={-10}
                  y={y}
                  textAnchor="end"
                  alignmentBaseline="middle"
                  fill={textColor}
                  fontSize="12"
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  ${(value / 1000).toFixed(1)}k
                </text>
              </g>
            );
          })}

          {categories.map((category, index) => {
            const value = animatedValues[category] || 0;
            const barHeight = maxValue > 0 ? (value / maxValue) * chartHeight : 0;
            const x = index * barWidth + barGap / 2;
            const y = chartHeight - barHeight;

            return (
              <g key={category}>
                <rect
                  x={x}
                  y={y}
                  width={actualBarWidth}
                  height={Math.max(barHeight, 0)}
                  fill={getColor(index)}
                  onMouseMove={(e) => handleMouseMove(e, category, data[category])}
                  onMouseLeave={handleMouseLeave}
                  className="cursor-pointer transition-opacity duration-200 hover:opacity-80"
                  rx="4"
                />
                <text
                  x={x + actualBarWidth / 2}
                  y={chartHeight + 20}
                  textAnchor="middle"
                  fill={textColor}
                  fontSize="12"
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  {category}
                </text>
              </g>
            );
          })}

          <line
            x1={0}
            y1={chartHeight}
            x2={chartWidth}
            y2={chartHeight}
            stroke={textColor}
            strokeWidth="2"
          />
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={chartHeight}
            stroke={textColor}
            strokeWidth="2"
          />
        </g>

        <text
          x={width / 2}
          y={20}
          textAnchor="middle"
          fill={textColor}
          fontSize="18"
          fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Sales by Category
        </text>

        <text
          x={padding.left / 2}
          y={height / 2}
          textAnchor="middle"
          fill={textColor}
          fontSize="14"
          fontFamily="system-ui, -apple-system, sans-serif"
          transform={`rotate(-90, ${padding.left / 2}, ${height / 2})`}
        >
          Sales Value
        </text>

        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          fill={textColor}
          fontSize="14"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Category
        </text>
      </svg>

      {tooltip && (
        <div
          className="fixed pointer-events-none z-50 px-3 py-2 text-sm rounded-lg shadow-lg transition-colors duration-300 bg-gray-900 dark:bg-gray-700 text-white"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 50}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="font-semibold">{tooltip.category}</div>
          <div>${tooltip.value.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
};
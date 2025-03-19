import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi } from 'lightweight-charts';
import { Stock } from '../types';

interface Props {
  stock: Stock;
}

export const PriceChart: React.FC<Props> = ({ stock }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartOptions = {
      layout: {
        background: { type: ColorType.Solid, color: '#1c1c24' },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: '#2d2d3d' },
        horzLines: { color: '#2d2d3d' },
      },
      crosshair: {
        mode: 0,
        vertLine: {
          color: '#555669',
          labelBackgroundColor: '#555669',
        },
        horzLine: {
          color: '#555669',
          labelBackgroundColor: '#555669',
        },
      },
      rightPriceScale: {
        borderColor: '#2d2d3d',
      },
      timeScale: {
        borderColor: '#2d2d3d',
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    };

    const chart = createChart(chartContainerRef.current, chartOptions);
    chartRef.current = chart;

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });

    // Generate realistic-looking candlestick data
    const basePrice = stock.price;
    const currentTime = new Date();
    const data = Array.from({ length: 100 }, (_, i) => {
      const time = new Date(currentTime);
      time.setMinutes(time.getMinutes() - (100 - i));
      
      const volatility = basePrice * 0.02; // 2% volatility
      const randomWalk = (Math.random() - 0.5) * volatility;
      const open = basePrice + randomWalk;
      const close = open + (Math.random() - 0.5) * volatility;
      const high = Math.max(open, close) + Math.random() * volatility * 0.5;
      const low = Math.min(open, close) - Math.random() * volatility * 0.5;

      return {
        time: time.getTime() / 1000,
        open,
        high,
        low,
        close,
      };
    });

    candlestickSeries.setData(data);

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      color: '#3b82f6',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '', // Set as an overlay
    });

    const volumeData = data.map((candle) => ({
      time: candle.time,
      value: Math.floor(Math.random() * 1000) + 100,
      color: candle.close >= candle.open ? '#22c55e44' : '#ef444444',
    }));

    volumeSeries.setData(volumeData);

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [stock]);

  return <div ref={chartContainerRef} className="w-full h-[400px]" />;
};
"use client"

import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

interface OverViewProps {
  data: any[];
}

interface CustomTooltipProps {
  payload: any;
  label: string;
  active: boolean;
}

export const OverView: React.FC<OverViewProps> = ({
  data
}) => {
  return(
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis 
          dataKey="name" 
          stroke="#888888"
          fontSize={12} 
          tickLine={false} 
          axisLine={false}
        />
        <YAxis 
          stroke="#888888"
          fontSize={12} 
          tickLine={false} 
          axisLine={false}
          tickFormatter={(value) => `S/ ${value}`}
        />
        <Tooltip />
        <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
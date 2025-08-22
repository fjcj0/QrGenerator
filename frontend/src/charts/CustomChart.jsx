import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const CustomAreaChart = ({ weekData }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={weekData || []}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#E91E63" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#E91E63" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" stroke="#aaa" axisLine={false} tickLine={false} />
        <YAxis stroke="#aaa" axisLine={false} tickLine={false} />
        <Tooltip />

        <Area
          type="monotone"
          dataKey="value"  
          stroke="#E91E63"
          fillOpacity={1}
          fill="url(#colorValue)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default CustomAreaChart;
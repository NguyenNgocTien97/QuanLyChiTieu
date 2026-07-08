'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { formatCurrency } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface TrendData {
  day: string;
  expenseThisWeek: number;
  incomeThisWeek: number;
  expenseLastWeek: number;
  incomeLastWeek: number;
}

export default function TrendChart({ data, lang = 'vi' }: { data: TrendData[], lang?: string }) {
  const [selectedWeek, setSelectedWeek] = useState<'thisWeek' | 'lastWeek'>('thisWeek');
  const [showDropdown, setShowDropdown] = useState(false);
  
  const thisWeekLabel = lang === 'vi' ? 'Tuần này' : 'This week';
  const lastWeekLabel = lang === 'vi' ? 'Tuần trước' : 'Last week';
  const limitLabel = lang === 'vi' ? 'Giới hạn ngày: 250k' : 'Daily limit: 250k';

  const incomeLabel = lang === 'vi' ? 'Thu nhập' : 'Income';
  const expenseLabel = lang === 'vi' ? 'Chi tiêu' : 'Expense';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <div className="custom-select-wrapper" style={{ width: '130px' }}>
          <div 
            className="input-field custom-select-trigger" 
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ 
              padding: '6px 12px', 
              borderRadius: '16px', 
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg)',
              color: 'var(--color-text-primary)',
              fontSize: '13px',
              minHeight: 'auto',
              boxShadow: 'none'
            }}
          >
            <span>{selectedWeek === 'thisWeek' ? thisWeekLabel : lastWeekLabel}</span>
            <ChevronDown size={14} color="var(--color-text-secondary)" />
          </div>
          {showDropdown && (
            <>
              <div className="dropdown-overlay" onClick={() => setShowDropdown(false)}></div>
              <div className="custom-dropdown" style={{ minWidth: '100%' }}>
                <div 
                  className={`dropdown-item ${selectedWeek === 'thisWeek' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedWeek('thisWeek');
                    setShowDropdown(false);
                  }}
                  style={{ padding: '8px 12px', fontSize: '13px' }}
                >
                  {thisWeekLabel}
                </div>
                <div 
                  className={`dropdown-item ${selectedWeek === 'lastWeek' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedWeek('lastWeek');
                    setShowDropdown(false);
                  }}
                  style={{ padding: '8px 12px', fontSize: '13px' }}
                >
                  {lastWeekLabel}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }}
              dy={10}
              interval={0}
            />
            <YAxis hide />
            <Tooltip 
              formatter={(value: any) => [formatCurrency(Number(value) || 0), '']}
              labelStyle={{ color: 'var(--color-text-secondary)' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-level-1)' }}
            />
            <ReferenceLine y={250000} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: limitLabel, fill: '#ef4444', fontSize: 10 }} />
            {selectedWeek === 'thisWeek' ? (
              <>
                <Bar dataKey="incomeThisWeek" name={incomeLabel} fill="var(--color-income)" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="expenseThisWeek" name={expenseLabel} fill="var(--color-expense)" radius={[4, 4, 0, 0]} barSize={12} />
              </>
            ) : (
              <>
                <Bar dataKey="incomeLastWeek" name={incomeLabel} fill="var(--color-income)" radius={[4, 4, 0, 0]} barSize={12} opacity={0.6} />
                <Bar dataKey="expenseLastWeek" name={expenseLabel} fill="var(--color-expense)" radius={[4, 4, 0, 0]} barSize={12} opacity={0.6} />
              </>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

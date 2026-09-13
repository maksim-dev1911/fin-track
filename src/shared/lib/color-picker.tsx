import React from 'react';

import { cn } from '@/shared/lib/utils.ts';

const AVAILABLE_COLORS = [
  { hex: '#eab308', bgClass: 'bg-[#eab308]', ringClass: 'ring-[#eab308]' },
  { hex: '#3b82f6', bgClass: 'bg-[#3b82f6]', ringClass: 'ring-[#3b82f6]' },
  { hex: '#a855f7', bgClass: 'bg-[#a855f7]', ringClass: 'ring-[#a855f7]' },
  { hex: '#ec4899', bgClass: 'bg-[#ec4899]', ringClass: 'ring-[#ec4899]' },
  { hex: '#ef4444', bgClass: 'bg-[#ef4444]', ringClass: 'ring-[#ef4444]' },
  { hex: '#f97316', bgClass: 'bg-[#f97316]', ringClass: 'ring-[#f97316]' },
  { hex: '#22c55e', bgClass: 'bg-[#22c55e]', ringClass: 'ring-[#22c55e]' },
  { hex: '#10b981', bgClass: 'bg-[#10b981]', ringClass: 'ring-[#10b981]' },
  { hex: '#6366f1', bgClass: 'bg-[#6366f1]', ringClass: 'ring-[#6366f1]' },
  { hex: '#1d4ed8', bgClass: 'bg-[#1d4ed8]', ringClass: 'ring-[#1d4ed8]' },
  { hex: '#7c3aed', bgClass: 'bg-[#7c3aed]', ringClass: 'ring-[#7c3aed]' },
];

type PropsType = {
  value?: string;
  onChange?: (colorId: string) => void;
};

const ColorPicker: React.FC<PropsType> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-muted-foreground text-sm font-medium">Color</span>

      <div className="grid grid-cols-9 gap-2">
        {AVAILABLE_COLORS.map((color) => {
          const isSelected = value === color.hex;

          return (
            <button
              key={color.hex}
              type="button"
              onClick={() => onChange?.(color.hex)}
              className={cn(
                'h-6 w-6 rounded-full transition-all duration-200 outline-none hover:scale-110',
                color.bgClass,
                isSelected && `dark:ring-offset-background ring-2 ring-offset-2 ${color.ringClass}`,
              )}
              aria-label={`Select ${color.hex} color`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(ColorPicker);

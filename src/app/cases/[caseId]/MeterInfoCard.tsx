"use client";
import React, { useState } from 'react';
import { BoltIcon, FireIcon, BeakerIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { MeterData } from '@/types';

interface MeterInfoCardProps {
  meterData: MeterData[];
}

type MeterType = 'electricity' | 'gas' | 'water';

interface MeterFormData {
  eanCode: string;
  meterNumber: string;
  meterReading: string;
}

const icons = {
  electricity: <BoltIcon className="h-7 w-7 text-[#884ACA] mr-2" />,
  gas: <FireIcon className="h-7 w-7 text-[#884ACA] mr-2" />,
  water: <BeakerIcon className="h-7 w-7 text-[#884ACA] mr-2" />,
};

const labels = {
  electricity: 'Elektriciteit',
  gas: 'Gas',
  water: 'Water',
};

// Add type for meter field names
type MeterFieldType = 'eanCode' | 'meterNumber' | 'meterReading';

export default function MeterInfoCard({ meterData }: MeterInfoCardProps) {
  // Update state to track the currently edited field for each meter type
  const [editingField, setEditingField] = useState<{ [key in MeterType]: MeterFieldType | null }>({
    electricity: null,
    gas: null,
    water: null,
  });

  const [form, setForm] = useState<{ [key in MeterType]: MeterFormData }>(() => {
    const initial: { [key in MeterType]: MeterFormData } = {
      electricity: { eanCode: '', meterNumber: '', meterReading: '' },
      gas: { eanCode: '', meterNumber: '', meterReading: '' },
      water: { eanCode: '', meterNumber: '', meterReading: '' },
    };

    meterData.forEach(meter => {
      if (meter.type in initial) {
        initial[meter.type as MeterType] = {
          eanCode: meter.eanCode || '',
          meterNumber: meter.meterNumber || '',
          meterReading: meter.meterReading || '',
        };
      }
    });

    return initial;
  });

  const meterTypes: MeterType[] = ['electricity', 'gas', 'water'];

  // Helper function to handle saving a field (closes the input)
  const handleSaveField = (type: MeterType) => {
    setEditingField(v => ({ ...v, [type]: null }));
    // TODO: Add actual save logic here (e.g., send data to backend)
  };

  // Helper function to handle canceling editing a field (closes the input)
  const handleCancelField = (type: MeterType) => {
    setEditingField(v => ({ ...v, [type]: null }));
    // TODO: Add logic to revert changes if necessary
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {meterTypes.map((type) => {
        const meter = meterData.find(m => m.type === type) as MeterData | undefined;
        const isComplete = Boolean(form[type].eanCode && form[type].meterNumber && form[type].meterReading);
        return (
          <div key={type} className="bg-gray-50 rounded-lg p-5 shadow-sm relative flex flex-col gap-2">
            {/* ... existing header with status */}
            <div className="flex items-center mb-2">
              {icons[type]}
              <span className="text-lg font-semibold text-[#884ACA] capitalize">
                {labels[type]}
              </span>
              <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${isComplete ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {isComplete ? 'Compleet' : 'Actie vereist'}
              </span>
            </div>
            
            {/* Inline editable fields */}
            <div className="grid grid-cols-1 gap-4 flex-1">
              {/* EAN-code */}
              <div>
                <span className="text-sm font-medium text-[#884ACA]">EAN-code</span>
                <div className="flex items-center justify-between gap-0.5">
                  {editingField[type] === 'eanCode' ? (
                    <input
                      type="text"
                      value={form[type].eanCode}
                      onChange={e => setForm(f => ({ ...f, [type]: { ...f[type], eanCode: e.target.value } }))}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  ) : (
                    <div className="text-base text-gray-700">{form[type].eanCode || <span className="italic text-gray-400">Ontbreekt</span>}</div>
                  )}
                  {editingField[type] === 'eanCode' ? (
                    <div className="flex gap-2">
                      <CheckIcon className="h-5 w-5 text-green-500 cursor-pointer" onClick={() => handleSaveField(type)} />
                      <XMarkIcon className="h-5 w-5 text-red-500 cursor-pointer" onClick={() => handleCancelField(type)} />
                    </div>
                  ) : (
                    <PencilIcon className="h-4 w-4 text-gray-500 cursor-pointer" onClick={() => setEditingField(v => ({ ...v, [type]: 'eanCode' }))} />
                  )}
                </div>
              </div>

              {/* Meternummer */}
              <div>
                <span className="text-sm font-medium text-[#884ACA]">Meternummer</span>
                 <div className="flex items-center justify-between gap-0.5">
                  {editingField[type] === 'meterNumber' ? (
                    <input
                      type="text"
                      value={form[type].meterNumber}
                      onChange={e => setForm(f => ({ ...f, [type]: { ...f[type], meterNumber: e.target.value } }))}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  ) : (
                    <div className="text-base text-gray-700">{form[type].meterNumber || <span className="italic text-gray-400">Ontbreekt</span>}</div>
                  )}
                  {editingField[type] === 'meterNumber' ? (
                    <div className="flex gap-2">
                      <CheckIcon className="h-5 w-5 text-green-500 cursor-pointer" onClick={() => handleSaveField(type)} />
                      <XMarkIcon className="h-5 w-5 text-red-500 cursor-pointer" onClick={() => handleCancelField(type)} />
                    </div>
                  ) : (
                    <PencilIcon className="h-4 w-4 text-gray-500 cursor-pointer" onClick={() => setEditingField(v => ({ ...v, [type]: 'meterNumber' }))} />
                  )}
                </div>
              </div>

              {/* Meterstand */}
              <div>
                <span className="text-sm font-medium text-[#884ACA]">Meterstand</span>
                 <div className="flex items-center justify-between gap-0.5">
                  {editingField[type] === 'meterReading' ? (
                    <input
                      type="text"
                      value={form[type].meterReading}
                      onChange={e => setForm(f => ({ ...f, [type]: { ...f[type], meterReading: e.target.value } }))}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  ) : (
                    <div className="text-base text-gray-700">{form[type].meterReading || <span className="italic text-gray-400">Ontbreekt</span>}</div>
                  )}
                   {editingField[type] === 'meterReading' ? (
                    <div className="flex gap-2">
                      <CheckIcon className="h-5 w-5 text-green-500 cursor-pointer" onClick={() => handleSaveField(type)} />
                      <XMarkIcon className="h-5 w-5 text-red-500 cursor-pointer" onClick={() => handleCancelField(type)} />
                    </div>
                  ) : (
                    <PencilIcon className="h-4 w-4 text-gray-500 cursor-pointer" onClick={() => setEditingField(v => ({ ...v, [type]: 'meterReading' }))} />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
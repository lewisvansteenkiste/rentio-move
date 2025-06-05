import { notFound } from 'next/navigation';
import { getMockCase } from '@/lib/mockCases'; // Pas aan naar jouw projectstructuur
import React from 'react';

export default async function EditMeterPage({ params }: { params: { caseId: string; service: string } }) {
  const caseData = await getMockCase(params.caseId);
  if (!caseData) return notFound();

  const meter = caseData.meterData.find(m => m.type === params.service) || {};

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-purple-700">Bewerk meterdata ({params.service})</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">EAN-code</label>
          <input
            type="text"
            name="eanCode"
            defaultValue={meter.eanCode || ''}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Meternummer</label>
          <input
            type="text"
            name="meterNumber"
            defaultValue={meter.meterNumber || ''}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Meterstand</label>
          <input
            type="text"
            name="meterReading"
            defaultValue={meter.meterReading || ''}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700 transition">Opslaan</button>
      </form>
    </div>
  );
} 
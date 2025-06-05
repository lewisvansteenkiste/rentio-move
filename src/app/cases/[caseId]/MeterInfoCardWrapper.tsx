"use client";

import dynamic from 'next/dynamic';
import type { MeterData } from '@/types';

// Dynamically import the MeterInfoCard with SSR disabled
const MeterInfoCard = dynamic(() => import('./MeterInfoCard'), { ssr: false });

interface MeterInfoCardWrapperProps {
  meterData: MeterData[];
}

// This client component wraps MeterInfoCard to handle dynamic import with ssr: false
export default function MeterInfoCardWrapper({ meterData }: MeterInfoCardWrapperProps) {
  return <MeterInfoCard meterData={meterData} />;
} 
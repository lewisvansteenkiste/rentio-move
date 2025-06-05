export type ServiceType = 'electricity' | 'gas' | 'water';

export type CaseStatus = 
  | 'pending_data'
  | 'data_complete'
  | 'submitted'
  | 'in_progress'
  | 'completed'
  | 'failed';

export type TenantStatus = 'contacted' | 'confirmed' | 'declined';

export interface Property {
  address: string;
  number: string;
  mailbox?: string;
  postalCode: string;
  city: string;
}

export interface Tenant {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status?: TenantStatus;
}

export interface MeterData {
  type: ServiceType;
  eanCode?: string;
  meterNumber?: string;
  meterReading?: string;
  meterImage?: string;
}

export interface EnergyTransferCase {
  id: string;
  property: Property;
  movingDate: string;
  departingTenant: Tenant;
  arrivingTenant: Tenant;
  services: ServiceType[];
  meterData: MeterData[];
  status: CaseStatus;
  brokerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Broker {
  id: string;
  name: string;
  email: string;
  company: string;
  cases: EnergyTransferCase[];
} 
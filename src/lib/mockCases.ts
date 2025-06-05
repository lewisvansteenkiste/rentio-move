import { EnergyTransferCase } from '@/types';

export const getMockCase = async (caseId: string): Promise<EnergyTransferCase | null> => {
  const mockCase: EnergyTransferCase = {
    id: "case-001",
    property: {
      address: "Kerkstraat",
      number: "123",
      mailbox: "A",
      postalCode: "1234 AB",
      city: "Amsterdam"
    },
    movingDate: "2024-05-01",
    departingTenant: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "+31612345678",
      status: "confirmed"
    },
    arrivingTenant: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phoneNumber: "+31687654321",
      status: "contacted"
    },
    services: ["electricity", "gas", "water"],
    meterData: [
      {
        type: "electricity",
        eanCode: "871234567890123456",
        meterNumber: "E12345678",
        meterReading: "12345.6"
      },
      {
        type: "gas",
        eanCode: "871234567890123457",
        meterNumber: "G87654321",
        meterReading: "987.6"
      },
      {
        type: "water"
        // meternummer en meterstand ontbreken voor demo
      }
    ],
    status: "in_progress",
    brokerId: "broker-001",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T14:30:00Z"
  };

  return mockCase.id === caseId ? mockCase : null;
}; 
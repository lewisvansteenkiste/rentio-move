import { EnergyTransferCase, TenantStatus } from '@/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

// Import the mock case data function
import { getMockCase } from '@/lib/mockCases';

// Import the wrapper component for MeterInfoCard
import MeterInfoCardWrapper from './MeterInfoCardWrapper';

// Status mapping voor UX
const statusMap = {
  pending: { icon: ClockIcon, color: 'text-yellow-500', text: 'In afwachting' },
  active: { icon: CheckCircleIcon, color: 'text-green-500', text: 'Actief' },
  cancelled: {
    icon: ExclamationCircleIcon,
    color: 'text-red-500',
    text: 'Geannuleerd',
  },
  completed: { icon: CheckCircleIcon, color: 'text-green-500', text: 'Voltooid' },
  // Add other statuses if needed
};


export default async function CaseDetailPage({ params }: { params: { caseId: string } }) {
  const { caseId } = params; // Ensure params is properly handled in server component

  // Fetch mock case data
  const caseData = await getMockCase(caseId);

  if (!caseData) {
    notFound(); // Or render a not found message
  }

  const statusInfo = statusMap[caseData.status as keyof typeof statusMap] || {
    icon: ExclamationCircleIcon,
    color: 'text-gray-500',
    text: caseData.status || 'Onbekend',
  };
  const StatusIcon = statusInfo.icon;

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-4 text-sm text-gray-500" aria-label="breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
              Dashboard
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center text-gray-700">Case {caseId}</li>
        </ol>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#884ACA]">
          Case {caseId}
        </h1>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
          <StatusIcon className={`-ml-1 mr-1.5 h-5 w-5 ${statusInfo.color}`} aria-hidden="true" />
          {statusInfo.text}
        </span>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Case Details
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Detailed information about the energy transfer case.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Case ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {caseData.id}
              </dd>
            </div>
            {/* Display other case details from mock data */}
             <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Adres</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {caseData.property.address} {caseData.property.number}
                {caseData.property.mailbox && ` ${caseData.property.mailbox}`}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Postcode en Plaats</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {caseData.property.postalCode} {caseData.property.city}
              </dd>
            </div>
             <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Verhuisdatum</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(caseData.movingDate).toLocaleDateString('nl-NL')}
              </dd>
            </div>
          </dl>
        </div>
      </div>

        {/* Sectie voor Betrokken Partijen (Vertrekker & Overnemer) from mock data*/}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Betrokken Partijen
                </h3>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    {/* Gegevens Vertrekker */}
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Vertrekker</dt>
                         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {caseData.departingTenant.firstName} {caseData.departingTenant.lastName}
                             <div>Email: {caseData.departingTenant.email}</div>
                             <div>Telefoon: {caseData.departingTenant.phoneNumber}</div>
                        </dd>
                    </div>
                    {/* Gegevens Overnemer */}
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                         <dt className="text-sm font-medium text-gray-500">Overnemer</dt>
                         <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {caseData.arrivingTenant.firstName} {caseData.arrivingTenant.lastName}
                             <div>Email: {caseData.arrivingTenant.email}</div>
                             <div>Telefoon: {caseData.arrivingTenant.phoneNumber}</div>
                         </dd>
                    </div>
                </dl>
            </div>
        </div>


      {/* Pass mock meterData to the MeterInfoCardWrapper */}
      <MeterInfoCardWrapper meterData={caseData.meterData} />

      {/* Add other sections of the page */}
    </div>
  );
} 
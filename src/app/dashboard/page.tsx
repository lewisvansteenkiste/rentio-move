import Link from 'next/link';
import {
  BoltIcon,
  FireIcon,
  BeakerIcon,
  ClockIcon,
  XCircleIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import {
  CheckCircleIcon as CheckCircleSolidIcon,
  XCircleIcon as XCircleSolidIcon
} from '@heroicons/react/24/solid';

// Hulp type voor status
type RentioMoveStatus = 'wacht_op_meterstand' | 'huurder_afgewezen' | 'verzonden_naar_luminus' | 'afgerond';

// Define the type for a case item
type RentioMoveCase = {
  id: string;
  naam_huurder: string;
  adres: string;
  postcode: string;
  gemeente: string;
  status: RentioMoveStatus;
};

// Helper function to get status icon and text
const getRentioMoveStatusInfo = (status: RentioMoveStatus) => {
  switch (status) {
    case 'wacht_op_meterstand':
      return {
        icon: ClockIcon,
        text: 'Wacht op meterstand',
        color: 'text-yellow-500'
      };
    case 'huurder_afgewezen':
      return {
        icon: XCircleIcon,
        text: 'Huurder afgewezen',
        color: 'text-red-500'
      };
    case 'verzonden_naar_luminus':
      return {
        icon: PaperAirplaneIcon,
        text: 'Verzonden naar Luminus',
        color: 'text-blue-500'
      };
    case 'afgerond':
      return {
        icon: CheckCircleIcon,
        text: 'Afgerond',
        color: 'text-green-500'
      };
    default:
      return {
        icon: ClockIcon,
        text: status || 'Onbekend',
        color: 'text-gray-500'
      };
  }
};

// Helper function to check if a service is completed
const isServiceCompleted = (caseData: any, serviceType: 'electricity' | 'gas' | 'water') => {
  if (serviceType === 'electricity') return Boolean(caseData['E_Stand']);
  if (serviceType === 'gas') return Boolean(caseData['G_Stand']);
  if (serviceType === 'water') return Boolean(caseData['W_Stand']);
  return false;
};

// Mock data (replace with actual data fetching logic later)
const mockCases: RentioMoveCase[] = [
  {
    id: '1',
    naam_huurder: 'Jan Jansen',
    adres: 'Voorbeeldstraat 1',
    postcode: '1234 AB',
    gemeente: 'Voorbeeldstad',
    status: 'wacht_op_meterstand',
  },
  {
    id: '2',
    naam_huurder: 'Piet Pietersen',
    adres: 'Andereweg 2',
    postcode: '5678 CD',
    gemeente: 'Andereplaats',
    status: 'huurder_afgewezen',
  },
  {
    id: '3',
    naam_huurder: 'Klaas Klaassen',
    adres: 'Nogeenlaan 3',
    postcode: '9012 EF',
    gemeente: 'Nogeenstad',
    status: 'verzonden_naar_luminus',
  },
  {
    id: '4',
    naam_huurder: 'Marie Mariessen',
    adres: 'Laatsteweg 4',
    postcode: '3456 GH',
    gemeente: 'Laatsteplaats',
    status: 'afgerond',
  },
];

// Maak de component asynchroon om data te kunnen fetchen
export default function Dashboard() {
  // Filter actieve cases (status is not afgerond)
  const activeCases = mockCases.filter(caseItem => caseItem.status !== 'afgerond');

  const inBehandeling = activeCases.filter(c => c.status === 'wacht_op_meterstand').length;
  const voltooid = activeCases.filter(c => c.status === 'afgerond').length;
  const afgewezen = activeCases.filter(c => c.status === 'huurder_afgewezen').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Verhuisdossiers</h1>
        <p className="mt-2 text-sm text-gray-700">
          Overzicht van alle actieve energie-overdrachten
        </p>
      </div>
      {/* Statistiek-overzicht */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-600">{inBehandeling}</span>
          <span className="text-sm text-gray-700 mt-1">In behandeling</span>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
          <span className="text-2xl font-bold text-green-600">{voltooid}</span>
          <span className="text-sm text-gray-700 mt-1">Voltooid</span>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
          <span className="text-2xl font-bold text-red-600">{afgewezen}</span>
          <span className="text-sm text-gray-700 mt-1">Afgewezen door huurder</span>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
           <span className="text-2xl font-bold text-gray-400">€ --</span>
           <span className="text-sm text-gray-700 mt-1">Verdiende Commissie</span>
           <span className="text-xs text-gray-500 italic">(Coming soon)</span>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Adres</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aanvraagdatum</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Verhuisdatum</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Diensten</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status Rentio Verhuis</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Verdiende Commissie</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acties</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activeCases.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    Geen actieve dossiers gevonden.
                  </td>
                </tr>
              ) : (
                activeCases.map((caseData: any) => {
                  const rentioMoveStatus: RentioMoveStatus = caseData.status;
                  const statusInfo = getRentioMoveStatusInfo(rentioMoveStatus);
                  const StatusIcon = statusInfo.icon;
                  
                  return (
                    <tr key={caseData.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm font-medium text-gray-900">
                          {caseData.adres} {caseData.huisnummer}
                          {caseData.mailbox && ` ${caseData.mailbox}`}
                        </div>
                        <div className="text-sm text-gray-500">
                          {caseData.postcode} {caseData.plaats}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {new Date(caseData.created_at).toLocaleDateString('nl-NL')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {new Date(caseData.verhuisdatum).toLocaleDateString('nl-NL')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center space-x-4">
                          {['electricity', 'gas', 'water'].map(serviceType => {
                            const isCompleted = isServiceCompleted(caseData, serviceType as any);
                            const ServiceIcon = serviceType === 'electricity' ? BoltIcon : serviceType === 'gas' ? FireIcon : BeakerIcon;
                            const StatusIcon = isCompleted ? CheckCircleSolidIcon : XCircleSolidIcon;

                            return (
                              <div key={serviceType} className="relative flex flex-col items-center" title={serviceType === 'electricity' ? 'Elektriciteit' : serviceType === 'gas' ? 'Gas' : 'Water'}>
                                <ServiceIcon className="h-6 w-6 text-gray-400" />
                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
                                  <StatusIcon className={`h-4 w-4 ${isCompleted ? 'text-green-500' : 'text-red-500'}`} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center items-center space-x-2">
                          <StatusIcon className={`h-5 w-5 ${statusInfo.color}`} />
                          <span className={`text-sm font-medium ${statusInfo.color}`}>
                            {statusInfo.text}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center italic">
                        Coming soon
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <Link
                          href={`/cases/${caseData.id}`}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 
import { RaceParticipantBase, RaceHeader } from '../types/race';

interface ParticipantDetailProps {
  participant: RaceParticipantBase;
  header: RaceHeader;
  onClose: () => void;
}

export function ParticipantDetail({
  participant,
  header,
  onClose,
}: ParticipantDetailProps) {
  return (
    <div className="participant-detail-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="participant-detail bg-white rounded-lg p-6 max-w-2xl w-full relative">
        <button
          className="close-button absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          ×
        </button>
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          {participant.column_2}
        </h3>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                項目
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                値
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Object.entries(participant).map(([key, value]) => {
              const headerLabel = header[key] || key;
              if (
                typeof value === 'object' &&
                value !== null &&
                'time' in value
              ) {
                const record = value as { time: string; comment?: string };
                return (
                  <tr key={key} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {headerLabel}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      時刻: {record.time}
                      {record.comment && (
                        <>
                          <br />
                          <span className="text-gray-500 text-sm">
                            {record.comment}
                          </span>
                        </>
                      )}
                    </td>
                  </tr>
                );
              }
              return (
                <tr key={key}>
                  <td>{headerLabel}</td>
                  <td>{value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

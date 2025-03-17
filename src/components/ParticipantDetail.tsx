import { RaceParticipantBase } from '../types/race';

interface ParticipantDetailProps {
  participant: RaceParticipantBase;
  onClose: () => void;
}

export function ParticipantDetail({
  participant,
  onClose,
}: ParticipantDetailProps) {
  return (
    <div className="participant-detail-overlay">
      <div className="participant-detail">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h3>{participant.column_2}</h3>
        <table>
          <tbody>
            {Object.entries(participant).map(([key, value]) => {
              if (typeof value === 'object' && value !== null) {
                return (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>
                      時刻: {value.time}
                      <br />
                      順位: {value.comment}
                    </td>
                  </tr>
                );
              }
              return (
                <tr key={key}>
                  <td>{key}</td>
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

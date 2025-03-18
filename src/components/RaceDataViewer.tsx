import { useEffect, useState } from 'react';
import { RaceData, RaceParticipantBase } from '../types/race';
import { getFinishTime, getPace } from '../utils/raceHelpers';
import { loadRaceData, getParticipantsData } from '../utils/raceDataLoader';
import { ParticipantDetail } from './ParticipantDetail';

/**
 * レースデータを表示するコンポーネント
 */
export function RaceDataViewer() {
  const [raceData, setRaceData] = useState<Record<string, RaceData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRace, setSelectedRace] = useState<string>('');
  const [selectedParticipant, setSelectedParticipant] =
    useState<RaceParticipantBase | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // 新しいデータファイルを読み込む
        const raceData = await loadRaceData(
          './data/results_coedo_ooedo_2025_short.json'
        );

        // データを保存
        const formattedData = raceData.reduce((acc, race) => {
          acc[race.category] = [race];
          return acc;
        }, {} as Record<string, RaceData>);

        setRaceData(formattedData);
        // 最初のレースを選択
        setSelectedRace(raceData[0].category);

        setError(null);
      } catch (err) {
        setError('データの読み込みに失敗しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // 選択されたレースの参加者データを取得
  const participants =
    selectedRace && raceData[selectedRace]
      ? getParticipantsData(raceData[selectedRace], selectedRace)
      : [];

  if (loading) return <div>データを読み込み中...</div>;
  if (error) return <div>エラー: {error}</div>;
  if (Object.keys(raceData).length === 0) return <div>データがありません</div>;

  return (
    <div className="race-data-viewer">
      <div className="race-selector">
        <label htmlFor="race-select">レース選択: </label>
        <select
          id="race-select"
          value={selectedRace}
          onChange={e => setSelectedRace(e.target.value)}
        >
          {Object.keys(raceData).map(race => (
            <option key={race} value={race}>
              {race}
            </option>
          ))}
        </select>
      </div>

      <h2>レース結果: {selectedRace}</h2>

      <table>
        <thead>
          <tr>
            <th>順位</th>
            <th>ゼッケン</th>
            <th>氏名</th>
            <th>所属</th>
            <th>部門順位</th>
            <th>ゴールタイム</th>
            <th>ペース</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant: RaceParticipantBase, index) => (
            <tr
              key={index}
              onClick={() => setSelectedParticipant(participant)}
              style={{ cursor: 'pointer' }}
            >
              <td>{participant.column_0}</td>
              <td>{participant.column_1}</td>
              <td>{participant.column_2}</td>
              <td>{participant.column_3}</td>
              <td>{participant.column_4}</td>
              <td>{getFinishTime(participant, selectedRace)}</td>
              <td>{getPace(participant, selectedRace)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedParticipant && (
        <ParticipantDetail
          participant={selectedParticipant}
          header={raceData[selectedRace][0].header}
          onClose={() => setSelectedParticipant(null)}
        />
      )}
    </div>
  );
}

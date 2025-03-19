import { useEffect, useState } from 'react';
import { RaceData, RaceParticipantBase } from '../types/race';
import { getFinishTime, getPace } from '../utils/raceHelpers';
import { loadRaceData, getParticipantsData } from '../utils/raceDataLoader';
import { ParticipantDetail } from './ParticipantDetail';
import { useStore } from '../store/store';

export function RaceDataViewer() {
  const [raceData, setRaceData] = useState<Record<string, RaceData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedParticipant, setSelectedParticipant] =
    useState<RaceParticipantBase | null>(null);
  const { category, setCategory } = useStore();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const raceData = await loadRaceData(
          './data/results_coedo_ooedo_2025_short.json'
        );
        const formattedData = raceData.reduce((acc, race) => {
          acc[race.category] = [race];
          return acc;
        }, {} as Record<string, RaceData>);

        setRaceData(formattedData);

        // カテゴリーの初期設定
        if (!formattedData[category]) {
          setCategory(raceData[0].category);
        }

        setError(null);
      } catch (err) {
        setError('データの読み込みに失敗しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [setCategory]); // categoryを依存配列から削除

  // 選択されたレースの参加者データを取得
  const participants =
    category && raceData[category]
      ? getParticipantsData(raceData[category], category)
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
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {Object.keys(raceData).map(race => (
            <option key={race} value={race}>
              {race}
            </option>
          ))}
        </select>
      </div>

      <h2>レース結果: {category}</h2>

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
              <td>{getFinishTime(participant, category)}</td>
              <td>{getPace(participant, category)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedParticipant && (
        <ParticipantDetail
          participant={selectedParticipant}
          header={raceData[category][0].header}
          onClose={() => setSelectedParticipant(null)}
        />
      )}
    </div>
  );
}

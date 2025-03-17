import { useEffect, useState } from 'react';
import {
  RaceData,
  RaceParticipantBase,
  getFinishTime,
  getPace,
} from '../types/race';
import { loadRaceData, getParticipantsData } from '../utils/raceDataLoader';

/**
 * レースデータを表示するコンポーネント
 */
export function RaceDataViewer() {
  const [raceData, setRaceData] = useState<Record<string, RaceData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRace, setSelectedRace] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // すべてのレースデータを読み込む
        const data200km = await loadRaceData('../data/race_6681_short.json');
        const data230km = await loadRaceData('../data/race_6682_short.json');
        const data260km = await loadRaceData('../data/race_6683_short.json');
        const data90km = await loadRaceData('../data/race_6684_short.json');
        const data115km = await loadRaceData('../data/race_6685_short.json');

        // データを保存
        setRaceData({
          小江戸大江戸200km: data200km,
          小江戸大江戸230km: data230km,
          小江戸大江戸260km: data260km,
          小江戸90km: data90km,
          大江戸ナイトラン115km: data115km,
        });

        // 最初のレースを選択
        setSelectedRace('小江戸大江戸200km');

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
            <tr key={index}>
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
    </div>
  );
}

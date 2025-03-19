import { useState } from 'react';
import { RaceParticipantBase } from '../types/race';
import { getFinishTime, getPace } from '../utils/raceHelpers';
import { getParticipantsData } from '../utils/raceDataLoader';
import { ParticipantDetail } from './ParticipantDetail';
import { useStore } from '../store/store';

export function RaceDataViewer() {
  const [selectedParticipant, setSelectedParticipant] =
    useState<RaceParticipantBase | null>(null);
  const { category, setCategory, raceData, isRaceDataLoading, raceDataError } =
    useStore();

  // 選択されたレースの参加者データを取得
  const participants =
    category && raceData[category]
      ? getParticipantsData(raceData[category], category)
      : [];

  if (isRaceDataLoading) return <div>レースデータを読み込み中...</div>;
  if (raceDataError) return <div>エラー: {raceDataError}</div>;
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

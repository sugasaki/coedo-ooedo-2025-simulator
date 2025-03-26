import { useEffect, useRef, useCallback } from 'react';
import { Timeline, DataSet } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import { useStore } from '../store/store';

interface TimelineControlProps {
  min?: number;
  max?: number;
}

export const TimelineControl = ({
  min = 0,
  max = 69660,
}: TimelineControlProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<Timeline | null>(null);
  // min, maxの値をuseRefに保存して不要な再レンダリングを防止
  const minRef = useRef(min);
  const maxRef = useRef(max);

  const { animationFrameValue, setAnimationFrame } = useStore();

  // 日付を正しく処理する関数
  const createDate = useCallback((seconds: number) => {
    const date = new Date(0); // 1970-01-01T00:00:00.000Z
    date.setSeconds(seconds);
    return date;
  }, []);

  // タイムラインのデータセットを作成する関数
  const createTimelineItems = useCallback(() => {
    return new DataSet([
      {
        id: 1,
        content: 'レース進行',
        start: createDate(minRef.current),
        end: createDate(maxRef.current),
      },
    ]);
  }, [createDate]);

  // タイムラインのオプションを設定する関数
  const getTimelineOptions = useCallback(() => {
    return {
      min: createDate(minRef.current),
      max: createDate(maxRef.current),
      start: createDate(minRef.current),
      end: createDate(maxRef.current),
      // zoomMin: 0,
      // zoomMax: 86400000, // 1日分（ミリ秒）
      // zoomable: false,
      showCurrentTime: true,
      showMajorLabels: true,
      showMinorLabels: true,
      // format: {
      //     minorLabels: {
      //         minute: 'HH:mm',
      //         hour: 'HH:mm'
      //     },
      //     majorLabels: {
      //         hour: 'HH:mm',
      //         day: 'M/D'
      //     }
      // },
      // 30秒間隔で移動するように設定
      timeStep: 1,
      // 目盛線を非表示にする設定
      showGrid: false,
      // 横スクロールを無効化する設定
      moveable: false,
      selectable: true,
      // timeAxis: { scale: 'minute', step: 1 },
      width: '100%',
      height: '100px',
      snap: function (date: Date) {
        // snapの値をセットする事で、目盛線の移動をスムーズにできる
        const hour = 60 * 1000;
        const snapvalue = Math.round(date.getTime() / hour) * hour;
        // console.log('snapvalue', snapvalue);
        return snapvalue;
      },
    };
  }, [createDate]);

  // カスタムCSSスタイルを追加する関数
  const addCustomTimelineStyle = useCallback(() => {
    // すでに存在する場合は追加しない
    if (document.querySelector('style[data-timeline-style]')) return;

    const styleElement = document.createElement('style');
    styleElement.setAttribute('data-timeline-style', 'true');
    styleElement.textContent = `
            .vis-custom-time {
                background-color: #ffee00;
            }
        `;
    document.head.appendChild(styleElement);
  }, []);

  // タイムラインのイベントリスナーを設定する関数
  const setupTimelineEventListeners = useCallback(
    (timelineInstance: Timeline) => {
      const customTimeId = 'current';
      timelineInstance.addCustomTime(
        createDate(animationFrameValue),
        customTimeId
      );

      // イベントリスナーが重複しないように一度削除してから追加
      timelineInstance.off('timechange');
      timelineInstance.on('timechange', function (props: any) {
        if (props.id === customTimeId) {
          const timeInSeconds = Math.floor(props.time.getTime() / 1000);
          setAnimationFrame(timeInSeconds);
        }
      });
    },
    [animationFrameValue, setAnimationFrame, createDate]
  );

  // タイムラインを初期化する関数
  const initializeTimeline = useCallback(() => {
    if (!timelineRef.current) return;

    // すでにタイムラインが存在する場合は再初期化しない
    if (timeline.current) return;

    try {
      // Create a DataSet with items
      const items = createTimelineItems();

      // Configuration for the Timeline
      const options = getTimelineOptions();

      // Add custom CSS
      addCustomTimelineStyle();

      // Create a Timeline
      timeline.current = new Timeline(timelineRef.current, items, options);

      // Setup event listeners
      setupTimelineEventListeners(timeline.current);
    } catch (error) {
      console.error('Timeline initialization error:', error);
    }
  }, [
    createTimelineItems,
    getTimelineOptions,
    addCustomTimelineStyle,
    setupTimelineEventListeners,
  ]);

  // タイムラインをクリーンアップする関数
  const cleanupTimeline = useCallback(() => {
    if (timeline.current) {
      timeline.current.destroy();
      timeline.current = null;
    }

    // スタイル要素を削除
    const styleElement = document.querySelector('style[data-timeline-style]');
    if (styleElement) {
      styleElement.remove();
    }
  }, []);

  // タイムラインを更新する関数
  const updateTimelinePosition = useCallback(() => {
    if (!timeline.current) {
      // タイムラインが存在しない場合は初期化
      initializeTimeline();
      return;
    }

    try {
      const customTimeId = 'current';
      timeline.current.setCustomTime(
        createDate(animationFrameValue),
        customTimeId
      );
    } catch (error) {
      console.error('Timeline update error:', error);
      // エラーが発生した場合、タイムラインを再初期化
      cleanupTimeline();
      initializeTimeline();
    }
  }, [animationFrameValue, createDate, initializeTimeline, cleanupTimeline]);

  // コンポーネントのマウント時に一度だけ実行
  useEffect(() => {
    // propsの値をrefに保存
    minRef.current = min;
    maxRef.current = max;

    // タイムラインを初期化
    initializeTimeline();

    // コンポーネントのアンマウント時にクリーンアップ
    return () => {
      cleanupTimeline();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 空の依存配列で一度だけ実行

  // animationFrameValueが変更されたときにタイムラインを更新
  useEffect(() => {
    updateTimelinePosition();
  }, [updateTimelinePosition]);

  return (
    <div className="timeline-control">
      <div className="timeline-container" ref={timelineRef}></div>
    </div>
  );
};

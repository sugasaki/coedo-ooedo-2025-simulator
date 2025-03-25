import { useEffect, useRef } from 'react';
import { Timeline, DataSet } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import { useStore } from '../store/store';

interface TimelineControlProps {
    min?: number;
    max?: number;
    autoPlay?: boolean;
}

export const TimelineControl = ({
    min = 0,
    max = 129600,
    autoPlay = true
}: TimelineControlProps) => {
    const timelineRef = useRef<HTMLDivElement>(null);
    const timeline = useRef<Timeline | null>(null);

    const {
        animationFrameValue,
        setAnimationFrame,
        isPlaying,
        playingStart,
        playingStop
    } = useStore();

    // Convert frames to more readable time format
    const formatTime = (frame: number) => {
        const hours = Math.floor(frame / 3600);
        const minutes = Math.floor((frame % 3600) / 60);
        const seconds = frame % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // 日付を正しく処理する関数
    const createDate = (seconds: number) => {
        const date = new Date(0);  // 1970-01-01T00:00:00.000Z
        date.setSeconds(seconds);
        return date;
    };

    useEffect(() => {
        if (timelineRef.current && !timeline.current) {
            try {
                // Create a DataSet with items
                const items = new DataSet([
                    // {
                    //     id: 1,
                    //     content: 'レース進行',
                    //     start: createDate(min),
                    //     end: createDate(max)
                    // }
                ]);

                // Configuration for the Timeline
                const options = {
                    min: createDate(min),
                    max: createDate(max),
                    zoomMin: 10000,
                    zoomMax: 86400000, // 1日分（ミリ秒）
                    showCurrentTime: true,
                    showMajorLabels: true,
                    showMinorLabels: true,
                    format: {
                        minorLabels: {
                            minute: 'HH:mm',
                            hour: 'HH:mm'
                        },
                        majorLabels: {
                            hour: 'HH:mm',
                            day: 'M/D'
                        }
                    },
                    // 30秒間隔で移動するように設定
                    timeStep: 30,
                    // 目盛線を非表示にする設定
                    showGrid: false,
                    timeAxis: { scale: 'minute', step: 1 },
                    width: '100%',
                    height: '120px'
                };

                // カスタムCSSを追加して目盛線を非表示にする
                const styleElement = document.createElement('style');
                styleElement.textContent = `
          .vis-grid.vis-vertical,
          .vis-grid.vis-horizontal {
            display: none !important;
          }
        `;
                document.head.appendChild(styleElement);

                // Create a Timeline
                timeline.current = new Timeline(timelineRef.current, items, options);

                // Set custom time
                const customTimeId = 'current';
                timeline.current.addCustomTime(createDate(animationFrameValue), customTimeId);

                // Add event listener for timeline movements
                timeline.current.on('timechanged', function (props: any) {
                    if (timeline.current && props.id === customTimeId) {
                        const timeInSeconds = Math.floor(props.time.getTime() / 1000);

                        // 30秒単位に丸める
                        const roundedTime = Math.round(timeInSeconds / 30) * 30;

                        // Only update if it changed significantly to avoid feedback loops
                        if (Math.abs(roundedTime - animationFrameValue) > 1) {
                            setAnimationFrame(roundedTime);
                        }
                    }
                });

                timeline.current.on('timechange', function (props: any) {
                    if (timeline.current && props.id === customTimeId) {
                        const timeInSeconds = Math.floor(props.time.getTime() / 1000);
                        setAnimationFrame(timeInSeconds);
                    }
                });

                // Set initial window
                if (timeline.current) {
                    const startWindow = Math.max(0, animationFrameValue - 1800); // 30分前
                    const endWindow = animationFrameValue + 1800; // 30分後
                    timeline.current.setWindow(
                        createDate(startWindow),
                        createDate(endWindow)
                    );
                }
            } catch (error) {
                console.error("Timeline initialization error:", error);
            }
        }

        return () => {
            if (timeline.current) {
                timeline.current.destroy();
                timeline.current = null;
            }

            // スタイル要素を削除
            const styleElement = document.querySelector('style[data-timeline-style]');
            if (styleElement) {
                styleElement.remove();
            }
        };
    }, []);

    // Update timeline when animationFrameValue changes
    useEffect(() => {
        if (timeline.current) {
            try {
                const roundedValue = Math.round(animationFrameValue / 30) * 30;
                timeline.current.setCustomTime(createDate(roundedValue), 'current');
            } catch (error) {
                console.error("Timeline update error:", error);
            }
        }
    }, [animationFrameValue]);


    return (
        <div className="timeline-control">
            <div className="timeline-container" ref={timelineRef}></div>
            <div className="timeline-controls">
                <button
                    onClick={() => isPlaying ? playingStop() : playingStart()}
                    className={`px-4 py-2 mr-2 rounded ${isPlaying ? 'bg-red-500' : 'bg-green-500'} text-white`}
                >
                    {isPlaying ? '停止' : '再生'}
                </button>
                <span className="ml-4 text-lg">
                    現在時間: {formatTime(animationFrameValue)}
                </span>
            </div>
        </div>
    );
};
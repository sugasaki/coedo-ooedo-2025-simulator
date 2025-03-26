import { useEffect, useRef } from 'react';
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

    const {
        animationFrameValue,
        setAnimationFrame,
    } = useStore();

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
                    {
                        id: 1,
                        content: 'レース進行',
                        start: createDate(min),
                        end: createDate(max)
                    }
                ]);

                // Configuration for the Timeline
                const options = {
                    min: createDate(min),
                    max: createDate(max),
                    start: createDate(min),
                    end: createDate(max),
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
                        const snapvalue = Math.round(date.getTime() / hour) * hour
                        // console.log('snapvalue', snapvalue);
                        return snapvalue;
                    }
                };

                // カスタムCSSを追加
                const styleElement = document.createElement('style');
                styleElement.setAttribute('data-timeline-style', 'true');
                styleElement.textContent = `
                    .vis-custom-time {
                        background-color: #ff0000;
                    }
                `;
                document.head.appendChild(styleElement);

                // Create a Timeline
                timeline.current = new Timeline(timelineRef.current, items, options);

                // Set custom time 青い線を表示
                const customTimeId = 'current';
                timeline.current.addCustomTime(createDate(animationFrameValue), customTimeId);

                // Add event listener for timeline movements
                timeline.current.on('timechange', function (props: any) {
                    if (timeline.current && props.id === customTimeId) {
                        const timeInSeconds = Math.floor(props.time.getTime() / 1000);
                        setAnimationFrame(timeInSeconds);
                    }
                });
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
        if (!timeline.current) return;
        try {
            timeline.current.setCustomTime(createDate(animationFrameValue), 'current');
        } catch (error) {
            console.error("Timeline update error:", error);
        }
    }, [animationFrameValue]);


    return (
        <div className="timeline-control">
            <div className="timeline-container" ref={timelineRef} ></div>
        </div>
    );
};


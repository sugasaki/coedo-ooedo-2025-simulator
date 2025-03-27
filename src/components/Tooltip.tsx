import { useState, useEffect } from 'react';
import { PersonInfoType } from '../types/personInfo';
import { useMapStore } from '../store';

interface Props {
  personInfo: PersonInfoType;
  // viewPortOption?: WebMercatorViewportOptions;
}

export const Tooltip = ({ personInfo }: Props) => {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const { fontSize, viewport } = useMapStore();

  useEffect(() => {
    //WebMercatorViewportOptionsに変換するオプションが見つからないので、viewStateをそのままセット
    const [x, y] = viewport.project(personInfo.coordinates);

    setPosition({ left: x, top: y });
  }, [viewport, personInfo.coordinates]);

  const name = personInfo.name.split(' ')[0]; // + personInfo.name.split(' ')[1];
  // const name = personInfo.name.replace('　', ' ');
  // const distance = personInfo.distance.toFixed(2) + 'km';

  return (
    <div
      className="tooltip"
      style={{
        position: 'absolute',
        left: position.left + 10,
        top: position.top - 15,
        // transform: 'translate(-50%, -50%)',
        // transform: 'translate(200, -50%)',
        pointerEvents: 'none',
        // background: 'white',
        // color: rgbToHex(personInfo.color), //'white',
        color: 'white',
        // font: '12px/1.5 "Helvetica Neue", Arial, sans-serif',
        fontSize: fontSize,
        padding: '5px',
        // border: '1px solid black',
        opacity: 0.8,
      }}
    >
      {personInfo.no}: {name}
    </div>
  );
};

import { Coordinate } from './geo';

export type Scatterplot2D = {
  position: Coordinate;
  size: number;
  color?: [number, number, number];
};

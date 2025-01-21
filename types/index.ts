import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type SliderLoadProps = {
  name: string;
  value: number;
  onChange?: (value: number) => void; // Still expect a number here
}

export type ProgressBarProps = {
  name: string;
  value: number;
}

export type Lecture = {
  courseCode: string;
  type: string;
  day: string;
  time: string;
  durationHours: number;
}
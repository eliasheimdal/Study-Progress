import React from "react";
import {Progress} from "@heroui/react";
import {ProgressBarProps} from "@/types";

export default function ProgressBar({ name, value, effort, full }: ProgressBarProps) {
  return (
    <Progress
      label={`${effort}/${full} - ${name}`}
      aria-label="Downloading..."
      className="max-w-md"
      color="success"
      showValueLabel={true}
      size="md"
      value={value}
    />
  );
}


import React from "react";
import DefaultLayout from "@/layouts/default";
import LectureTracker from "@/components/lectureTracker";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <LectureTracker />
    </DefaultLayout>
  );
}

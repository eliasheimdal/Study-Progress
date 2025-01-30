import React, { useState } from "react";
import { Checkbox, CheckboxGroup, Button } from "@heroui/react";
import ProgressBar from "@/components/progress";
import SliderLoad from "@/components/slider";
import ActivityForm from "@/components/activityForm";
import LoginForm from "@/components/loginForm";
import lectures from "@/data/lectures.json";
import courses from "@/data/courses.json";
import { title, subtitle } from "@/components/primitives";
import { button as buttonStyles } from "@heroui/theme";
import { Activity } from "@/types";
import { useSession } from "next-auth/react";

export default function LectureTracker() {
  const { data: session } = useSession();
  const [checklist, setChecklist] = useState(
    lectures.map((lecture) => ({
      ...lecture,
      checked: true,
    }))
  );

  const initialProgress: { [key: string]: number } = courses.reduce(
    (acc, course) => ({ ...acc, [course.courseCode]: 0 }),
    {}
  );
  const [progress, setProgress] = useState(initialProgress);
  const [progressPercent, setProgressPercent] = useState(initialProgress);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [workload, setWorkload] = useState(9.375);
  const [selected, setSelected] = useState<string[]>([]);

  const updateProgress = (time: number, courseCode: string) => {
    setProgress((prev) => ({
      ...prev,
      [courseCode]: prev[courseCode] + time,
    }));
    checkProgress(time, courseCode);
  };

  const checkProgress = (time: number, courseCode: string) => {
    setProgressPercent((prev) => ({
      ...prev,
      [courseCode]: ((progress[courseCode] + time) / workload) * 100,
    }));
  };

  const handleCheckboxChange = (
    id: number,
    courseCode: string,
    duration: number,
    isChecked: boolean
  ) => {
    const index = checklist.findIndex((lecture) => lecture.id === id);
    checklist[index].checked = isChecked;
    setChecklist([...checklist]);

    updateProgress(isChecked ? duration : -duration, courseCode);
  };

  const handleSlide = (value: number) => {
    setWorkload((value / 100) * 9.375);
  };

  const handleActivitySubmit = (activity: Activity) => {
    const duration = parseInt(activity.duration, 10);
    updateProgress(duration, activity.course);
  };

  const handleActivityDelete = (activity: Activity, index: number) => {
    const duration = parseInt(activity.duration, 10);
    const courseCode = activity.course;

    setProgress((prev) => ({
      ...prev,
      [courseCode]: prev[courseCode] - duration,
    }));

    setProgressPercent((prev) => ({
      ...prev,
      [courseCode]: ((prev[courseCode] - duration) / workload) * 100,
    }));

    setActivities((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setSelected([]);
    setProgress(initialProgress);
    setProgressPercent(initialProgress);
    setActivities([]);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <LoginForm />
      {session ? (
        <div>
          <h1 className={`${title({ color: "blue" })} pb-2`}>Progress</h1>

          {courses.map((course) => (
            <ProgressBar
              key={course.courseCode}
              name={course.name}
              value={progressPercent[course.courseCode]}
              effort={progress[course.courseCode]}
              full={workload}
            />
          ))}

          <CheckboxGroup
            label="Select Attended Lectures"
            value={selected}
            onValueChange={setSelected}
          >
            {checklist.map((lecture) => (
              <Checkbox
                key={lecture.id}
                value={lecture.id.toString()}
                onChange={(e) =>
                  handleCheckboxChange(
                    lecture.id,
                    lecture.courseCode,
                    lecture.durationHours,
                    e.target.checked
                  )
                }
              >
                {`${lecture.courseCode} - ${lecture.type} (${lecture.day} ${lecture.time})`}
              </Checkbox>
            ))}
          </CheckboxGroup>

          <ActivityForm
            activities={activities}
            setActivities={setActivities}
            onActivitySubmit={handleActivitySubmit}
            deleteCourse={handleActivityDelete}
          />

          <h2 className={`${subtitle()} text-center`}>Workload</h2>
          <SliderLoad
            onChange={handleSlide}
            name="Prosent Student"
            value={100}
          />

          <div className="flex gap-3">
            <Button
              className={buttonStyles({ color: "danger", radius: "full" })}
              onPress={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <p>Please login to view your progress</p>
        </div>
      )}
    </div>
  );
}

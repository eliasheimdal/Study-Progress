import React from "react";
import DefaultLayout from "@/layouts/default";
import { Checkbox, CheckboxGroup, Button } from "@heroui/react";
import ProgressBar from "@/components/progress";
import SliderLoad from "@/components/slider";
import ActivityForm from "@/components/activityForm";
import { Activity } from "@/types";
import lectures from "@/data/lectures.json";
import { title, subtitle } from "@/components/primitives";
import { button as buttonStyles } from "@heroui/theme";
import { Lecture } from "@/types";

export default function IndexPage() {
  const [tdt4242, setTdt4242] = React.useState(0);
  const [tdt4242Prog, setTdt4242Prog] = React.useState(0);
  const [tdt4240, setTdt4240] = React.useState(0);
  const [tdt4240Prog, setTdt4240Prog] = React.useState(0);
  const [mlProg, setMlProg] = React.useState(0);
  const [activities, setActivities] = React.useState<Activity[]>([]);

  const updateProgress = (time: number, lecture: string) => {
    if (lecture === "TDT4242") {
      setTdt4242((prev) => prev + time);
    } else if (lecture === "TDT4240") {
      setTdt4240((prev) => prev + time);
    }
    checkProgress(time, lecture);
  };

  const checkProgress = (time: number, lecture: string) => {
    if (lecture === "TDT4242") {
      const updatedTdt4242 = tdt4242 + time;
      const tdt4242Prog = (updatedTdt4242 / 9.375) * 100;
      setTdt4242Prog(tdt4242Prog);
    } else if (lecture === "TDT4240") {
      const updatedTdt4240 = tdt4240 + time;
      const tdt4240Prog = (updatedTdt4240 / 9.375) * 100;
      setTdt4240Prog(tdt4240Prog);
    }
  };

  const handleCheckboxChange = (id: number, lecture: string, duration: number, isChecked: boolean) => {
    const additionalHours = isChecked ? duration : -duration;
    console.log("Additional hours:", additionalHours);
    console.log("Lecture:", isChecked);
    updateProgress(additionalHours, lecture);
  };

  const handleReset = (lectures: Lecture[]) => {
    setTdt4242Prog(0);
    setTdt4240Prog(0);
    setMlProg(0);
    setActivities([]);
    lectures.forEach((lecture: Lecture) => {
      lecture.checked = false;
    });
    console.log("Lectures:", lectures);
  };

  const handleActivitySubmit = (activity: Activity) => {
    const duration = parseInt(activity.duration, 10);
    updateProgress(duration, activity.course);
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <span className={title({ color: "violet" })}>Courses</span>
        <ProgressBar name="TDT4242 Avansert Programvareutvikling" value={tdt4242Prog} />
        <ProgressBar name="TDT4240 Programvarearkitektur" value={tdt4240Prog} />
        <ProgressBar name="Machine Learning" value={mlProg} />

        <CheckboxGroup label="Select Attended Lectures">
          {lectures.map((lecture) => (
            <Checkbox
              key={lecture.id}
              value={`${lecture.courseCode} ${lecture.type}, ${lecture.day} ${lecture.time}`}
              isSelected={lecture.checked} // Bind checkbox state
              onChange={(e) => {
                lecture.checked = e.target.checked;
                handleCheckboxChange(lecture.id, lecture.courseCode, lecture.durationHours, lecture.checked);
              }}
            >
              {`${lecture.courseCode} - ${lecture.type} (${lecture.day} ${lecture.time})`}
            </Checkbox>
          ))}
        </CheckboxGroup>

        <ActivityForm activities={activities} setActivities={setActivities} onActivitySubmit={handleActivitySubmit} />

        <span className={title({ color: "yellow" })}>Workload</span>
        <SliderLoad
          onChange={(value: number) => console.log(value)}
          name="Prosent Student"
          value={100}
        />

        <div className="flex gap-3">
          <Button
            className={buttonStyles({ color: "danger", radius: "full" })}
            onPress={() => handleReset(lectures)}
          >
            Reset
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
}

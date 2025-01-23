import React, { useEffect } from "react";
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
import { set } from "react-hook-form";

export default function IndexPage() {
  const [checklist, setChecklist] = React.useState(
    lectures.map((lecture) => ({
      id: lecture.id,
      courseCode: lecture.courseCode,
      type: lecture.type,
      day: lecture.day,
      time: lecture.time,
      durationHours: lecture.durationHours,
      checked: true,
    }))
  );
  const [tdt4242, setTdt4242] = React.useState(0);
  const [tdt4242Prog, setTdt4242Prog] = React.useState(0);
  const [tdt4240, setTdt4240] = React.useState(0);
  const [tdt4240Prog, setTdt4240Prog] = React.useState(0);
  const [ml, setMl] = React.useState(0);
  const [mlProg, setMlProg] = React.useState(0);
  const [activities, setActivities] = React.useState<Activity[]>([]);
  const [workload, setWorkload] = React.useState(9.375);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [course, setCourse] = React.useState("");

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
      const tdt4242Prog = (updatedTdt4242 / workload) * 100;
      setTdt4242Prog(tdt4242Prog);
    } else if (lecture === "TDT4240") {
      const updatedTdt4240 = tdt4240 + time;
      const tdt4240Prog = (updatedTdt4240 / workload) * 100;
      setTdt4240Prog(tdt4240Prog);
    }
  };

  const handleCheckboxChange = (id: number, lecture: string, duration: number, isChecked: boolean) => {
    const index = checklist.findIndex((lecture) => lecture.id === id);
    checklist[index].checked = isChecked
    setChecklist([...checklist]);
    const additionalHours = isChecked ? duration : -duration;
    updateProgress(additionalHours, lecture);
  };

  const handleReset = () => {
    setSelected([]);
    setTdt4242Prog(0);
    setTdt4240Prog(0);
    setMlProg(0);
    setTdt4242(0);
    setTdt4240(0);
    setMl(0);
    setActivities([]);
  };

  const handleActivitySubmit = (activity: Activity) => {
    const duration = parseInt(activity.duration, 10);
    updateProgress(duration, activity.course);
    setCourse(activity.course);
  };

 const handleSlide = (value: number) => {
    const newWorkload = (value / 100) * 9.375;
    setWorkload(newWorkload);
  };

  const handleActivityDelete = (activity: Activity, index: number) => {
    // Deduct the activity duration from the relevant progress
    const duration = parseInt(activity.duration, 10);
    const course = activity.course;
  
    if (course === "TDT4242") {
      const updatedTdt4242 = tdt4242 - duration;
      const tdt4242Prog = (updatedTdt4242 / workload) * 100;
      setTdt4242(updatedTdt4242);
      setTdt4242Prog(tdt4242Prog);
    } else if (course === "TDT4240") {
      const updatedTdt4240 = tdt4240 - duration;
      const tdt4240Prog = (updatedTdt4240 / workload) * 100;
      setTdt4240(updatedTdt4240);
      setTdt4240Prog(tdt4240Prog);
    } else if (course === "Machine Learning") {
      setMl((prev) => prev - duration);
      setMlProg((prevProg) => ((prevProg - duration) / workload) * 100);
    }
  
    // Remove the activity from the activities list
    setActivities((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log(checklist);
  }, [checklist]);
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <span className={title({ color: "violet" })}>Courses</span>
        <ProgressBar name="TDT4242 Avansert Programvareutvikling" value={tdt4242Prog} effort={tdt4242} full={workload}/>
        <ProgressBar name="TDT4240 Programvarearkitektur" value={tdt4240Prog} effort={tdt4240} full={workload} />
        <ProgressBar name="Machine Learning" value={mlProg} effort={ml} full={workload}/>

        <CheckboxGroup label="Select Attended Lectures" value={selected} onValueChange={setSelected}>
          {checklist.map((lecture) => (
            <Checkbox
              key={lecture.id}
              value={lecture.id.toString()}
              onChange={(e) => {
                const isChecked = e.target.checked;
                handleCheckboxChange(lecture.id, lecture.courseCode, lecture.durationHours, isChecked);
              }}
            >
              {`${lecture.courseCode} - ${lecture.type} (${lecture.day} ${lecture.time})`}
            </Checkbox>
          ))}
        </CheckboxGroup>

        <ActivityForm activities={activities} setActivities={setActivities} onActivitySubmit={handleActivitySubmit} deleteCourse={handleActivityDelete}/>

        <span className={title({ color: "yellow" })}>Workload</span>
        <SliderLoad
          onChange={(value: number) => handleSlide(value)}
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
    </DefaultLayout>
  );
}

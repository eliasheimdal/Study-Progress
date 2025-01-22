import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { Button, CheckboxGroup, Checkbox } from "@heroui/react";
import { button as buttonStyles } from "@heroui/theme";
import React from "react";
import ProgressCard from "@/components/progressCard";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import ProgressBar from "@/components/progress";
import SliderLoad from "@/components/slider";
import ActivityForm from "@/components/activityForm";

import lectures from "@/data/lectures.json";
import { Lecture } from "@/types";

export default function IndexPage() {
  const [tdt4242, setTdt4242] = React.useState(0);
  const [tdt4242Prog, setTdt4242Prog] = React.useState(0);
  const [tdt4240, setTdt4240] = React.useState(0);
  const [tdt4240Prog, setTdt4240Prog] = React.useState(0);
  const [Ml, setMl] = React.useState(0);
  const [MlProg, setMlProg] = React.useState(0);
  const [load, setLoad] = React.useState(100);
  const fulltime = 100;

  const updateProgress = (time: number, lecture: string) => {
    if (lecture === "TDT4242") {
      setTdt4242((prev) => prev + time); // Use the previous value
    } else if (lecture === "TDT4240") {
      setTdt4240((prev) => prev + time); // Use the previous value
    }
    checkProgress(time, lecture); // Pass the time and lecture to update progress
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

  const updateLoad = (value: number) => {
    setLoad(value);
    console.log(value);
  };
  const reset = () => {
    setTdt4242(0);
    setTdt4240(0);
    setMl(0);
    setLoad(100);
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ActivityForm />
        <CheckboxGroup label="Select Attended Lectures">
          {lectures.map((lecture) => (
            <Checkbox
              key={lecture.id}
              value={`${lecture.courseCode}${lecture.type}, ${lecture.day} ${lecture.time}`}
              onChange={(event) => {
                const isChecked = event.target.checked; // Determine if checked or unchecked
                const value = isChecked
                  ? lecture.durationHours
                  : -lecture.durationHours;
                updateProgress(value, lecture.courseCode); // Pass the value to updateProgress
                console.log(
                  `Checkbox for ${lecture.courseCode} is ${isChecked ? "checked" : "unchecked"}:`,
                  value
                );
              }}
            >
              {`${lecture.courseCode} - ${lecture.type} (${lecture.day} ${lecture.time})`}
            </Checkbox>
          ))}
        </CheckboxGroup>

        <span className={title({ color: "yellow" })}>Workload&nbsp;</span>
        <SliderLoad
          onChange={(value: number) => updateLoad(value)} // Handles single values
          name="Prosent Student"
          value={load}
        />
        <span className={title({ color: "violet" })}>Courses&nbsp;</span>
        <ProgressBar name="Avansert Programvareutvikling" value={tdt4242Prog} />
        <ProgressBar name="Programvarearkitektur" value={tdt4240Prog} />
        <ProgressBar name="Machine Learning" value={MlProg} />
        <div className="flex gap-3">
          <Button
            className={buttonStyles({ color: "danger", radius: "full" })}
            onPress={() => {
              reset();
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
}

import React from "react";
import { Form, Button, Select, SelectItem } from "@heroui/react";
import { Activity } from "@/types";
import { title, subtitle } from "@/components/primitives";

export default function ActivityForm() {
  const [course, setCourse] = React.useState<Set<string>>(new Set([]));
  const [duration, setDuration] = React.useState("");
  const [activities, setActivities] = React.useState<Activity[]>([]); // Use state for activities



  let activity: Activity[] = [];

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === "duration") {
      setDuration(e.target.value);
      console.log("Selected duration:", e.target.value);
      return;
    } else if (e.target.name === "course") {
      setCourse(new Set(e.target.value.split(",")));
      console.log("Selected course:", e.target.value);
      return;
    }
  };

  const handleSubmit = () => {
    if (course.size === 0 || duration === "") {
      console.log("Please fill out all fields");
      return;
    }
    const newActivity = { course: Array.from(course).join(", "), duration: duration };
    console.log("Submitted:", newActivity);
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

  const reset = () => {
    setCourse(new Set([]));
    setDuration("");
    setActivities([]); // Reset the activities
  }

  return (
    <div className="w-full max-w-xs flex flex-col gap-4">
      <Select
        isRequired
        label="Select Course"
        labelPlacement="outside"
        name="course"
        selectedKeys={course}
        placeholder="Courses"
        onChange={handleSelectionChange}      >
        <SelectItem key="TDT4240">TDT4240</SelectItem>
        <SelectItem key="TDT4242">TDT4242</SelectItem>
        <SelectItem key="Machine Learning">Machine Learning</SelectItem>
      </Select>

      <Select
        isRequired
        label="Select Duration"
        labelPlacement="outside"
        name="duration"
        selectedKeys={duration}
        placeholder="Duration"
        onChange={handleSelectionChange}
      >
        <SelectItem key={1}>1 Hour</SelectItem>
        <SelectItem key={2}>2 Hours</SelectItem>
        <SelectItem key={3}>3 Hours</SelectItem>
        <SelectItem key={4}>4 Hours</SelectItem>
      </Select>

      <div className="w-full max-w-xs flex gap-2">
        <Button color="primary" type="submit" onPress={handleSubmit}>
          Submit
        </Button>
        <Button type="reset" variant="flat" onPress={reset}>
          Reset
        </Button>
      </div>
      <div className="w-full max-w-xs flex flex-col gap-2">
      <h2 className={subtitle()}>Extra Activities:</h2>
      <ul>
      {activities.map((activity, index) => (
          <li key={index}>
            {activity.course} - {activity.duration} Hours
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

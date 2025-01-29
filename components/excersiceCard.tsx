import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@heroui/react";
import excersices from "@/data/excersices.json";
import { useState, useEffect } from "react";
import { subtitle } from "@/components/primitives";

export default function ExcersiceCard() {
  const [completed, setCompleted] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const storedCompleted = localStorage.getItem("completedExercises");
    if (storedCompleted) {
      setCompleted(JSON.parse(storedCompleted));
    }
  }, []);

  const handlePress = (courseIndex: string, contentId: number): void => {
    setCompleted((prev) => {
      const newState = {
        ...prev,
        [contentId]: !prev[contentId],
      };
      localStorage.setItem("completedExercises", JSON.stringify(newState)); // Save immediately
      return newState;
    });
  };

  return (
    <div>
      <div className="flex justify-around text-center mb-6">
        {excersices.map((excersice, index) => (
          <h2 key={index} className={subtitle()}>
            {excersice.course}
          </h2>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t-1 border-zinc-100/50">
        {excersices.map((excersice, courseIndex) => (
          <div key={courseIndex} className="max-w-[400px]">
            {excersice.content.map((content) => (
              <Card
                key={content.id}
                isPressable
                isHoverable={!completed[content.id]}
                className={`max-w-[400px] mt-4 border-1 shadow-lg transition duration-300 ${
                  completed[content.id]
                    ? "bg-green-500 text-black"
                    : ""
                }`}
                onPress={() => handlePress(String(courseIndex), content.id)}
              >
                <CardHeader className="flex gap-3">
                  <Image
                    alt="heroui logo"
                    height={40}
                    radius="none"
                    src="/NTNU.png"
                    width={30}
                  />
                  <div className="flex flex-col">
                    <p className="text-md text-left">{content.name}</p>
                    <p className="text-small text-default-500 text-left">
                      blackboard.no
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>The deadline for submission is: {content.Deadline}</p>
                </CardBody>
                <Divider />
                <CardFooter>
                  {content.link ? (
                    <Link isExternal showAnchorIcon href={content.link}>
                      Excersice Description
                    </Link>
                  ) : (
                    <p style={{ color: "red" }}>Not available yet</p>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

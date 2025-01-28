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
  import { useState } from "react";
  
  export default function CourseExersices({ code }: { code: string }) {
    const [completed, setCompleted] = useState<{ [key: string]: boolean }>({});
  
    // Filter exercises for the specific course
    const filteredExercises = excersices.filter(
      (excersice) => excersice.course === code
    );
  
    const handlePress = (courseIndex: string, contentId: number): void => {
      setCompleted((prev) => ({
        ...prev,
        [`${courseIndex}-${contentId}`]: !prev[`${courseIndex}-${contentId}`],
      }));
    };
  
    return (
      <div>
        <div className="flex flex-wrap gap-2">
          {filteredExercises.map((excersice, courseIndex) =>
            excersice.content.map((content) => (
              <Card
                key={content.id}
                isPressable
                isHoverable={!completed[`${courseIndex}-${content.id}`]}
                className={`w-[400px] border-1 shadow-lg transition duration-300 ${
                  completed[`${courseIndex}-${content.id}`]
                    ? "bg-green-100"
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
            ))
          )}
        </div>
      </div>
    );
  }
  
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
import { title, subtitle } from "@/components/primitives";

export default function ExcersiceCard() {
  return (
    <div>
      {/* Flex container for course titles */}
      <div className="flex justify-around text-center mb-6">
        {excersices.map((excersice, index) => (
          <h2 key={index} className={subtitle()}>
            {excersice.course}
          </h2>
        ))}
      </div>

      {/* Grid container for the content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t-1 border-zinc-100/50">
        {excersices.map((excersice, index) => (
          <div key={index} className="max-w-[400px]">
            {excersice.content.map((content) => (
              <Card key={content.id} className="max-w-[400px] mt-4 border-1 shadow-lg">
                <CardHeader className="flex gap-3">
                  <Image
                    alt="heroui logo"
                    height={40}
                    radius="none"
                    src="/NTNU.png"
                    width={30}
                  />
                  <div className="flex flex-col">
                    <p className="text-md">{content.name}</p>
                    <p className="text-small text-default-500">blackboard.no</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>The deadline for submission is: {content.Deadline}</p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link isExternal showAnchorIcon href={content.link}>
                    Excersice Description
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

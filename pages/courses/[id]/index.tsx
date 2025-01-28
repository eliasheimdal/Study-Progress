import React from "react";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import courses from "@/data/courses.json";
import { CoursePageProps } from "@/types";
import CourseExersices from "@/components/courseExcersices";

export async function getServerSideProps(context: { params: { id: string } }) {
  const { id } = context.params;
  const course = courses.find((course) => course.id === Number(id));

  if (!course) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      course,
    },
  };
}

export default function CoursePage({ course }: { course: CoursePageProps }) {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({color: "blue"})}>{course.name}</h1>
        </div>
        <p className="text-center">{course.description}</p>
      </section>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({color: "blue"})}>Excersices</h1>
        </div>
        <CourseExersices code={course.courseCode} />
      </section>
      
    </DefaultLayout>
  );
}

import React from "react";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import courses from "@/data/courses.json";
import { CoursePageProps } from "@/types";

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
          <h1 className={title({color: "yellow"})}>{course.name}</h1>
        </div>
      </section>
      <p className="text-center">{course.description}</p>
    </DefaultLayout>
  );
}

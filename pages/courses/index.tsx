import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import CoursesCard from "@/components/coursesCard";


export default function CoursesPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Courses</h1>
          
        </div>
      </section>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <CoursesCard />
      </div>
    </DefaultLayout>
  );
}
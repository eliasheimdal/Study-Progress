import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import ProgressCard from "@/components/progressCard";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Courses</h1>
          
        </div>
      </section>
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <ProgressCard />
      </div>
    </DefaultLayout>
  );
}
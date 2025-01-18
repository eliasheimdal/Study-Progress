import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import CalendarSchedule from "@/components/calendar";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Blog</h1>
        </div>
        <div className="inline-block max-w-lg text-center justify-center">
          <CalendarSchedule />
        </div>
      </section>
    </DefaultLayout>
  );
}

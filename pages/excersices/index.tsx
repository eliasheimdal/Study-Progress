import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import ExcersiceCard from "@/components/excersiceCard";
import { motion } from "framer-motion";

export default function DocsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
      >
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({color: "blue"})}>Excersices</h1>
        </div>
        <ExcersiceCard />
      </section>
    </DefaultLayout>
    </motion.div>
  );
}

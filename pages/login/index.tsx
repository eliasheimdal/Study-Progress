import React from "react";
import DefaultLayout from "@/layouts/default";
import LoginForm from "@/components/loginForm";
import { motion } from "framer-motion";

export default function IndexPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
    >
      <DefaultLayout>
        <LoginForm />
      </DefaultLayout>
    </motion.div>
  );
}

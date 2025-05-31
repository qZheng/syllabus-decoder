"use client";
import { Accordion, AccordionItem } from "@heroui/react";

export default function AccordionElement() {
    const usedFor =
        "The purpose of this app is to allow students to easily extract information from their syllabi. We also support creation of exportable calendars, schedules, and data aggregation.";
    const howItWorks =
        "We upload your pdf to an advanced AI which parses the data and searches for important details like dates, times, and names. Then, we aggregate the data using algorithms to serve to the end user.";
    const whatInfoDoWeGenerate = "We'll figure out what to put here later.";

    return (
        <Accordion className="w-200 border-1 border-[#121212] rounded-4xl p-4 py-2">
            <AccordionItem
                classNames={{ title: "text-white text-2xl" }}
                key="1"
                aria-label="Accordion 1"
                title="What is this app used for?"
            >
                {usedFor}
            </AccordionItem>
            <AccordionItem
                classNames={{ title: "text-white text-2xl" }}
                key="2"
                aria-label="Accordion 2"
                title="How does it work?"
            >
                {howItWorks}
            </AccordionItem>
            <AccordionItem
                classNames={{ title: "text-white text-2xl" }}
                key="3"
                aria-label="Accordion 3"
                title="What information does the AI generate?"
            >
                {whatInfoDoWeGenerate}
            </AccordionItem>
        </Accordion>
    );
}

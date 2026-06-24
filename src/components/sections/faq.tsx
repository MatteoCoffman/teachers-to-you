import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Where do lessons take place?",
    answer:
      "Lessons are in-person only at launch. You can choose lessons at your location or at your teacher's location. If you choose your location and it is more than 15 minutes away, a $10 travel fee applies per lesson.",
  },
  {
    question: "How do packages work?",
    answer:
      "A package books four weekly lessons at the same day and time with one payment. There is no discount — it is simply a convenient way to reserve a month of lessons at once.",
  },
  {
    question: "What should I bring to my first lesson?",
    answer:
      "Bring your instrument, a tuner if you have one, and any songs or goals you want to work on. Your teacher will guide you from there.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellation and rescheduling policies are being finalized. Please contact us at least 24 hours before your lesson if you need to reschedule. Full policy details will be posted here soon.",
  },
  {
    question: "Do you offer online lessons?",
    answer:
      "Not yet — all lessons are in-person for now. Online options may be added in the future.",
  },
];

export function FaqSection() {
  return (
    <Accordion className="w-full">
      {faqItems.map((item, index) => (
        <AccordionItem key={item.question} value={`item-${index}`}>
          <AccordionTrigger className="text-left font-medium">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

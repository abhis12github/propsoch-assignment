import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initial: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "It feels like having a superpower! This tool has given us the ability to do things we never thought were possible in our work.",
    name: "David Wright",
    role: "Research Scientist",
    initial: "D",
  },
  {
    quote:
      "What a fantastic product! It has completely transformed the way we develop solutions and ship to customers.",
    name: "Manu Arora",
    role: "Tech Innovator & Entrepreneur",
    initial: "M",
  },
  {
    quote:
      "The results are always impressive. This has helped us to not only meet but exceed our performance targets.",
    name: "Jack Brown",
    role: "Performance Manager",
    initial: "J",
  },
  {
    quote:
      "Their expertise helped us navigate the financials, various options, and negotiation strategies. Quite professional and structured in their approach.",
    name: "Karthik R.",
    role: "Homebuyer, US",
    initial: "K",
  },
  {
    quote:
      "It was a blessing to find out the numerous red flags we were unaware of. The team does an outstanding job helping prospective buyers navigate a tricky market.",
    name: "Priya S.",
    role: "First-time Buyer",
    initial: "P",
  },
  {
    quote:
      "Their knowledge of the market and attention to detail were impeccable. The entire process was stress free and genuinely enjoyable.",
    name: "Ashok V.",
    role: "Investor",
    initial: "A",
  },
  {
    quote:
      "Organized a clear call to understand my requirements and followed up with a thoughtful shortlist. Coordinated and efficient throughout.",
    name: "Prashant K.",
    role: "NRI Buyer",
    initial: "P",
  },
  {
    quote:
      "Above and beyond in helping us find our new home. A unique approach and the right attitude made all the difference.",
    name: "Neha M.",
    role: "Family Buyer",
    initial: "N",
  },
];

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="group relative w-[340px] shrink-0 rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-foreground/20 sm:w-[400px]">
      <blockquote className="text-[15px] leading-relaxed text-card-foreground">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
          {t.initial}
        </div>
        <div className="leading-tight">
          <div className="text-sm font-medium text-foreground">{t.name}</div>
          <div className="text-xs text-muted-foreground">{t.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

function Row({
  items,
  reverse = false,
  duration = "40s",
}: {
  items: Testimonial[];
  reverse?: boolean;
  duration?: string;
}) {
  return (
    <div className="pause-on-hover overflow-hidden">
      <div
        className={cn("flex w-max gap-5", reverse ? "animate-marquee-reverse" : "animate-marquee")}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {[...items, ...items].map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const half = Math.ceil(TESTIMONIALS.length / 2);
  const rowA = TESTIMONIALS.slice(0, half);
  const rowB = TESTIMONIALS.slice(half);

  return (
    <section className="relative bg-background pb-6">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="mt-5 text-balance font-seminold tracking-tight text-primary sm:text-base">
          Hear from your fellow homeowners.
        </p>
        <p className="mt-4 text-pretty text-lg text-foreground sm:text-3xl">
          1000+ intelligent homebuyers trusted us with their biggest life decision because we helped them <span className="italic text-primary">know if</span> it was the right one.
        </p>
      </div>

      <div className="relative mt-14 space-y-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent sm:w-40" />
        <Row items={rowA} duration="50s" />
        <Row items={rowB} reverse duration="60s" />
      </div>
    </section>
  );
}
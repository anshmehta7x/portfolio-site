import Link from "next/link";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { achievements } from "@/data/achievements";
import { contactLinks, resume } from "@/data/contact";
import { trainer } from "@/data/trainer";
import { SITE_URL } from "@/data/site";

export const metadata = {
    title: "Text version",
    description:
        "Ansh Mehta's portfolio as plain text: projects, skills, achievements, resume and contact details.",
    alternates: { canonical: "/text" },
};

const PERSON_JSON_LD = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ansh Mehta",
    jobTitle: trainer.title,
    url: SITE_URL,
    sameAs: contactLinks.filter((link) => !link.href.startsWith("mailto:")).map((link) => link.href),
    alumniOf: "Vellore Institute of Technology",
};

function Section({ id, title, game, children }) {
    return (
        <section aria-labelledby={id} className="mt-10">
            <h2 id={id} className="flex items-baseline gap-3 border-b-4 border-[#c8281e] pb-1 font-pixeboy text-3xl">
                {title}
                <span className="text-base text-[#c8281e]">{game}</span>
            </h2>
            <div className="mt-4">{children}</div>
        </section>
    );
}

function ExternalLink({ href, children }) {
    return (
        <a href={href} className="text-[#a8201a] underline underline-offset-2 hover:text-[#c8281e]" target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    );
}

// Server-rendered plain HTML of everything in the room, for crawlers, screen
// readers and anyone who'd rather read than play.
export default function TextVersion() {
    return (
        <div className="min-h-screen bg-[#e8e4d8] text-[#303038]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }} />
            <main className="mx-auto max-w-3xl px-4 py-8 leading-relaxed sm:py-12">
                <p className="font-pixeboy text-lg">
                    <Link href="/" className="text-[#a8201a] underline underline-offset-2">
                        Play the interactive version
                    </Link>
                </p>
                <header className="mt-6">
                    <h1 className="font-arcade text-5xl leading-none text-[#303038] [text-shadow:3px_3px_0_#e8a090] sm:text-6xl">
                        Ansh Mehta
                    </h1>
                    <p className="mt-3 text-xl">{trainer.title}</p>
                    <ul className="mt-2 list-disc pl-5">
                        {trainer.lines.map((line) => (
                            <li key={line}>{line}</li>
                        ))}
                    </ul>
                </header>

                <Section id="projects" title="Projects" game="Pokedex">
                    <ol className="space-y-6">
                        {projectsData.map((project) => (
                            <li key={project.title}>
                                <h3 className="text-xl font-semibold">{project.title}</h3>
                                <p className="mt-1">{project.description}</p>
                                <p className="mt-1 text-sm">Built with: {project.techStack.join(", ")}</p>
                                <p className="mt-1 flex flex-wrap gap-4">
                                    {project.liveUrl && <ExternalLink href={project.liveUrl}>{project.liveUrlText || "Live demo"}</ExternalLink>}
                                    {project.githubUrl && <ExternalLink href={project.githubUrl}>Source</ExternalLink>}
                                </p>
                            </li>
                        ))}
                    </ol>
                </Section>

                <Section id="skills" title="Skills" game="Moves">
                    <dl className="space-y-3">
                        {skillsData.map((group) => (
                            <div key={group.category}>
                                <dt className="font-semibold">{group.category}</dt>
                                <dd>{group.skills.map((skill) => skill.name).join(", ")}</dd>
                            </div>
                        ))}
                    </dl>
                </Section>

                <Section id="achievements" title="Achievements" game="Badges">
                    <ul className="space-y-5">
                        {achievements.map((item) => (
                            <li key={item.id}>
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                {item.description.split("\n").map((line) => (
                                    <p key={line}>{line}</p>
                                ))}
                            </li>
                        ))}
                    </ul>
                </Section>

                <Section id="contact" title="Resume and contact" game="Trainer Card">
                    <ul className="space-y-2">
                        <li>
                            Resume: <ExternalLink href={resume.href}>{resume.label}</ExternalLink>
                        </li>
                        {contactLinks.map((link) => (
                            <li key={link.label}>
                                {link.label}:{" "}
                                {link.href.startsWith("mailto:") ? (
                                    <a href={link.href} className="text-[#a8201a] underline underline-offset-2">
                                        {link.display}
                                    </a>
                                ) : (
                                    <ExternalLink href={link.href}>{link.display}</ExternalLink>
                                )}
                            </li>
                        ))}
                    </ul>
                </Section>

                <footer className="mt-12 border-t-2 border-black/10 pt-4 text-sm">
                    A fan-made portfolio. Room model: &quot;Pokemon FireRed - Player&apos;s Room&quot; by Wesai, CC-BY-4.0.
                </footer>
            </main>
        </div>
    );
}

import Link from "next/link";
import HomeClient from "@/components/HomeClient";
import { projectsData } from "@/data/projects";
import { trainer } from "@/data/trainer";

// Server-rendered: crawlers and screen readers get a plain summary and a link
// to the full text version; everyone else gets the interactive room.
export default function Home() {
    return (
        <>
            <section className="sr-only">
                <h1>{trainer.name}: {trainer.title}</h1>
                <ul>
                    {trainer.lines.map((line) => (
                        <li key={line}>{line}</li>
                    ))}
                </ul>
                <h2>Projects</h2>
                <ul>
                    {projectsData.map((project) => (
                        <li key={project.title}>
                            {project.title}: {project.description}
                        </li>
                    ))}
                </ul>
                <p>
                    <Link href="/text">Read the full portfolio as plain text</Link>
                </p>
            </section>
            <noscript>
                <p className="p-6 text-center text-white">
                    The interactive room needs JavaScript.{" "}
                    <a className="underline" href="/text">
                        Read the text version of this portfolio
                    </a>
                    .
                </p>
            </noscript>
            <HomeClient />
        </>
    );
}

import { certifications } from "@/constants/certifications";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/motion/SectionHeading";

export const Certifications = () => {
	return (
		<section id="certifications" className="mb-10 mt-16">
			<SectionHeading subtitle="Completion of my certifications">Certifications</SectionHeading>

			<div className="grid grid-cols-1 gap-3">
				{certifications.map((certification, index) => (
					<Reveal key={index} direction="left" delay={index * 80}>
						<Card className="group bg-card/70 backdrop-blur-sm border-border hover:border-accent/60 hover:shadow-lg hover:shadow-accent/15 hover:translate-x-1 transition-all duration-300">
							<CardContent className="p-5">
								<a
									href={certification.url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-between gap-4 text-left"
								>
									<span className="flex items-center gap-3">
										<BadgeCheck className="w-5 h-5 shrink-0 text-primary transition-transform duration-300 group-hover:scale-125" />
										<span className="text-base md:text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
											{certification.title}
										</span>
									</span>
									<ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
								</a>
							</CardContent>
						</Card>
					</Reveal>
				))}
			</div>
		</section>
	);
};

export default Certifications;

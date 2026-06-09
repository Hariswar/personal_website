import { certifications } from "@/constants/certifications";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export const Certifications = () => {
	return (
		<div className="mb-10 mt-16 animate-fade-in" style={{ animationDelay: "0.8s" }}>
			<h2 className="text-4xl font-bold text-green-400 font-playfair mb-2">Certifications</h2>
			<p className="text-muted-foreground mb-4"> Completion of my certifications</p>

			<div className="grid grid-cols-1 gap-4">
				{certifications.map((certification, index) => (
					<Card key={index} className="bg-card border-border hover:border-yellow-400/60 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300">
						<CardContent className="p-5">
							<a
								href={certification.url}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-between gap-4 text-left group"
							>
								<span className="text-base md:text-lg font-semibold text-foreground group-hover:text-yellow-300 transition-colors">
									{certification.title}
								</span>
								<ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-yellow-300 transition-colors shrink-0" />
							</a>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Certifications;

import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Logo Section */}
      <div className="text-center mb-12">
        <div className="mb-8">
          <div className="bg-primary text-white flex aspect-square size-16 items-center justify-center rounded-lg mx-auto">
            <Zap className="size-8" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-foreground mb-4">Forge</h1>

        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          AI experimentation and data analysis platform
        </p>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
        >
          Launch Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

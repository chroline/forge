import logo from "@/logo.svg";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="text-center">
      <header className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-white text-lg">
        <Image
          src={logo}
          className="h-40 pointer-events-none animate-spin"
          style={{ animationDuration: "20s" }}
          alt="logo"
          width={160}
          height={160}
        />
        <p className="mt-4">
          Edit{" "}
          <code className="font-mono bg-gray-700 px-2 py-1 rounded">
            src/app/page.tsx
          </code>{" "}
          and save to reload.
        </p>
        <div className="mt-4 space-x-4">
          <a
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <a
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Next.js
          </a>
        </div>
      </header>
    </div>
  );
}

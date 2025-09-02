# Lemma - AI Experimentation Platform

A modern platform for AI experimentation, dataset management, and model evaluation.

## Getting Started

To run this application:

```bash
pnpm install
pnpm dev
```

## Building For Production

To build this application for production:

```bash
pnpm build
pnpm start
```

## Features

- **Dataset Management**: Upload, organize, and analyze datasets
- **Experiment Tracking**: Create and monitor AI experiments
- **Model Evaluation**: Comprehensive metrics and performance analysis
- **Modern UI**: Built with Next.js, Tailwind CSS, and Radix UI components

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: TanStack Query
- **Charts**: Recharts
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Main dashboard pages
│   │   ├── datasets/      # Dataset management
│   │   └── experiments/   # Experiment tracking
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
└── contexts/             # React contexts
```

## Development

This project uses modern React patterns and best practices:

- **File-based routing** with Next.js App Router
- **Server and client components** for optimal performance
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **TanStack Query** for data fetching and caching

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

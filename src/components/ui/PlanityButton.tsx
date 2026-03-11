import Link from "next/link";

interface PlanityButtonProps {
    href: string;
    label: string;
    className?: string;
}

/**
 * Comprésent les boutons de lien vers Planity
 * @param href
 * @param label
 * @param className
 * @constructor
 */
export default function PlanityButton({ href, label, className }: PlanityButtonProps) {
    return (
        <Link
            href={href ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`
                ${className ?? ""} group inline-flex items-center gap-3 
                text-[0.8rem] font-medium uppercase tracking-[0.18em] 
                hover:-translate-y-0.5 transition-all duration-400
            `}
        >
            {label}
            <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
        </Link>
    )
}
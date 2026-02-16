export const CATEGORY_MAP: Record<string, { label: string; iconPaths: string[] }> = {
    semipermanent: {
        label: "Semi-Permanent",
        iconPaths: [
            "M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z",
            "M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7",
            "M14.5 17.5 4.5 15",
        ],
    },
    "gel-extensions": {
        label: "Pose & Extensions Gel",
        iconPaths: [
            "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1",
            "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v6",
            "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8",
            "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
        ],
    },
    entretien: {
        label: "Entretien & Retouches",
        iconPaths: [
            "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
        ],
    },
    pieds: {
        label: "Beauté des Pieds",
        iconPaths: [
            "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5 10 7.66 8 9 8 11h.5c.28-.4.5-1 .5-2",
            "M18 14v-2.38C18 9.5 16.97 8.5 17 6c.03-2.72 1.49-6 4.5-6C23.37 0 24 1.8 24 3.5 24 5.66 22 7 22 9h.5c.28-.4.5-1 .5-2",
            "M4 21a2.5 2.5 0 0 1 0-5H8a1 1 0 0 1 1 1v1a3 3 0 0 1-3 3z",
            "M18 19a2.5 2.5 0 0 1 0-5h4a1 1 0 0 1 1 1v1a3 3 0 0 1-3 3z",
        ],
    },
    extras: {
        label: "Extras & Nail Art",
        iconPaths: [
            "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
            "M20 3v4",
            "M22 5h-4",
            "M4 17v2",
            "M5 18H3",
        ],
    },
};

export const CATEGORY_ORDER: string[] = [
    "semipermanent",
    "gel-extensions",
    "entretien",
    "pieds",
    "extras",
];

export function getCategoryLabel(category: string): string {
    return CATEGORY_MAP[category]?.label ?? category;
}

export function getCategoryIcon(category: string): string[] {
    return CATEGORY_MAP[category]?.iconPaths ?? [];
}

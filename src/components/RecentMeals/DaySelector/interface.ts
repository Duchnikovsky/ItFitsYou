interface DaySelectorProps {
    meals: {
        activeDay: Date;
        setActiveDay: (date: Date) => void;
        days: { day: string; date: Date }[];
    };
}
export type { DaySelectorProps };

interface DaySelectorProps {
    days: {
        activeDay: Date;
        setActiveDay: (date: Date) => void;
        week: { day: string; date: Date }[];
    };
}
export type { DaySelectorProps };

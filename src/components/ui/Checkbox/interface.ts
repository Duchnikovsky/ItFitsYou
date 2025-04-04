export interface CheckboxProps {
    children: React.ReactNode;
    checked: boolean;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}
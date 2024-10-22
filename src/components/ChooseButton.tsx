import { Button } from "antd";


interface ChooseButtonProps {
    text: string;
    onClick: () => void;
    isSelected?: boolean; // Новый проп для определения выделенной кнопки
}

export default function ChooseButton({ text, onClick, isSelected }: ChooseButtonProps) {

    return (
        <Button
            className={`w-full p-2 rounded mb-4 ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            type="default"
            onClick={onClick}
        >
            {text}
        </Button>
    );
}

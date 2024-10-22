import ChooseButton from "./ChooseButton.tsx";
import {useState} from "react";

interface ButtonsProps {
    setQrValue: (value: string) => void;
}

export default function Buttons({ setQrValue }: ButtonsProps) {
    const [selectedButton, setSelectedButton] = useState<string | null>(null)

    const shops = [
        { name: 'Пятерочка/Перекресток', value: '7789706487608915QR4654124623' },
        { name: 'Магнит', value: 'E7005001956020356T634515' },
        { name: 'Дикси', value: "1729119355" },
    ];

    return (
        <div className="">
            {shops.map(({name, value}) => (
                <ChooseButton
                    key={name}
                    text={name}
                    onClick={() => {
                        setQrValue(String(value));
                        setSelectedButton(String(value));
                    }}
                    isSelected={selectedButton === String(value)}
                />
            ))}
        </div>
    )
}
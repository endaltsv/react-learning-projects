import {QRCode} from "antd";

export default function CreateQrCode({ value }: { value: string }) {

    return (
        <div>
            <QRCode size={320} value={value}/>
        </div>
    )
}
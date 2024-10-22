import CreateQrCode from './components/CreateQrCode.tsx'
import {useState} from "react";
import Buttons from "./components/Buttons.tsx";

function App() {
    const [qrValue, setQrValue] = useState('Click button');

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col items-center w-full max-w-xs">
                <CreateQrCode value={qrValue} />
                <Buttons setQrValue={setQrValue}/>
            </div>

        </div>
    )
}

export default App

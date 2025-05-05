import { useState } from "react";
import { Mode } from "./Mode";

/**
 * Clickable object (button) that switches between multiple options
 *
 * @author      LBeukennoot for Seelde
 * @created     28-04-2025
 */
export default function SwitchButton({
    buttons = [],
    width = 7,
    onChange = () => { },
}: SwitchButtonType) {
    const [sessionKey, setSessionKey] = useState(0);

    const length = buttons.length;

    return (
        <div className="flex justify-center pb-6 text-lg">
            <button>
                <div className="h-12 flex items-center bg-blue rounded-xl relative">
                    <ButtonsElement
                        buttons={buttons}
                        width={width}
                        length={length}
                        sessionKey={sessionKey}
                        setSessionKey={setSessionKey}
                        onChange={onChange}
                    />

                    <div
                        className="border-blue bg-white rounded-xl border-6 absolute h-full top-0 transition-all duration-150"
                        style={{ left: sessionKey * width + "rem", width: width + "rem" }}
                    ></div>
                </div>
            </button>
        </div>
    );
}

const ButtonsElement = ({
    buttons,
    width,
    length,
    sessionKey,
    setSessionKey,
    onChange,
}: any) => {
    return buttons.map((b: Mode, key: number) => {
        return (
            <div className="flex items-center" key={key}>
                <div
                    onClick={() => {
                        if (sessionKey !== key) {
                            setSessionKey(key);
                            onChange(buttons[key]);
                        }
                    }}
                    className={"relative " + (sessionKey !== key ? "cursor-pointer" : null)}
                    style={{ width: width + "rem" }}
                >
                    {/* white text (when not button selected)*/}
                    <div
                        className={
                            "transition-all duration-150 text-white " +
                            (sessionKey === key ? "opacity-0" : "opacity-100")
                        }
                    >
                        {b}
                    </div>
                    {/* blue text (when button selected) */}
                    <div
                        className={
                            "text-blue z-50 absolute top-0 w-full transition-all duration-150 " +
                            (sessionKey === key ? "opacity-100" : "opacity-0")
                        }
                    >
                        {b}
                    </div>
                </div>
                {key !== length - 1 ? (
                    <div 
                    className={"transition-all border-white rounded-full border-[0.12rem] h-2/3 absolute " + (sessionKey === key ? "opacity-0" : "")}
                    style={{ left: (key * width) + width + "rem"}}
                    ></div>
                ) : null}
            </div>
        );
    });
};

export type SwitchButtonType = {
    buttons: Mode[];
    width?: number;
    onChange: Function;
};

export type SwitchButtonButtonType = {
    name: string;
    // disabled?: boolean //TODO implement disabled function/style
};

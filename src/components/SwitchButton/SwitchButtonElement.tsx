import { SwitchButtonElementButtonType, SwitchButtonElementType } from "./SwitchButtonType";

export default function ButtonsElement({ buttons, width, length, selectedButton, setSelectedButton, onChange }: SwitchButtonElementType) {
    return buttons.map((b: SwitchButtonElementButtonType, key: number) => {
        return (
            <div className="" key={key}>
                <div
                    onClick={() => {
                        if (selectedButton !== key) {
                            setSelectedButton(key);
                            onChange(buttons[key]);
                        }
                    }}
                    className={"px-4 py-2 rounded-full border-6 border-blue transition-all " + (selectedButton !== key ? "cursor-pointer hover:bg-light-blue" : null)}
                // className={"h-12 px-2 text-xl text-white bg-light-blue border-6 border-blue flex items-center justify-center rounded-full transition-all duration-150"}
                // className={"relative h-full " + (selectedButton !== key ? "cursor-pointer hover:bg-light-blue" : null)}
                // style={{ width: width + "rem" }}
                >
                    {b.name}
                    <div
                        className={"absolute flex items-center justify-center left-0 top-0 text-blue h-full w-1/3 z-50 transition-all duration-150 " + (selectedButton === key ? "opacity-100" : "opacity-0")}
                        style={{ left: (100 / length) * key + "%" }}
                    >{b.name}</div>
                    {key !== length - 1 ? (
                        <div
                            className={"absolute text-red top-0 h-full flex items-center z-[100] " + (selectedButton === key || selectedButton - 1 === key ? "opacity-0" : "")}
                            // className={"transition-all border-white rounded-full border-[0.12rem] h-2/3 absolute "}
                            // className={"transition-all border-white rounded-full border-[0.12rem] h-2/3 absolute " + (selectedButton === key ? "opacity-0" : "")}
                            style={{ left: (100 / length) * (key + 1) + "%" }}
                        >
                            {selectedButton === key}
                            <div className="border-2 border-white h-2/3 rounded-full"></div>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    });
    // return buttons.map((b: SwitchButtonElementButtonType, key: number) => {
    //     return (
    //         <div className="flex items-center" key={key}>
    //             <div
    //                 onClick={() => {
    //                     if (selectedButton !== key) {
    //                         setSelectedButton(key);
    //                         onChange(buttons[key]);
    //                     }
    //                 }}
    //                 className={"relative h-full " + (selectedButton !== key ? "cursor-pointer hover:bg-light-blue" : null)}
    //                 style={{ width: width + "rem" }}
    //             >
    //                 {/* white text (when not button selected)*/}
    //                 <div
    //                     className={
    //                         "transition-all duration-150 text-white " +
    //                         (selectedButton === key ? "opacity-0" : "opacity-100")
    //                     }
    //                 >
    //                     {b.name}
    //                 </div>
    //                 {/* blue text (when button selected) */}
    //                 <div
    //                     className={
    //                         "text-blue z-50 absolute top-0 w-full transition-all duration-150 " +
    //                         (selectedButton === key ? "opacity-100" : "opacity-0")
    //                     }
    //                 >
    //                     {b.name}
    //                 </div>
    //             </div>
    //             {/* {key !== length - 1 ? (
    //                 <div
    //                     className={"transition-all border-white rounded-full border-[0.12rem] h-2/3 absolute " + (selectedButton === key ? "opacity-0" : "")}
    //                     style={{ left: (key * width) + width + "rem" }}
    //                 ></div>
    //             ) : null} */}
    //         </div>
    //     );
    // });
};
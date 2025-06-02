// import { useContext } from "react"
// import { NavigationContext } from "../../providers/NavigationProvider"
// import Tablist from "../Tablist"
// import ScreenCard from "./screens/ScreenCard"

// export default function Navigation() {

//     const { ScreenElement, expanded } = useContext(NavigationContext)

//     return (
//         <div className="w-screen h-screen flex bg-light-green text-blue font-lexend items-center justify-center">

//             <div className="flex justify-center md:items-center h-full w-full md:w-auto m-2 md:m-0">

//                 <div className="md:flex items-start h-[30rem] w-full md:w-auto mt-2 md:m-0">
//                     <div className={"z-10 " + (expanded ? "" : "m-auto md:-ml-15 md:absolute max-w-xl")}>
//                         <Tablist expanded={expanded} />
//                     </div>

//                     <ScreenCard>
//                         <ScreenElement />
//                     </ScreenCard>
//                 </div>

//             </div>
//         </div>
//     )
// }

import React, { useState } from 'react';

// import { Sortable } from '../../2 - Presets/Sortable/Sortable';

import { Drawer } from './drawer/Drawer';

// export default {
//     title: 'Examples/Drawer/Sheet',
// };

interface Props {
    children: React.ReactNode;
}

export default function Navigation({ children }: Props) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div style={{ padding: 40 }}>
            <button onClick={() => setExpanded((value) => !value)}>
                {expanded ? 'Close' : 'Open'}
                ba
            </button>
            <Drawer
                expanded={expanded}
                header={'Bottom sheet'}
                onChange={setExpanded}
            >
                <p style={{ lineHeight: 2 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
                    mauris sit amet diam pulvinar vestibulum. Sed malesuada ultrices
                    hendrerit.
                </p>
            </Drawer>
        </div>
    );
}

// export const BottomSheet = () => (
//     <Drawer>
//         <p style={{ lineHeight: 2 }}>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
//             mauris sit amet diam pulvinar vestibulum. Sed malesuada ultrices
//             hendrerit.
//         </p>

//         {/* <Sortable handle /> */}

//         <p style={{ lineHeight: 2 }}>
//             Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
//             inceptos himenaeos. Nam nisi tortor, egestas volutpat tortor auctor,
//             efficitur molestie urna. Vestibulum blandit erat massa, eu ornare diam
//             porttitor at.
//         </p>
//     </Drawer>
// );
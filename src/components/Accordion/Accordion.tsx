import type { AccordionProps } from "."

import { Accordion as MUIAccordion } from "@mui/material"

export const Accordion = ({children}: AccordionProps) => {

    return (
        <MUIAccordion className="text-blue! text-xl shadow-none! border-t-2 border-light-blue">
            {children}
        </MUIAccordion>
    )
}
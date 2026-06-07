import { AccordionSummary as MUIAccordionSummary } from "@mui/material"
import type { AccordionProps } from "./types"
import { ArrowDownIcon } from "../Icons"

export const AccordionSummary = ({children}: AccordionProps) => {

    return (
        <MUIAccordionSummary className="border-b-2 border-blue" expandIcon={<ArrowDownIcon className="stroke-blue" />}>
            {children}
        </MUIAccordionSummary>
    )
}
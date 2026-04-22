export interface DropdownProps {
    options: string[]
    selected: Mode
    onSelect: (mode: SessionData) => void
    disabled?: boolean = false
}
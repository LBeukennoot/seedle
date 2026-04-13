export interface DropdownProps {
    options: SessionData[]
    selected: Mode
    onSelect: Function
    disabled?: boolean = false
}
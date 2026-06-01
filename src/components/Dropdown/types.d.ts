export interface DropdownOptions {
  id: string;
  label: string;
}

export interface DropdownProps {
  options: DropdownOptions[];
  selected: Mode;
  onSelect: (mode: SessionData) => void;
  disabled?: boolean;
}

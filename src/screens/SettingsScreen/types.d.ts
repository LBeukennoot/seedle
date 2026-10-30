type ToggleField = {
  name: keyof Settings['sessions'];
  label: string;
  type: 'toggle';
  value: keyof Settings['sessions'];
  onChange: (newValue: boolean, updateState: (path: string, value: boolean) => void) => void;
  options?: never;
  info?: string;
};

type SliderField = {
  name: keyof Settings['sessions'];
  label: string;
  type: 'slider';
  value: keyof Settings['sessions'];
  onChange: (newValue: number, updateState: (path: string, value: number) => void) => void;
  options: {
    min: number;
    max: number;
    safeZone?: { min: number; max: number };
    invert?: boolean;
  };
  info?: string;
};

type FormField = ToggleField | SliderField;

type FormConfig = {
  sessions: FormField[];
  sounds?: FormField[];
  notifications?: FormField[];
  graphics?: FormField[];
};

import { Icon, type IconProps } from "./Icon";

export function ArrowDownIcon(props: IconProps) {
    return (
        <Icon viewBox="0 0 16 9" size={16} {...props}>
            <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 1L8 8L1 1"
            />
        </Icon>
    )
}

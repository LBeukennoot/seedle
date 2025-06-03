import { IconType } from "../navigation/icons/IconType";

export default function ChangelogIcon({ className, ...props }: IconType) {
    return (
        <svg {...props} className={className} width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 1L8 8L1 1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

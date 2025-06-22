import { IconType } from "./IconType";

export default function StartIcon({ className }: IconType) {
    return (
        <svg className={className} width="20" height="20" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.60731 0.505746C2.16924 -0.676495 0 0.346133 0 2.20646V12.9523C0 14.8126 2.16924 15.8342 3.60731 14.6519L10.1437 9.27899C10.395 9.07245 10.5974 8.81294 10.7364 8.51909C10.8753 8.22524 10.9474 7.90432 10.9474 7.57938C10.9474 7.25444 10.8753 6.93353 10.7364 6.63967C10.5974 6.34582 10.395 6.08631 10.1437 5.87977L3.60731 0.507948V0.505746Z" />
        </svg>
    )
}
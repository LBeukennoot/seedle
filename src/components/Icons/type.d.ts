export type IconType = {
    className?: string
    id?: string
}

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | undefined
  className?: string | undefined
  children?: string | JSX.Element | JSX.Element[]
};
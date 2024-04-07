import { Icon, IconProps } from "@chakra-ui/react"

export const RubCurrencyIcon: React.FC<IconProps> = ({color}) => {
  return (
    <Icon viewBox="0 0 16 16" color={color}>
      <path fill="currentColor" d="M4.66659 14V12H3.33325V10.6667H4.66659V9.33333H3.33325V8H4.66659V2H8.99992C10.0221 2 10.8888 2.35556 11.5999 3.06667C12.311 3.77778 12.6666 4.64444 12.6666 5.66667C12.6666 6.68889 12.311 7.55556 11.5999 8.26667C10.8888 8.97778 10.0221 9.33333 8.99992 9.33333H5.99992V10.6667H8.66658V12H5.99992V14H4.66659ZM5.99992 8H8.99992C9.64436 8 10.1944 7.77222 10.6499 7.31667C11.1055 6.86111 11.3333 6.31111 11.3333 5.66667C11.3333 5.02222 11.1055 4.47222 10.6499 4.01667C10.1944 3.56111 9.64436 3.33333 8.99992 3.33333H5.99992V8Z" />
    </Icon>
  )
}
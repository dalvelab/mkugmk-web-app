import { Icon, IconProps } from "@chakra-ui/react"

export const FileIcon: React.FC<IconProps> = ({color}) => {
  return (
    <Icon width="22" height="31" viewBox="0 0 22 31" fill="none" color={color}>
      <path stroke="#64748B" d="M14.125 1.25H3.5C2.83696 1.25 2.20107 1.545 1.73223 2.0701C1.26339 2.5952 1 3.30739 1 4.05V26.45C1 27.1926 1.26339 27.9048 1.73223 28.4299C2.20107 28.955 2.83696 29.25 3.5 29.25H18.5C19.163 29.25 19.7989 28.955 20.2678 28.4299C20.7366 27.9048 21 27.1926 21 26.45V8.95L14.125 1.25Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.5 2.65039V11.0504H21" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Icon>
  )
}
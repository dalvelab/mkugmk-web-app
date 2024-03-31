import ReactMarkdown from "react-markdown";

import styles from './styles.module.css';

interface MarkdownProps {
  children: string;
}

export const Markdown: React.FC<MarkdownProps> = ({children}) => {
  return (
    <ReactMarkdown className={styles.markdown}>
      {children}
    </ReactMarkdown>
  )
}
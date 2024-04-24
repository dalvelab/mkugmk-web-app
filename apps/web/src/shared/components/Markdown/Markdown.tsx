import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import DOMPurify from "isomorphic-dompurify";

import styles from './styles.module.css';

interface MarkdownProps {
  children: string;
}

export const Markdown: React.FC<MarkdownProps> = ({children}) => {
  return (
    // @ts-ignore
    <ReactMarkdown className={styles.markdown} rehypePlugins={[rehypeRaw]}>
      {DOMPurify.sanitize(children)}
    </ReactMarkdown>
  )
}
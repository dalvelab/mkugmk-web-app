import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import DOMPurify from "isomorphic-dompurify";

import styles from "./styles.module.css";

interface MarkdownProps {
  children: string;
}

interface LinkRendererProps extends Omit<HTMLLinkElement, "children"> {
  children: React.ReactNode;
}

function LinkRenderer(props: LinkRendererProps) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

export const Markdown: React.FC<MarkdownProps> = ({ children }) => {
  return (
    <ReactMarkdown
      // @ts-ignore
      components={{ a: LinkRenderer }}
      className={styles.markdown}
      // @ts-ignore
      rehypePlugins={[rehypeRaw]}
    >
      {DOMPurify.sanitize(children)}
    </ReactMarkdown>
  );
};

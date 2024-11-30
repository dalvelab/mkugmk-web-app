import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import DOMPurify from "isomorphic-dompurify";
import { chakra } from "@chakra-ui/react";
import rehypeUnwrapImages from "rehype-unwrap-images";

import styles from "./styles.module.css";

interface MarkdownProps {
  children: string;
}

interface LinkRendererProps extends Omit<HTMLLinkElement, "children"> {
  children: React.ReactNode;
}

function LinkRenderer(props: LinkRendererProps) {
  return <a href={props.href}>{props.children}</a>;
}

interface ImageRendererProps extends Omit<HTMLImageElement, "children"> {
  children: React.ReactNode;
}

function ImageRenderer(props: ImageRendererProps) {
  return <chakra.img src={props.src} alt={props.alt} />;
}

export const Markdown: React.FC<MarkdownProps> = ({ children }) => {
  return (
    <ReactMarkdown
      // @ts-ignore
      components={{ a: LinkRenderer, img: ImageRenderer }}
      className={styles.markdown}
      // @ts-ignore
      rehypePlugins={[rehypeRaw, rehypeUnwrapImages]}
    >
      {DOMPurify.sanitize(children)}
    </ReactMarkdown>
  );
};

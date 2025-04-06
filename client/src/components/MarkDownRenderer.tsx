import ReactMarkdown from "react-markdown";

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <div className="prose">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

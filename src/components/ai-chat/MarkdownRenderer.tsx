import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MarkdownRendererProps {
  content: string;
}

const CodeBlock: React.FC<{
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}> = ({ inline, className, children, ...props }) => {
  if (inline) {
    return (
      <code className="md-inline-code" {...props}>
        {children}
      </code>
    );
  }

  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  return (
    <div className="md-code-block-wrapper">
      {language && <span className="md-code-lang">{language}</span>}
      <pre className="md-code-block">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  return (
    <div className="md-renderer">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ ...props }) => <h1 className="md-h1" {...props} />,
          h2: ({ ...props }) => <h2 className="md-h2" {...props} />,
          h3: ({ ...props }) => <h3 className="md-h3" {...props} />,
          h4: ({ ...props }) => <h4 className="md-h4" {...props} />,
          p: ({ ...props }) => <p className="md-p" {...props} />,
          ul: ({ ...props }) => <ul className="md-ul" {...props} />,
          ol: ({ ...props }) => <ol className="md-ol" {...props} />,
          li: ({ ...props }) => <li className="md-li" {...props} />,
          strong: ({ ...props }) => <strong className="md-strong" {...props} />,
          em: ({ ...props }) => <em className="md-em" {...props} />,
          code: CodeBlock as any,
          pre: ({ ...props }) => <pre className="md-pre" {...props} />,
          table: ({ ...props }) => (
            <div className="md-table-wrapper">
              <table className="md-table" {...props} />
            </div>
          ),
          thead: ({ ...props }) => <thead className="md-thead" {...props} />,
          th: ({ ...props }) => <th className="md-th" {...props} />,
          td: ({ ...props }) => <td className="md-td" {...props} />,
          tr: ({ ...props }) => <tr className="md-tr" {...props} />,
          a: ({ ...props }) => (
            <a className="md-link" target="_blank" rel="noopener noreferrer" {...props} />
          ),
          blockquote: ({ ...props }) => (
            <blockquote className="md-blockquote" {...props} />
          ),
          hr: ({ ...props }) => <hr className="md-hr" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

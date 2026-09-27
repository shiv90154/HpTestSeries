import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Server-rendered long-form markdown (exam syllabus, blog posts) — no client JS, so the text is
 * in the HTML Google crawls. GFM adds tables for cutoff/pattern charts. Raw HTML is never
 * rendered. Internal links use next/link; external ones open in a new tab.
 */
export function Markdown({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`prose-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href = "", children }) =>
            href.startsWith("/") ? (
              <Link href={href}>{children}</Link>
            ) : (
              <a href={href} target="_blank" rel="noopener noreferrer nofollow">
                {children}
              </a>
            ),
          table: ({ children }) => (
            <div className="table-wrap">
              <table>{children}</table>
            </div>
          ),
          // eslint-disable-next-line @next/next/no-img-element -- admin-authored URLs of unknown size
          img: ({ src, alt }) => <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} loading="lazy" decoding="async" />,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

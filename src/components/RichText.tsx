const HTML_TAG = /<\/?[a-z][\s\S]*>/i;

/**
 * Renders long-form body text. Content written in the WordPress editor
 * arrives as HTML (already sanitised by WordPress with wp_kses_post on
 * save); the local mock data is plain text with line breaks.
 */
export function RichText({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  if (HTML_TAG.test(content)) {
    return (
      <div
        className={`rich-text ${className}`}
        dangerouslySetInnerHTML={{ __html: toParagraphs(cleanPastedHtml(content)) }}
      />
    );
  }

  return <p className={`whitespace-pre-line ${className}`}>{content}</p>;
}

/**
 * Text pasted from Word/Google Docs carries inline fonts, colours and sizes
 * (style="font-family: Arial…", class="MsoNormal", lang="FA") that would
 * override the site's typography, so those presentational attributes and
 * Word's <o:p> tags are dropped. Structure (p, strong, a, lists…) is kept.
 */
function cleanPastedHtml(html: string): string {
  return html
    .replace(/<\/?o:p>/gi, "")
    .replace(/\s(?:style|class|lang|align|face|color|size)\s*=\s*(?:"[^"]*"|'[^']*')/gi, "")
    .replace(/<p>(?:\s|&nbsp;| )*<\/p>/gi, "");
}

/**
 * WordPress stores editor content without <p> tags (wpautop runs only on
 * output in themes), so blank-line-separated blocks become paragraphs and
 * single newlines become <br>, unless the block is already block-level HTML.
 */
function toParagraphs(html: string): string {
  const blockTag = /^\s*<(p|div|h[1-6]|ul|ol|li|blockquote|figure|table|pre|hr)[\s>]/i;
  return html
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) =>
      blockTag.test(block) ? block : `<p>${block.replace(/\n/g, "<br />")}</p>`
    )
    .join("\n");
}

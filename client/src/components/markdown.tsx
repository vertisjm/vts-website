import { Fragment } from "react";

/*
 * A deliberately small Markdown renderer for blog articles. It supports what the articles use:
 * ## / ### headings, "- " and "1. " lists, paragraphs, **bold**, *italic* and [links](https://…).
 * Everything is rendered as React elements, never as raw HTML.
 */

type Block =
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "ul" | "ol"; items: string[] };

function parseBlocks(source: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;

  const flush = () => {
    if (paragraph.length) blocks.push({ type: "p", text: paragraph.join(" ") });
    if (list) blocks.push(list);
    paragraph = [];
    list = null;
  };

  for (const raw of source.split("\n")) {
    const line = raw.trim();
    const heading = /^(#{2,3})\s+(.*)$/.exec(line);
    const bullet = /^[-*]\s+(.*)$/.exec(line);
    const numbered = /^\d+\.\s+(.*)$/.exec(line);

    if (!line) {
      flush();
    } else if (heading) {
      flush();
      blocks.push({ type: heading[1].length === 2 ? "h2" : "h3", text: heading[2] });
    } else if (bullet || numbered) {
      const type = bullet ? "ul" : "ol";
      if (paragraph.length) {
        blocks.push({ type: "p", text: paragraph.join(" ") });
        paragraph = [];
      }
      if (!list || list.type !== type) {
        if (list) blocks.push(list);
        list = { type, items: [] };
      }
      list.items.push((bullet ?? numbered)![1]);
    } else if (list) {
      // A wrapped continuation of the previous list item.
      list.items[list.items.length - 1] += " " + line;
    } else {
      paragraph.push(line);
    }
  }
  flush();
  return blocks;
}

const INLINE_SOURCE = String.raw`\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)`;

function renderInline(text: string) {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  // A fresh regex per call: bold/italic text is rendered recursively, and a shared global regex
  // would have its lastIndex reset by the inner call, looping forever.
  const inline = new RegExp(INLINE_SOURCE, "g");
  while ((m = inline.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = out.length;
    if (m[1] !== undefined) out.push(<strong key={key} className="font-semibold text-ink">{renderInline(m[1])}</strong>);
    else if (m[2] !== undefined) out.push(<em key={key}>{renderInline(m[2])}</em>);
    else
      out.push(
        <a key={key} href={m[4]} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline-offset-2 hover:underline">
          {m[3]}
        </a>,
      );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.map((node, i) => <Fragment key={i}>{node}</Fragment>);
}

export function Markdown({ source }: { source: string }) {
  return (
    <div className="flex flex-col gap-5 text-[17px] leading-[1.75] text-slate">
      {parseBlocks(source).map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} className="mt-6 font-display text-2xl font-bold leading-snug text-ink lg:text-[28px]">
                {renderInline(b.text)}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-3 font-display text-xl font-semibold leading-snug text-ink">
                {renderInline(b.text)}
              </h3>
            );
          case "ul":
          case "ol": {
            const List = b.type;
            return (
              <List key={i} className={(b.type === "ul" ? "list-disc" : "list-decimal") + " flex flex-col gap-2 pl-6 marker:text-leaf-dark"}>
                {b.items.map((item, j) => (
                  <li key={j} className="pl-1">
                    {renderInline(item)}
                  </li>
                ))}
              </List>
            );
          }
          default:
            return <p key={i}>{renderInline(b.text)}</p>;
        }
      })}
    </div>
  );
}

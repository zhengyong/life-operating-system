'use client';

import {Check, Copy, Download, Share2, X} from 'lucide-react';
import {useCallback, useEffect, useId, useRef, useState} from 'react';
import type {Locale} from '@/lib/i18n';
import styles from './PerspectiveShare.module.css';

export type PerspectiveShareProps = {
  locale: Locale;
  eventTitle: string;
  title: string;
  summary: string;
  kind?: 'event' | 'comparison' | 'article';
  sources?: Array<{label: string; href: string}>;
  articleHref?: string;
};

function wrapText(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const lines: string[] = [];
  for (const paragraph of text.split(/\r?\n/)) {
    if (!paragraph.trim()) {
      lines.push('');
      continue;
    }
    const tokens = paragraph.match(/[\u3400-\u9fff\uf900-\ufaff]|[^\s\u3400-\u9fff\uf900-\ufaff]+|\s+/gu) ?? [];
    let line = '';
    for (const token of tokens) {
      const pieces = context.measureText(token).width > maxWidth ? Array.from(token) : [token];
      for (const piece of pieces) {
        const candidate = line + piece;
        if (line && context.measureText(candidate).width > maxWidth) {
          lines.push(line.trimEnd());
          line = piece.trimStart();
        } else {
          line = candidate.trimStart();
        }
      }
    }
    if (line) lines.push(line.trimEnd());
  }
  return lines;
}

function limitLines(context: CanvasRenderingContext2D, lines: string[], maximum: number, width: number) {
  if (lines.length <= maximum) return lines;
  const result = lines.slice(0, maximum);
  let last = result[maximum - 1];
  while (last && context.measureText(`${last}…`).width > width) last = last.slice(0, -1);
  result[maximum - 1] = `${last}…`;
  return result;
}

function readableUrl(href: string) {
  try {
    const url = new URL(href);
    return `${url.hostname}${decodeURIComponent(url.pathname)}${decodeURIComponent(url.hash)}`;
  } catch {
    return href;
  }
}

export function PerspectiveShare({locale, eventTitle, title, summary, kind = 'event', sources = [], articleHref}: PerspectiveShareProps) {
  const zh = locale === 'zh';
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [nativeShare, setNativeShare] = useState(false);
  const [busy, setBusy] = useState<'download' | 'share' | 'copy'>();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const id = useId();
  const titleId = `${id}-title`;
  const helpId = `${id}-help`;
  const label = kind === 'event' ? (zh ? '事件摘要' : 'Event brief') : (zh ? '个人观点' : 'Author analysis');

  const close = useCallback(() => {
    setOpen(false);
    dialogRef.current?.close();
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    setUrl(new URL(articleHref ?? window.location.href, window.location.href).href);
    setNativeShare(typeof navigator.share === 'function');
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [open, articleHref]);

  useEffect(() => {
    if (!open || !url || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) {
      setError(true);
      setMessage(zh ? '当前浏览器无法生成图片，请复制链接分享。' : 'This browser cannot create the image. Copy the link to share it.');
      return;
    }
    try {
      const width = 1080;
      const padding = 76;
      const textWidth = width - padding * 2;
      const font = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", "PingFang SC", sans-serif';
      context.font = `750 64px ${font}`;
      const heading = limitLines(context, wrapText(context, title, textWidth), 6, textWidth);
      context.font = `400 38px ${font}`;
      const body = limitLines(context, wrapText(context, summary, textWidth), 14, textWidth);
      context.font = `600 25px ${font}`;
      const eventLines = limitLines(context, wrapText(context, eventTitle, textWidth), 2, textWidth);
      const sourceLines = sources.slice(0, 3).map((source) => {
        let host = '';
        try { host = new URL(source.href, url).hostname.replace(/^www\./, ''); } catch { /* Keep a readable label for a relative source. */ }
        return limitLines(context, wrapText(context, `${source.label}${host ? ` · ${host}` : ''}`, textWidth), 1, textWidth)[0] ?? '';
      });
      context.font = `400 24px ${font}`;
      const urlLines = limitLines(context, wrapText(context, readableUrl(url), textWidth), 3, textWidth);
      const height = Math.max(1120, 490 + eventLines.length * 34 + heading.length * 82 + body.length * 59 + sourceLines.length * 35 + urlLines.length * 31);
      canvas.width = width;
      canvas.height = height;
      context.fillStyle = '#f4f3ed';
      context.fillRect(0, 0, width, height);
      context.fillStyle = '#205543';
      context.fillRect(0, 0, width, 18);
      context.textBaseline = 'top';
      context.fillStyle = '#205543';
      context.font = `750 31px ${font}`;
      context.fillText('LIFE OS  /  PERSPECTIVE ATLAS', padding, 72);
      context.fillStyle = '#52645a';
      context.font = `600 25px ${font}`;
      let y = 132;
      for (const line of eventLines) { context.fillText(line, padding, y); y += 34; }
      y += 28;
      context.fillStyle = kind === 'event' ? '#205543' : '#784b32';
      context.font = `700 26px ${font}`;
      context.fillText(label.toUpperCase(), padding, y);
      y += 57;
      context.fillStyle = '#19271f';
      context.font = `750 64px ${font}`;
      for (const line of heading) { context.fillText(line, padding, y); y += 82; }
      y += 32;
      context.fillStyle = '#394b40';
      context.font = `400 38px ${font}`;
      for (const line of body) { context.fillText(line, padding, y); y += 59; }
      if (sourceLines.length) {
        y += 36;
        context.fillStyle = '#52645a';
        context.font = `700 23px ${font}`;
        context.fillText(zh ? '参考来源 · 详见原文' : 'SOURCES · SEE THE FULL PAGE', padding, y);
        y += 38;
        context.font = `400 24px ${font}`;
        for (const line of sourceLines) { context.fillText(line, padding, y); y += 35; }
      }
      const footerY = height - 154 - urlLines.length * 31;
      context.strokeStyle = '#d1d9cf';
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(padding, footerY);
      context.lineTo(width - padding, footerY);
      context.stroke();
      context.fillStyle = '#205543';
      context.font = `700 25px ${font}`;
      const date = new Intl.DateTimeFormat('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Shanghai'}).format(new Date());
      context.fillText(`${zh ? '郑勇 · Life OS' : 'Yong Zheng · Life OS'}  |  ${date}`, padding, footerY + 30);
      context.fillStyle = '#52645a';
      context.font = `400 24px ${font}`;
      urlLines.forEach((line, index) => context.fillText(line, padding, footerY + 75 + index * 31));
      setReady(true);
    } catch {
      setReady(false);
      setError(true);
      setMessage(zh ? '图片生成失败，仍可复制链接。' : 'The image could not be created. You can still copy the link.');
    }
  }, [open, url, locale, title, summary, eventTitle, kind, sources, label, zh]);

  function report(text: string, failed = false) {
    setError(failed);
    setMessage(text);
  }

  async function copyLink() {
    setBusy('copy');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(url);
      report(zh ? '链接已复制。' : 'Link copied.');
    } catch {
      report(zh ? '未能自动复制，请选中下面的链接手动复制。' : 'Copy failed. Select the link below and copy it manually.', true);
    } finally {
      setBusy(undefined);
    }
  }

  function imageBlob() {
    return new Promise<Blob>((resolve, reject) => {
      const canvas = canvasRef.current;
      if (!canvas || !ready) { reject(new Error('image unavailable')); return; }
      canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('image unavailable')), 'image/png');
    });
  }

  async function downloadImage() {
    setBusy('download');
    try {
      const blob = await imageBlob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = objectUrl;
      anchor.download = `perspective-atlas-${kind}-${locale}.png`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      report(zh ? '已发起 PNG 下载，请查看浏览器下载记录。' : 'PNG download requested. Check your browser downloads.');
    } catch {
      report(zh ? '图片下载失败，请尝试复制链接。' : 'The image could not be downloaded. Try copying the link.', true);
    } finally {
      setBusy(undefined);
    }
  }

  async function share() {
    setBusy('share');
    setMessage('');
    try {
      await navigator.share({title, text: `${label}: ${summary}`, url});
      report(zh ? '系统分享操作已完成。' : 'System share completed.');
    } catch (cause) {
      if (!(cause instanceof DOMException && cause.name === 'AbortError')) {
        report(zh ? '系统分享未完成，可以复制链接或下载图片。' : 'System share did not complete. Copy the link or download the image instead.', true);
      }
    } finally {
      setBusy(undefined);
    }
  }

  return (
    <>
      <button ref={triggerRef} type="button" className={styles.trigger} onClick={() => { setMessage(''); setError(false); setReady(false); setOpen(true); }}>
        <Share2 size={16} aria-hidden="true" /> {zh ? '分享卡片' : 'Share card'}
      </button>
      {open ? (
        <dialog
          ref={dialogRef}
          className={styles.dialog}
          aria-labelledby={titleId}
          aria-describedby={helpId}
          onCancel={(event) => { event.preventDefault(); close(); }}
          onClose={() => { setOpen(false); triggerRef.current?.focus(); }}
          onClick={(event) => { if (event.target === event.currentTarget) close(); }}
        >
          <div className={styles.content}>
            <header className={styles.heading}>
              <div>
                <p className={styles.eyebrow}>PERSPECTIVE ATLAS</p>
                <h2 id={titleId}>{zh ? '把观点带走' : 'Share a perspective'}</h2>
              </div>
              <button type="button" className={styles.close} onClick={close} aria-label={zh ? '关闭分享窗口' : 'Close sharing dialog'} autoFocus><X size={21} aria-hidden="true" /></button>
            </header>
            <p id={helpId} className={styles.help}>{zh ? '复制链接，或下载图片后分享到微信、微博、X 等平台。' : 'Copy the link, or download the image to share on WeChat, Weibo, X and other platforms.'}</p>
            <div className={styles.preview} aria-busy={!ready}>
              <canvas ref={canvasRef} width={1080} height={1120} role="img" aria-label={`${label} · ${title} · ${summary}`}>{title} — {summary}</canvas>
            </div>
            <div className={styles.actions}>
              <button type="button" disabled={Boolean(busy)} onClick={copyLink}><Copy size={16} aria-hidden="true" />{zh ? '复制链接' : 'Copy link'}</button>
              <button type="button" disabled={!ready || Boolean(busy)} onClick={downloadImage}><Download size={16} aria-hidden="true" />{busy === 'download' ? (zh ? '正在生成…' : 'Preparing…') : (zh ? '下载 PNG' : 'Download PNG')}</button>
              {nativeShare ? <button type="button" disabled={Boolean(busy)} onClick={share}><Share2 size={16} aria-hidden="true" />{zh ? '系统分享' : 'System share'}</button> : null}
            </div>
            <p className={styles.status} data-error={error} role="status" aria-live="polite">{message && !error ? <Check size={15} aria-hidden="true" /> : null}{message}</p>
            <label className={styles.linkLabel}>
              {zh ? '分享链接' : 'Share link'}
              <input value={url} readOnly onFocus={(event) => event.currentTarget.select()} aria-label={zh ? '分享链接，可手动复制' : 'Share link, available to copy manually'} />
            </label>
            <p className={styles.note}>{kind === 'event' ? (zh ? '事件摘要不替代原始资料，请结合来源阅读。' : 'The event brief does not replace the original sources.') : (zh ? '卡片呈现作者分析；观点对照不代表真实人物相互回应。' : 'This card presents the author’s analysis. A comparison does not imply that real people replied to one another.')}</p>
          </div>
        </dialog>
      ) : null}
    </>
  );
}

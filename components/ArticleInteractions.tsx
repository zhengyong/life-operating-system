'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import {Clock3, ExternalLink, Flame, MessageSquare, RefreshCw, ThumbsUp} from 'lucide-react';
import type {Locale} from '@/lib/i18n';

const REPO = 'zhengyong/life-operating-system';

type GitHubIssue = {
  number: number;
  title: string;
  html_url: string;
  comments: number;
  reactions?: {
    '+1'?: number;
    total_count?: number;
  };
};

type GitHubComment = {
  id: number;
  html_url: string;
  body: string;
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  reactions?: {
    '+1'?: number;
    total_count?: number;
  };
};

type SortMode = 'time' | 'hot';

const copy = {
  zh: {
    eyebrow: '互动讨论',
    title: '评论与点赞',
    intro: '评论数据托管在 GitHub Issues 中。你可以在本站登录 GitHub 提交评论，也可以按时间或热度查看讨论。',
    time: '按时间',
    hot: '按热门',
    refresh: '刷新',
    loading: '正在读取评论...',
    empty: '暂无评论。你可以在下方留下第一条讨论。',
    commentCount: '条评论',
    likeCount: '个赞',
    submitTitle: '提交评论',
    submitHint: '评论提交后会同步到 GitHub Issue，刷新后会进入上方排序列表。',
    githubAction: '去 GitHub 点赞 / 查看',
    setup: '如果下方评论框提示需要安装 utterances，请先在 GitHub 仓库启用 Issues 并安装 utterances App。'
  },
  en: {
    eyebrow: 'Discussion',
    title: 'Comments & Likes',
    intro: 'Comments are stored in GitHub Issues. You can sign in with GitHub to comment, then browse discussion by time or popularity.',
    time: 'Time',
    hot: 'Popular',
    refresh: 'Refresh',
    loading: 'Loading comments...',
    empty: 'No comments yet. You can start the discussion below.',
    commentCount: 'comments',
    likeCount: 'likes',
    submitTitle: 'Leave a Comment',
    submitHint: 'New comments are stored in the GitHub issue and appear in the sorted list after refresh.',
    githubAction: 'Like / View on GitHub',
    setup: 'If the comment box asks for setup, enable Issues in the GitHub repo and install the utterances App first.'
  }
} satisfies Record<Locale, Record<string, string>>;

export function ArticleInteractions({locale}: {locale: Locale}) {
  const t = copy[locale];
  const utterancesRef = useRef<HTMLDivElement>(null);
  const [issueTerm, setIssueTerm] = useState('');
  const [issue, setIssue] = useState<GitHubIssue | null>(null);
  const [comments, setComments] = useState<GitHubComment[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>('time');
  const [loading, setLoading] = useState(true);

  const issueLikes = issue?.reactions?.['+1'] ?? 0;

  const sortedComments = useMemo(() => {
    const cloned = [...comments];

    if (sortMode === 'hot') {
      return cloned.sort((a, b) => getHotScore(b) - getHotScore(a));
    }

    return cloned.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [comments, sortMode]);

  useEffect(() => {
    setIssueTerm(window.location.pathname);
  }, []);

  useEffect(() => {
    if (!issueTerm) {
      return;
    }

    void loadComments(issueTerm);
  }, [issueTerm]);

  useEffect(() => {
    const container = utterancesRef.current;

    if (!container || !issueTerm) {
      return;
    }

    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('repo', REPO);
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', 'comment');
    script.setAttribute('theme', 'github-light');
    script.setAttribute('crossorigin', 'anonymous');

    container.appendChild(script);
  }, [issueTerm]);

  async function loadComments(term: string) {
    setLoading(true);

    try {
      const foundIssue = await findIssue(term);
      setIssue(foundIssue);

      if (!foundIssue) {
        setComments([]);
        return;
      }

      const response = await fetch(
        `https://api.github.com/repos/${REPO}/issues/${foundIssue.number}/comments?per_page=100`,
        {headers: {'Accept': 'application/vnd.github+json'}}
      );

      if (!response.ok) {
        setComments([]);
        return;
      }

      const data = (await response.json()) as GitHubComment[];
      setComments(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-14 border-t border-line pt-10">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{t.eyebrow}</p>
      <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-normal text-ink">{t.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{t.intro}</p>
        </div>
        {issue ? (
          <a
            href={issue.html_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-line px-4 py-2 text-sm font-medium text-muted transition hover:border-accent hover:text-accent"
          >
            <ExternalLink className="h-4 w-4" />
            {t.githubAction}
          </a>
        ) : null}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-line bg-white p-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <MessageSquare className="h-4 w-4 text-accent" />
            <span>{comments.length}</span>
            <span>{t.commentCount}</span>
          </div>
        </div>
        <div className="rounded-lg border border-line bg-white p-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <ThumbsUp className="h-4 w-4 text-accent" />
            <span>{issueLikes}</span>
            <span>{t.likeCount}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <SortButton active={sortMode === 'time'} onClick={() => setSortMode('time')} icon={<Clock3 className="h-4 w-4" />}>
          {t.time}
        </SortButton>
        <SortButton active={sortMode === 'hot'} onClick={() => setSortMode('hot')} icon={<Flame className="h-4 w-4" />}>
          {t.hot}
        </SortButton>
        <button
          type="button"
          onClick={() => issueTerm && void loadComments(issueTerm)}
          className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-medium text-muted transition hover:border-accent hover:text-accent"
        >
          <RefreshCw className="h-4 w-4" />
          {t.refresh}
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {loading ? <p className="rounded-lg bg-soft p-5 text-sm text-muted">{t.loading}</p> : null}
        {!loading && sortedComments.length === 0 ? (
          <p className="rounded-lg bg-soft p-5 text-sm leading-7 text-muted">{t.empty}</p>
        ) : null}
        {!loading
          ? sortedComments.map((comment) => (
              <article key={comment.id} className="rounded-lg border border-line bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <a href={comment.user.html_url} target="_blank" rel="noreferrer" className="flex min-w-0 items-center gap-3">
                    <img src={comment.user.avatar_url} alt="" className="h-9 w-9 rounded-full" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">{comment.user.login}</p>
                      <p className="text-xs text-muted">{formatDate(comment.created_at, locale)}</p>
                    </div>
                  </a>
                  <a
                    href={comment.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 rounded-md bg-soft px-2.5 py-1 text-xs text-muted transition hover:text-accent"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    {comment.reactions?.['+1'] ?? 0}
                  </a>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-muted">{comment.body}</p>
              </article>
            ))
          : null}
      </div>

      <div className="mt-10 rounded-lg border border-line bg-white p-5">
        <h3 className="text-lg font-semibold tracking-normal text-ink">{t.submitTitle}</h3>
        <p className="mt-2 text-sm leading-7 text-muted">{t.submitHint}</p>
        <p className="mt-2 text-xs leading-6 text-muted">{t.setup}</p>
        <div ref={utterancesRef} className="mt-4" />
      </div>
    </section>
  );
}

async function findIssue(term: string) {
  const query = `repo:${REPO} is:issue in:title ${JSON.stringify(term)}`;
  const url = `https://api.github.com/search/issues?${new URLSearchParams({q: query, per_page: '5'})}`;
  const response = await fetch(url, {headers: {'Accept': 'application/vnd.github+json'}});

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as {items?: GitHubIssue[]};
  const items = data.items ?? [];

  return items.find((item) => item.title === term) ?? items[0] ?? null;
}

function getHotScore(comment: GitHubComment) {
  return (comment.reactions?.total_count ?? 0) + (comment.reactions?.['+1'] ?? 0);
}

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(value));
}

function SortButton({
  active,
  children,
  icon,
  onClick
}: {
  active: boolean;
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition ${
        active ? 'border-ink bg-ink text-white' : 'border-line text-muted hover:border-accent hover:text-accent'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

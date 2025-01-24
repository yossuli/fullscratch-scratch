export const pagesPath = {
  docs: {
    $url: (url?: { hash?: string | undefined } | undefined) => ({
      pathname: '/docs' as const,
      hash: url?.hash,
    }),
  },
  login: {
    $url: (url?: { hash?: string | undefined } | undefined) => ({
      pathname: '/login' as const,
      hash: url?.hash,
    }),
  },
  questEditor: {
    Control: {
      $url: (url?: { hash?: string | undefined } | undefined) => ({
        pathname: '/questEditor/Control' as const,
        hash: url?.hash,
      }),
    },
  },
  $url: (url?: { hash?: string | undefined } | undefined) => ({
    pathname: '/' as const,
    hash: url?.hash,
  }),
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  docs: {
    openapi_json: '/docs/openapi.json',
  },
  favicon_png: '/favicon.png',
  frourio_svg: '/frourio.svg',
  images: {
    bg_jpg: '/images/bg.jpg',
  },
} as const;

export type StaticPath = typeof staticPath;

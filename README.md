# vite-react-cdn

Vite の React で CDN を使ってみる。Bun を使ったけど、npm, pnpm, yarn でも動くと思う

Vite の Plugin は 何種類かあるみたい。

- [vite-plugin-cdn-import - npm](https://www.npmjs.com/package/vite-plugin-cdn-import)
- [vite-plugin-cdn2 - npm](https://www.npmjs.com/package/vite-plugin-cdn2)

## 最初の実験 (tag: step1)

[上の vite-plugin-cdn-import を使って](https://www.npmjs.com/package/vite-plugin-cdn-import) jsDelivr から React まわりを取得してみる。
設定は [vite-plugin-cdn-import](https://www.npmjs.com/package/vite-plugin-cdn-import)の "Use preset" のところにあるやつを使用。

[vite.config.ts](vite.config.ts)参照。以下は要点だけ

```typescript
import cdn from "vite-plugin-cdn-import";

　plugins: [
  	cdn({
			modules: ["react", "react-dom"],
		}),
	],
```

`bun run dev` では ローカルの npm_modules/以下を使用する。`bun run build`　して `bun run preview`

before:

```console
$ tsc -b && vite build
vite v5.4.7 building for production...
✓ 34 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.29 kB
dist/assets/index-DiwrgTda.css    1.39 kB │ gzip:  0.72 kB
dist/assets/index-D2SP6z6Y.js   147.83 kB │ gzip: 48.42 kB
```

after:

```console
$ bun run build
$ tsc -b && vite build
vite v5.4.7 building for production...
✓ 20 modules transformed.
dist/index.html                  0.71 kB │ gzip: 0.37 kB
dist/assets/index-DiwrgTda.css   1.39 kB │ gzip: 0.72 kB
dist/assets/index-DOwLkL4p.js   13.77 kB │ gzip: 5.83 kB
```

`dist/index.html`　には

```html
<!doctype html>
<html lang="en">
  <head>
    <script
      src="https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js"
      crossorigin="anonymous"
    ></script>

    <meta charset="UTF-8" />
  </head>
</html>
```

みたいに挿入される。

```console
$ bun pm ls | grep react
(略)
├── react@18.3.1
├── react-dom@18.3.1
(略)
```

なのでバージョンも一致している (たまたま「最新」というだけかも)。

## ステップ 2 - Preset packages にないものを使ってみる

[vite-plugin-cdn-import](https://www.npmjs.com/package/vite-plugin-cdn-import)の Preset にないものを使ってみる。

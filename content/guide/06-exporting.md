---
title: Exporting
---

Many sites are effectively *static*, which is to say they don't actually need an Express server backing them. Instead, they can be hosted and served as static files, which allows them to be deployed to more hosting environments (such as [Netlify](https://www.netlify.com/) or [GitHub Pages](https://pages.github.com/)). Static sites are generally cheaper to operate and have better performance characteristics.

Sapper allows you to *export* a static site with a single zero-config `sapper export` command. In fact, you're looking at an exported site right now!

Static doesn't mean non-interactive — your Svelte components work exactly as they do normally, and you still get all the benefits of client-side routing and prefetching.

> This is an experimental feature — if you encounter unexpected behaviour or feel that there are missing features, please raise an issue!


### sapper export

Inside your Sapper project, try this:

```bash
# npx allows you to use locally-installed dependencies
npx sapper export
```

This will create a `dist` folder with a production-ready build of your site. You can launch it like so:

```bash
npx serve dist
```

Navigate to [localhost:5000](http://localhost:5000) (or whatever port `serve` picked), and verify that your site works as expected.

You can also add a script to your package.json...

```js
{
	"scripts": {
		...
		"build": "sapper export"
	}
}
```

...allowing you to `npm run build` your app.


### When not to export

The basic rule is this: for an app to be exportable, any two users hitting the same page of your app must get the same content from the server. In other words, any app that involves user sessions or authentication is *not* a candidate for `sapper export`.

Note that you can still export apps with dynamic routes, like our `routes/blog/[slug].html` example from earlier. `sapper export` will intercept `fetch` requests made inside `preload`, so the data served from `routes/api/blog/[slug].js` will also be captured.


### Route conflicts

Because `sapper export` writes to the filesystem, it isn't possible to have two server routes that would cause a directory and a file to have the same name. For example, `routes/api/blog/index.js` and `routes/api/blog/[slug].js` would try to create `dist/blog` and `dist/blog/some-slug`, which is impossible.

The solution is to rename one of the routes to avoid conflict — for example, `routes/api/blog-index.js`. (Note that you would also need to update any code that fetches data from `/api/blog` to reference `/api/blog-index` instead.)

For *pages*, we skirt around this problem by writing `dist/foo/index.html` instead of `dist/foo`.
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: false,
      strict: true
    }),
    paths: {
      // Replace "your-repo-name" with your actual repository name
      base: process.env.NODE_ENV === 'production' ? '/ec' : ''
    }
  }
};

export default config;
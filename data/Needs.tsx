// eslint-disable-next-line import/no-anonymous-default-export
export default {
  DEFAULT_FILE: {
    // PostCSS configuration
    "postcss.config.js": {
      code: `module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
  `,
    },

    // Tailwind configuration
    "tailwind.config.ts": {
      code: `import type { Config } from 'tailwindcss'
  
  export default {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: '#FF0080',
          secondary: '#FF8C00',
          accent: '#00FF87',
        },
        animation: {
          'spin-slow': 'spin 3s linear infinite',
        }
      },
    },
    plugins: [
      require('tailwind-scrollbar')
    ],
  } satisfies Config
  `,
    },

    // Global CSS
    "app.css": {
      code: `@tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  @layer base {
    html {
      @apply scroll-smooth;
    }
    body {
      @apply bg-slate-900 text-slate-100;
    }
  }
  
  @layer components {
    .btn-primary {
      @apply bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all;
    }
  }
  `,
    },

    // Public index.html
    "/public/index.html": {
      code: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="AI-generated application">
    <title>AI Generated App</title>
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
  </html>
  `,
    },

    // Main application entry
    "/src/main.tsx": {
      code: `import React from 'react'
  import ReactDOM from 'react-dom/client'
  import App from './App'
  import './app.css'
  
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  `,
    },
  },

  DEPENDANCY: {
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "react-markdown": "^8.0.3",
    "react-syntax-highlighter": "^15.5.0",
    "react-icons": "^4.6.0",
    "lucide-react": "latest",
    "react-hot-toast": "^2.4.0",
    "tailwind-merge": "^1.8.0",
    "tailwind-scrollbar": "^2.1.0",
    tailwindcss: "^3.3.2",
    postcss: "^8.4.21",
    autoprefixer: "^10.4.21",
    clsx: "^1.2.1",
    "framer-motion": "^10.12.16",
    "@types/node": "^20.3.1",
    "@types/react": "^18.2.14",
    "@types/react-dom": "^18.2.6",
  },
};

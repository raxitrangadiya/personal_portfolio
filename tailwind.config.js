/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bgVoid: "var(--bg-void)",       // Deep Space Black / light neutral
                bgSurface: "var(--bg-surface)",    // Panel/Card background
                bgRaised: "var(--bg-raised)",     // Elevated panels/nav
                accentPrimary: "var(--accent-primary)", // Electric Violet
                accentGlow: "var(--accent-glow)",    // Soft Purple glow
                accentAi: "var(--accent-ai)",      // AI Cyan
                accentWarm: "var(--accent-warm)",    // Coral hovers/alerts
                textPrimary: "var(--text-primary)",   // Near-white body / dark slate
                textMuted: "var(--text-muted)",     // Slate-400
                textDim: "var(--text-dim, #3d4a5c)",       // Slate-600
                borderGlass: "var(--border-glass)",
                shadow3d: "var(--shadow-3d)",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                label: ['Space Grotesk', 'sans-serif'],
            },
            boxShadow: {
                'glow-violet': '0 0 25px rgba(108, 99, 255, 0.25)',
                'glow-cyan': '0 0 25px rgba(0, 229, 255, 0.3)',
                'card-3d': '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(108, 99, 255, 0.1)',
            },
            animation: {
                'float-slow': 'float 8s ease-in-out infinite',
                'float-delayed': 'float 10s ease-in-out infinite 2s',
                'orbit-clock': 'orbit 25s linear infinite',
                'orbit-counter': 'orbit-reverse 30s linear infinite',
                'pulse-glow': 'pulse-glow 4s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-15px) rotate(2deg)' },
                },
                orbit: {
                    '0%': { transform: 'rotate(0deg) translate(180px) rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg) translate(180px) rotate(-360deg)' },
                },
                'orbit-reverse': {
                    '0%': { transform: 'rotate(360deg) translate(160px) rotate(-360deg)' },
                    '100%': { transform: 'rotate(0deg) translate(160px) rotate(0deg)' },
                },
                'pulse-glow': {
                    '0%': { filter: 'drop-shadow(0 0 2px rgba(108, 99, 255, 0.2))' },
                    '100%': { filter: 'drop-shadow(0 0 15px rgba(108, 99, 255, 0.6))' },
                }
            }
        },
    },
    plugins: [],
}

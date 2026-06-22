/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bgVoid: "#050811",       // Deep Space Black
                bgSurface: "#0D1117",    // Panel/Card background
                bgRaised: "#161B27",     // Elevated panels/nav
                accentPrimary: "#6C63FF", // Electric Violet
                accentGlow: "#A78BFA",    // Soft Purple glow
                accentAi: "#00E5FF",      // AI Cyan
                accentWarm: "#FF6B6B",    // Coral hovers/alerts
                textPrimary: "#F0F6FF",   // Near-white body
                textMuted: "#8892A4",     // Slate-400
                textDim: "#3D4A5C",       // Slate-600
                borderGlass: "rgba(108, 99, 255, 0.15)",
                shadow3d: "rgba(108, 99, 255, 0.35)",
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

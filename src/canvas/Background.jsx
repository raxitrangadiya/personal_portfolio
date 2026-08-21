import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Stars as DreiStars } from '@react-three/drei';
import * as THREE from 'three';

const GALAXY_THEMES = {
    'cosmic-aurora': {
        insideColor: '#ff6030', // Orange core
        outsideColor: '#1b3984', // Blue edge
        highlights: ['#6C63FF', '#00E5FF', '#9d4edd']
    },
    'neon-nebula': {
        insideColor: '#D946EF', // Fuchsia core
        outsideColor: '#1E1B4B', // Deep indigo edge
        highlights: ['#F472B6', '#3B82F6', '#ec4899']
    },
    'solar-flare': {
        insideColor: '#F59E0B', // Amber core
        outsideColor: '#450A0A', // Dark red edge
        highlights: ['#EF4444', '#FBBF24', '#dc2626']
    },
    'forest-matrix': {
        insideColor: '#10B981', // Emerald core
        outsideColor: '#022C22', // Deep forest green edge
        highlights: ['#F59E0B', '#34D399', '#059669']
    },
    'cyber-sentinel': {
        insideColor: '#06B6D4', // Mint core
        outsideColor: '#0F172A', // Slate edge
        highlights: ['#22D3EE', '#F1F5F9', '#38BDF8']
    }
};

function Galaxy({ theme, isLight, ...props }) {
    const ref = useRef();

    const parameters = {
        count: 20000,
        size: isLight ? 0.022 : 0.015,
        radius: 6,
        branches: 3,
        spin: 1,
        randomness: 0.3,
        randomnessPower: 3
    };

    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 3);

        const t = GALAXY_THEMES[theme] || GALAXY_THEMES['cosmic-aurora'];
        const colorInside = new THREE.Color(t.insideColor);
        const colorOutside = new THREE.Color(t.outsideColor);
        const highlightColors = t.highlights.map(c => new THREE.Color(c));

        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3;

            // Position
            const radius = Math.random() * parameters.radius;
            const spinAngle = radius * parameters.spin;
            const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY * 0.8; // flatter disk
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

            // Color - Cosmic Fusion Logic
            const mixedColor = colorInside.clone();
            mixedColor.lerp(colorOutside, radius / parameters.radius);

            // "Cosmic Fusion" Mixing
            const randomVal = Math.random();
            if (randomVal > 0.9) {
                mixedColor.lerp(highlightColors[0], 0.5); // Primary Accent highlights
            } else if (randomVal > 0.6) {
                mixedColor.lerp(highlightColors[1], 0.4); // Highlight Accent 2
            } else if (randomVal > 0.3) {
                mixedColor.lerp(highlightColors[2], 0.3); // Highlight Accent 3
            }

            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;
        }

        return { positions, colors };
    }, [theme]);

    useFrame((state, delta) => {
        // Calculate dynamic page scroll ratio
        const scrollY = window.scrollY || 0;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
        const scrollRatio = scrollY / maxScroll;

        // Orbit rotation + scroll-driven spin speed up
        ref.current.rotation.y = scrollRatio * Math.PI * 1.5 + state.clock.getElapsedTime() * 0.02;

        // Dynamic 3D parallax zoom: fly deeper into galaxy on scroll
        ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, scrollRatio * 2.8, 0.05);
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, scrollRatio * -1.5, 0.05);

        // Subtle mouse tilt combined with scroll coordinates
        if (state.pointer) {
            const { x, y } = state.pointer;
            ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, (y * 0.15) + (scrollRatio * 0.2), 0.08);
            ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, (-x * 0.15), 0.08);
        }
    });

    return (
        <group rotation={[0.4, 0, 0]}>
            <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    vertexColors
                    size={parameters.size}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
                    opacity={isLight ? 0.6 : 1}
                />
            </Points>
        </group>
    );
}

export default function Background({ theme, isLight }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-transparent">
            <Canvas camera={{ position: [0, 3, 6], fov: 60 }}>
                {/* Background stars for depth - hide in light mode */}
                {!isLight && (
                    <DreiStars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
                )}
                <Galaxy theme={theme} isLight={isLight} />
            </Canvas>
        </div>
    );
}

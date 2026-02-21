import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Stars as DreiStars } from '@react-three/drei';
import * as THREE from 'three';

function Galaxy(props) {
    const ref = useRef();

    // Reverting to the "High Quality" version (Step 231)
    const parameters = {
        count: 20000,
        size: 0.015,
        radius: 6,
        branches: 3,
        spin: 1,
        randomness: 0.3,
        randomnessPower: 3,
        insideColor: '#ff6030',
        outsideColor: '#1b3984',
    };

    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 3);

        const colorInside = new THREE.Color(parameters.insideColor);
        const colorOutside = new THREE.Color(parameters.outsideColor);

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
                mixedColor.lerp(new THREE.Color('#64ffda'), 0.5); // Cyan highlights (Portfolio Primary)
            } else if (randomVal > 0.6) {
                mixedColor.lerp(new THREE.Color('#9d4edd'), 0.4); // Electric Purple for depth
            } else if (randomVal > 0.3) {
                mixedColor.lerp(new THREE.Color('#5390d9'), 0.3); // Royal Blue
            }

            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;
        }

        return { positions, colors };
    }, []);

    useFrame((state, delta) => {
        ref.current.rotation.y += delta * 0.03;
        // Interactive tilt
        if (state.pointer) {
            const { x, y } = state.pointer;
            ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, y * 0.2, 0.1);
            ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, -x * 0.2, 0.1);
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
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

export default function Background() {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#050510]">
            <Canvas camera={{ position: [0, 3, 6], fov: 60 }}>
                {/* Background stars for depth */}
                <DreiStars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
                <Galaxy />
            </Canvas>
        </div>
    );
}

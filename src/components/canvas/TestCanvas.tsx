"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function SpinningBox() {
    const ref = useRef<THREE.Mesh>(null!);
    useFrame((_, dt) => {
        if (!ref.current) return;
        ref.current.rotation.x += dt * 0.5;
        ref.current.rotation.y += dt * 0.7;
    });
    return (
        <mesh ref={ref}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#c19a6b" />
        </mesh>
    );
}

export default function TestCanvas() {
    return (
        <Canvas camera={{ position: [2, 1.5, 2], fov: 50 }} dpr={[1, 2]}>
            {/* solid background so a blank frame is obvious */}
            <color attach="background" args={["#121317"]} />
            <ambientLight intensity={0.7} />
            <directionalLight intensity={1.2} position={[3, 5, 2]} />
            <SpinningBox />
        </Canvas>
    );
}

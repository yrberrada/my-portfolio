// src/components/ChessPiece.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function PieceModel({ path, scale = 1 }: { path: string; scale?: number }) {
    const { scene } = useGLTF(path);
    const ref = useRef<THREE.Group>(null);

    // slow constant rotation
    useFrame(() => {
        if (ref.current) ref.current.rotation.y += 0.01;
    });

    // Mild tilt adds a premium feel
    scene.rotation.set(0.15, Math.PI * 0.1, 0);
    scene.updateMatrixWorld();

    return <primitive ref={ref} object={scene} scale={scale} />;
}

export default function ChessPiece({
                                       piece,
                                       scale = 1.2,
                                       className = "w-28 h-28",
                                       ariaLabel,
                                   }: {
    piece: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
    scale?: number;
    className?: string;
    ariaLabel?: string;
}) {
    return (
        <div className={className} role="img" aria-label={ariaLabel ?? `${piece} piece`}>
            <Canvas camera={{ position: [0.6, 0.8, 1.6], fov: 35 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[2, 3, 1]} intensity={1.1} />
                <Suspense fallback={null}>
                    {/* ✅ load models directly from /public/models */}
                    <PieceModel path={`/models/${capitalize(piece)}_white.glb`} scale={scale} />
                    <Environment preset="studio" />
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            </Canvas>
        </div>
    );
}

// Helper: ensure first letter is uppercase
function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ✅ Preload models for snappier loading
useGLTF.preload("/models/Pawn_white.glb");
useGLTF.preload("/models/Rook_white.glb");
useGLTF.preload("/models/Knight_white.glb");
useGLTF.preload("/models/Bishop_white.glb");
useGLTF.preload("/models/Queen_white.glb");
useGLTF.preload("/models/King_white.glb");

"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

type Piece = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
const pathFor = (p: Piece) => `/models/${p.charAt(0).toUpperCase() + p.slice(1)}_white.glb`;

function normalize(root: THREE.Object3D, footprintXZ = 0.92, lift = 0.02) {
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    root.position.sub(center);

    const maxXZ = Math.max(size.x, size.z) || 1;
    root.scale.setScalar(footprintXZ / maxXZ);

    const after = new THREE.Box3().setFromObject(root);
    root.position.y -= after.min.y;
    root.position.y += lift;

    root.traverse((o) => (o.frustumCulled = false));
}

function Model({ piece }: { piece: Piece }) {
    const { scene } = useGLTF(pathFor(piece));
    const ref = useRef<THREE.Group>(null);

    const model = useMemo(() => {
        const g = (scene as THREE.Group).clone(true);
        normalize(g);
        return g;
    }, [scene]);

    useFrame((_, dt) => {
        if (ref.current) ref.current.rotation.y += dt * 0.6;
    });

    return <primitive ref={ref} object={model} />;
}

export default function DecorPiece({
                                       piece,
                                       className = "w-64 h-64",
                                       camera = [0.7, 0.95, 1.35] as [number, number, number],
                                   }: {
    piece: Piece;
    className?: string;
    camera?: [number, number, number];
}) {
    return (
        <div className={className} aria-label={`${piece} decoration`}>
            <Canvas camera={{ position: camera, fov: 35 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[2.2, 3, 1.2]} intensity={1.15} />
                <Suspense fallback={null}>
                    <Model piece={piece} />
                    <Environment preset="studio" />
                </Suspense>
            </Canvas>
        </div>
    );
}

useGLTF.preload("/models/Pawn_white.glb");
useGLTF.preload("/models/Rook_white.glb");
useGLTF.preload("/models/Knight_white.glb");
useGLTF.preload("/models/Bishop_white.glb");
useGLTF.preload("/models/Queen_white.glb");
useGLTF.preload("/models/King_white.glb");

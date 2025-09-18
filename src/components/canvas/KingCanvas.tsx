// src/components/canvas/KingCanvas.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function normalize(root: THREE.Object3D, footprintXZ = 1.15, lift = 0.02) {
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

    root.traverse(o => (o.frustumCulled = false));
}

function KingModel({ rotateSpeed = 0.5 }: { rotateSpeed?: number }) {
    const { scene } = useGLTF("/models/King_white.glb");
    const ref = useRef<THREE.Group>(null);

    const model = useMemo(() => {
        const g = (scene as THREE.Group).clone(true);
        normalize(g); // uses the tighter defaults above
        return g;
    }, [scene]);

    useFrame((_, dt) => {
        if (ref.current) ref.current.rotation.y += dt * rotateSpeed;
    });

    return <primitive ref={ref} object={model} />;
}

export default function KingCanvas({
                                       className = "w-72 aspect-square",   // <- keep square to avoid resize “zoom”
                                       rotateSpeed = 0.4,
                                       camera = [0.58, 0.95, 1.02] as [number, number, number], // <- closer
                                   }: {
    className?: string;
    rotateSpeed?: number;
    camera?: [number, number, number];
}) {
    return (
        <div className={className} aria-label="King piece">
            <Canvas camera={{ position: camera, fov: 35 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[2.2, 3, 1.2]} intensity={1.15} />
                <Suspense fallback={null}>
                    <KingModel rotateSpeed={rotateSpeed} />
                    <Environment preset="studio" />
                </Suspense>
            </Canvas>
        </div>
    );
}

useGLTF.preload("/models/King_white.glb");

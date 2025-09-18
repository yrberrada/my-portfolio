"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function NormalizedPiece({ path }: { path: string }) {
    const { scene } = useGLTF(path);
    const ref = useRef<THREE.Group>(null);

    // Normalize + center once
    const model = useMemo(() => {
        const cloned = scene.clone(true);

        // Compute bounding box
        const box = new THREE.Box3().setFromObject(cloned);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        // Recenter
        cloned.position.sub(center);

        // Scale so piece fits nicely (target height ~1)
        const targetHeight = 1;
        const scale = targetHeight / size.y;
        cloned.scale.setScalar(scale);

        return cloned;
    }, [scene]);

    // Rotation (optional, slow spin)
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.005;
        }
    });

    return <primitive ref={ref} object={model} />;
}

export default function ChessPiece({
                                       piece,
                                       className,
                                   }: {
    piece: string;
    className?: string;
}) {
    const modelPath = `/models/${piece}_white.glb`;

    return (
        <div className={className}>
            <Canvas camera={{ position: [0, 1.5, 2.2], fov: 35 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[2, 3, 2]} intensity={1} />
                <Suspense fallback={null}>
                    <NormalizedPiece path={modelPath} />
                </Suspense>
            </Canvas>
        </div>
    );
}

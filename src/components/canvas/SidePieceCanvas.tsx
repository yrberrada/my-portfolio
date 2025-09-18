// src/components/canvas/SidePieceCanvas.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const BG = "#121317";

function normalize(root: THREE.Object3D) {
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Center the model
    root.position.sub(center);

    // Scale so it fits nicely
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 1.2 / maxDim;
    root.scale.setScalar(scale);

    // Drop it to ground level
    const newBox = new THREE.Box3().setFromObject(root);
    root.position.y -= newBox.min.y;
}

function RotatingModel({ path }: { path: string }) {
    const { scene } = useGLTF(path);
    const ref = useRef<THREE.Group>(null);

    const model = useMemo(() => {
        const clone = scene.clone(true);
        normalize(clone);
        return clone;
    }, [scene]);

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.3; // slow rotation
        }
    });

    return <primitive ref={ref} object={model} />;
}

export default function SidePieceCanvas({
                                            modelPath,
                                            className,
                                        }: {
    modelPath: string;
    className?: string;
}) {
    return (
        <div className={className ?? "w-40 h-40"}>
            <Canvas
                camera={{ position: [0, 0.8, 2.2], fov: 40 }}
                dpr={[1, 2]}
                gl={{ preserveDrawingBuffer: true }}
            >
                <color attach="background" args={[BG]} />
                <ambientLight intensity={0.7} />
                <directionalLight position={[2, 3, 2]} intensity={1.2} />
                <Suspense fallback={null}>
                    <RotatingModel path={modelPath} />
                    <Environment preset="studio" />
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
}

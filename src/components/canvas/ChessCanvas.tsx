"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
    Center, Bounds, ContactShadows, Environment, OrbitControls, useGLTF
} from "@react-three/drei";
import CanvasLoader from "@/components/CanvasLoader";

const MODEL_PATH = "/models/wooden-chess.glb";

function ChessModel() {
    const { scene } = useGLTF(MODEL_PATH);
    scene.rotation.set(0, Math.PI * 0.12, 0);
    return <primitive object={scene} />;
}
useGLTF.preload(MODEL_PATH);

export default function ChessCanvas() {
    return (
        <Canvas dpr={[1, 2]} camera={{ position: [2.5, 2.0, 2.5], fov: 42 }}>
            <color attach="background" args={["#121317"]} />

            <ambientLight intensity={0.6} />
            <directionalLight intensity={1.2} position={[3, 5, 2]} />
            <Environment preset="city" />
            <ContactShadows position={[0, -0.01, 0]} opacity={0.25} scale={10} blur={2.5} far={3} />

            <Suspense fallback={<CanvasLoader />}>
                <Center>
                    <Bounds fit clip observe margin={1.2}>
                        <group>
                            <ChessModel />
                        </group>
                    </Bounds>
                </Center>
            </Suspense>

            <OrbitControls
                enablePan={false}
                maxPolarAngle={Math.PI / 2.2}
                minDistance={1.6}
                maxDistance={4}
            />
        </Canvas>
    );
}

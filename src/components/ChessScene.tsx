"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
    Bounds,
    Environment,
    OrbitControls,
    useGLTF,
    ContactShadows,
    Html,
    Center,
} from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { goTo } from "@/utils/scroll";

// ---- CONFIG you can tweak quickly ----
const MODEL_PATH = "/models/wooden-chess.glb";
const BG = "#121317"; // matches .bg-panel in your CSS palette
const ROTATE_Y = Math.PI * 0.12; // slight turn so it's not flat-on
const SCALE_HINT = 3.3; // try 1, 0.1 or 10 if your model is huge/tiny

function Model() {
    const { scene } = useGLTF(MODEL_PATH);
    // If your model looks rotated wrong, adjust here:
    scene.rotation.set(0, ROTATE_Y, 0);
    scene.updateMatrixWorld();
    return <primitive object={scene} />;
}
useGLTF.preload(MODEL_PATH);

// Labels are attached AFTER centering, so these coordinates are easier to tweak.
function Hotspots() {
    const pts = useMemo(
        () => [
            { pos: [0.35, 0.18, 0.15], label: "♛ Projects", to: "projects" },
            { pos: [0.45, 0.18, -0.10], label: "♜ Skills", to: "skills" },
            { pos: [0.10, 0.18, 0.05], label: "♚ About", to: "about" },
            { pos: [-0.15, 0.18, 0.10], label: "♝ Education", to: "education" },
            { pos: [0.10, 0.18, -0.25], label: "♟ Contact", to: "contact" },
        ],
        []
    );

    return (
        <>
            {pts.map((p, i) => (
                <group key={i} position={p.pos as any}>
                    <Html
                        center
                        className="rounded-md bg-white/15 text-white text-xs sm:text-sm backdrop-blur border border-panel px-2 py-1 cursor-pointer select-none"
                        onClick={() => goTo(p.to)}
                        distanceFactor={6}
                    >
                        {p.label}
                    </Html>
                </group>
            ))}
        </>
    );
}

export default function ChessScene() {
    // Performance: lower devicePixelRatio on small screens
    const isSmall = useMediaQuery({ maxWidth: 640 });

    return (
        <div className="w-full h-[420px] sm:h-[480px] rounded-2xl overflow-hidden border border-panel bg-panel">
            <Canvas
                dpr={isSmall ? [1, 1.5] : [1, 2]}
                camera={{ position: [2.2, 2.0, 2.2], fov: 42, near: 0.1, far: 100 }}
            >
                {/* Match canvas background to site panel so it doesn't look blank/white */}
                <color attach="background" args={[BG]} />

                {/* Lighting */}
                <ambientLight intensity={0.6} />
                <directionalLight intensity={1.2} position={[3, 5, 2]} />

                <Environment preset="city" />
                <ContactShadows

                    position={[0, -0.01, 0]}
                    opacity={0.25}
                    scale={10}
                    blur={2.5}
                    far={3}
                />
                <gridHelper args={[10, 10]} />

                <Suspense fallback={null}>
                    {/* Center normalizes pivot & bounds makes camera fit the model */}
                    <Center>
                        <Bounds fit clip observe margin={1.2}>
                            <group scale={SCALE_HINT}>
                                <Model />
                                <Hotspots />
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
        </div>
    );
}

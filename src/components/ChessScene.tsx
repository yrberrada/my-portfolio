"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
    Environment,
    OrbitControls,
    useGLTF,
    ContactShadows,
    Html,
    Center,
    Bounds,
} from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { goTo } from "@/utils/scroll";

// ----------------------
// Debug / Tuning toggles
// ----------------------

// Path to your model in /public
const MODEL_PATH = "/models/wooden-chess.glb";

// Canvas background (match your panel)
const BG = "#121317";

// Start simple: force a scale and no auto-fit.
// Try SCALE_HINT = 0.1, then 1, then 10 until you see the set.
const SCALE_HINT = 1;

// Turn this ON to let Bounds auto-frame the model AFTER you find a good scale.
// While you're still trying to make the model appear, keep this false.
const AUTO_FIT = false;

// Show a ground grid while debugging framing/scale
const SHOW_GRID = true;

// small yaw to avoid dead-front view
const ROTATE_Y = Math.PI * 0.12;

// ----------------------

function Model() {
    const { scene } = useGLTF(MODEL_PATH);
    // light angle; tweak if board is sideways
    useMemo(() => {
        scene.rotation.set(0, ROTATE_Y, 0);
        scene.updateMatrixWorld();
    }, [scene]);
    return <primitive object={scene} />;
}
useGLTF.preload(MODEL_PATH);

// Original HTML hotspots (easy to see/click)
function Hotspots() {
    const pts = [
        { pos: [0.35, 0.18, 0.15], label: "♛ Projects", to: "projects" },
        { pos: [0.45, 0.18, -0.10], label: "♜ Skills", to: "skills" },
        { pos: [0.10, 0.18, 0.05], label: "♚ About", to: "about" },
        { pos: [-0.15, 0.18, 0.10], label: "♝ Education", to: "education" },
        { pos: [0.10, 0.18, -0.25], label: "♟ Contact", to: "contact" },
    ];
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
    // cap DPR on small screens for perf
    const isSmall = useMediaQuery({ maxWidth: 640 });

    return (
        <div
            className="w-full h-[420px] sm:h-[480px] rounded-2xl overflow-hidden border border-panel bg-panel"
            role="img"
            aria-label="3D wooden chess set"
        >
            <Canvas
                dpr={isSmall ? [1, 1.5] : [1, 2]}
                camera={{ position: [2.2, 2.0, 2.2], fov: 42, near: 0.1, far: 100 }}
            >
                {/* Match site background so it never looks like a white void */}
                <color attach="background" args={[BG]} />

                {/* Lights + environment */}
                <ambientLight intensity={0.6} />
                <directionalLight intensity={1.2} position={[3, 5, 2]} />
                <Environment preset="city" />

                {/* Soft ground shadow */}
                <ContactShadows
                    position={[0, -0.01, 0]}
                    opacity={0.25}
                    scale={10}
                    blur={2.5}
                    far={3}
                />

                {/* Debug grid helper */}
                {SHOW_GRID && <gridHelper args={[10, 10]} />}

                <Suspense fallback={null}>
                    {/* PHASE 1: force scale, no auto-fit (easiest to make it visible) */}
                    {!AUTO_FIT && (
                        <Center>
                            <group scale={SCALE_HINT}>
                                <Model />
                                <Hotspots />
                            </group>
                        </Center>
                    )}

                    {/* PHASE 2: once visible & roughly sized, enable AUTO_FIT = true */}
                    {AUTO_FIT && (
                        <Center>
                            <Bounds fit clip observe margin={1.2}>
                                <group scale={SCALE_HINT}>
                                    <Model />
                                    <Hotspots />
                                </group>
                            </Bounds>
                        </Center>
                    )}
                </Suspense>

                {/* Simple controls while tuning */}
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

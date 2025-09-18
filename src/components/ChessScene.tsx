"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, ContactShadows, Html } from "@react-three/drei";
import { Box3, Group, Object3D, Vector3 } from "three";
import { useMediaQuery } from "react-responsive";
import { goTo } from "@/utils/scroll";

// ----------------------
// Config
// ----------------------
const MODEL_PATH = "/models/wooden-chess.glb"; // change if your path differs
const BG = "#121317";
const SHOW_GRID = false; // set true while tuning
const ROTATE_Y = Math.PI * 0.12; // mild yaw so it's not dead-front
const TARGET_SIZE = 2.6; // target longest edge in world units (board+pieces group)
const TARGET_Y = 0;      // sit base on y=0

// ----------------------
// Utilities (no wrappers)
// ----------------------
function normalizeToScene(root: Object3D, targetLongestEdge = TARGET_SIZE, targetY = TARGET_Y) {
    // 1) center at origin
    const b = new Box3().setFromObject(root);
    const size = new Vector3();
    const center = new Vector3();
    b.getSize(size);
    b.getCenter(center);
    root.position.sub(center);

    // 2) uniform scale so the longest edge == targetLongestEdge
    const longest = Math.max(size.x, size.y, size.z) || 1;
    const scale = targetLongestEdge / longest;
    root.scale.setScalar(scale);

    // 3) drop base to targetY
    const after = new Box3().setFromObject(root);
    root.position.y += (targetY - after.min.y);

    // 4) gentle yaw so it reads better
    root.rotation.y = ROTATE_Y;
}

function useNormalizedModel(path: string) {
    const { scene } = useGLTF(path);
    // produce a stable, normalized clone (no <Center/>)
    return useMemo(() => {
        const cloned = (scene as Group).clone(true);
        normalizeToScene(cloned);
        return cloned;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scene]);
}
useGLTF.preload(MODEL_PATH);

// ----------------------
// Hotspots (unchanged API)
// ----------------------
function Hotspots() {
    const pts = [
        { pos: [0.35, 0.18, 0.15], label: "♛ Projects", to: "projects" },
        { pos: [0.45, 0.18, -0.10], label: "♜ Skills",   to: "skills" },
        { pos: [0.10, 0.18, 0.05],  label: "♚ About",    to: "about" },
        { pos: [-0.15, 0.18, 0.10], label: "♝ Education",to: "education" },
        { pos: [0.10, 0.18, -0.25], label: "♟ Contact",  to: "contact" },
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

// ----------------------
// Scene (no <Center/> / <Bounds/>)
// ----------------------
export default function ChessScene() {
    const isSmall = useMediaQuery({ maxWidth: 640 });
    const model = useNormalizedModel(MODEL_PATH);

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
                <color attach="background" args={[BG]} />

                <ambientLight intensity={0.6} />
                <directionalLight intensity={1.2} position={[3, 5, 2]} />
                <Environment preset="city" />

                <ContactShadows position={[0, -0.01, 0]} opacity={0.25} scale={10} blur={2.5} far={3} />

                {SHOW_GRID && <gridHelper args={[10, 10]} />}

                <Suspense fallback={null}>
                    <primitive object={model} />
                    <Hotspots />
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

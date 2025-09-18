"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Group } from "three";
import { useMediaQuery } from "react-responsive";

const BG = "#121317";
const SHOW_GRID = true;
const SHOW_AXES = true;
const SHOW_BBOX = true;

const TARGET_FOOTPRINT_XZ = 0.9;
const ROTATE_Y = Math.PI * 0.1;

// --- helpers ---
function normalize(root: THREE.Object3D, targetXZ = TARGET_FOOTPRINT_XZ) {
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    root.position.sub(center);

    const maxXZ = Math.max(size.x, size.z) || 1;
    const s = targetXZ / maxXZ;
    root.scale.setScalar(s);

    const after = new THREE.Box3().setFromObject(root);
    root.position.y -= after.min.y;
    root.position.y += 0.005;

    root.rotation.y = ROTATE_Y;
    root.traverse(o => (o.frustumCulled = false));
}

function forceBasicMaterial(root: THREE.Object3D) {
    const forced = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.6,
        side: THREE.DoubleSide,
        transparent: false,
        opacity: 1,
    });

    root.traverse(obj => {
        const m = obj as THREE.Mesh;
        if (!m.isMesh) return;
        // Replace ANY material(s) with our forced one (clone per mesh to avoid sharing side effects)
        const clone = forced.clone();
        if (Array.isArray(m.material)) {
            m.material = m.material.map(() => clone.clone());
        } else {
            m.material = clone;
        }
        m.castShadow = m.receiveShadow = true;
    });
}

function Model({ path }: { path: string }) {
    const { scene } = useGLTF(path);
    const groupRef = useRef<Group>(null);

    const model = useMemo(() => {
        const cloned = (scene as Group).clone(true);
        normalize(cloned);
        forceBasicMaterial(cloned); // <<–– key line
        return cloned;
    }, [scene]);

    useEffect(() => {
        // Log mesh count + box size for sanity
        let meshCount = 0;
        model.traverse(o => {
            if ((o as THREE.Mesh).isMesh) meshCount += 1;
        });
        const b = new THREE.Box3().setFromObject(model);
        const s = new THREE.Vector3(); b.getSize(s);
        // eslint-disable-next-line no-console
        console.log(`[PieceTest] ${path} meshes=${meshCount} size=`, s);

        if (!groupRef.current || !SHOW_BBOX) return;
        const helper = new THREE.Box3Helper(b, 0xffffff);
        groupRef.current.add(helper);
        return () => { helper.parent && helper.parent.remove(helper); };
    }, [model, path]);

    return (
        <group ref={groupRef}>
            {SHOW_AXES && <axesHelper args={[0.8]} />}
            <primitive object={model} />
        </group>
    );
}

// Preload
useGLTF.preload("/models/Queen_white.glb");
useGLTF.preload("/models/Rook_white.glb");
useGLTF.preload("/models/Bishop_white.glb");
useGLTF.preload("/models/Knight_white.glb");
useGLTF.preload("/models/Pawn_white.glb");

export default function PieceTestCanvas({ modelPath }: { modelPath: string }) {
    const isSmall = useMediaQuery({ maxWidth: 640 });

    return (
        <div className="w-full h-[260px] sm:h-[300px] rounded-2xl overflow-hidden border border-panel bg-panel">
            <Canvas
                dpr={isSmall ? [1, 1.5] : [1, 2]}
                camera={{ position: [0.9, 1.1, 1.3], fov: 38, near: 0.01, far: 100 }}
                shadows
            >
                <color attach="background" args={[BG]} />
                <ambientLight intensity={0.7} />
                <directionalLight position={[2.2, 3, 1.2]} intensity={1.2} castShadow />
                <Environment preset="studio" />
                <ContactShadows position={[0, -0.01, 0]} opacity={0.25} scale={6} blur={2.2} far={2.5} />
                {SHOW_GRID && <gridHelper args={[4, 8]} />}

                <Suspense fallback={null}>
                    <Model path={modelPath} />
                </Suspense>

                <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2.2} />
            </Canvas>
        </div>
    );
}

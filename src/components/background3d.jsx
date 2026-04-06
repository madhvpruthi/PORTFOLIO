import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const LIGHT_BLUE = new THREE.Color("#93c5fd");

function FlowingToriiSystem({ count = 5000, pointSize = 0.24, shapeState = "home" }) {
  const pointsRef = useRef();
  const { viewport } = useThree();


  const toriiTargets = useMemo(() => [

    { position: new THREE.Vector3(0, 8, -5), radius: 7.2, tube: 2, rotation: new THREE.Euler(0, 0, 0) }, // Top Center Outer
    { position: new THREE.Vector3(-8.5, -6, -2), radius: 7.0, tube: 1.8, rotation: new THREE.Euler(0, 0, 0) }, // Left Center Outer
    { position: new THREE.Vector3(8.5, -6, -2), radius: 7.0, tube: 1.8, rotation: new THREE.Euler(0, 0, 0) }, // Right Center Outer

    { position: new THREE.Vector3(0, 8, -5), radius: 5.1, tube: 0.8, rotation: new THREE.Euler(0, 0, 0) }, // Top Center Inner
    { position: new THREE.Vector3(-8.5, -6, -2), radius: 4.9 ,tube: 0.7, rotation: new THREE.Euler(0, 0, 0) }, // Left Center Inner
    { position: new THREE.Vector3(8.5, -6, -2), radius: 4.9 ,tube: 0.7, rotation: new THREE.Euler(0, 0, 0) } // Right Center Inner
  ], []);

  const { positions, colorArray, sizesArray, particleData } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sizeArray = new Float32Array(count);
    const pData = [];

    const getSquareTarget = (i) => {
      const rand = Math.random();
      let x, y;
      

      let depth = -3.5 + (Math.random() - 0.5) * 1.5;


      const jitter = (Math.random() - 0.5) * 0.12; 


      const getRoundedRectPoint = (w, h, r, keepHalf = "all") => {
        const straightW = Math.max(0, w - 2 * r);
        const straightH = Math.max(0, h - 2 * r);
        const cornerL = (Math.PI / 2) * r;
        const totalP = 2 * straightW + 2 * straightH + 4 * cornerL;
        
        let px, py;
        while (true) {
          let dist = Math.random() * totalP;


          if (dist < straightW) { px = (Math.random() - 0.5) * straightW; py = h / 2; }
          else {
            dist -= straightW;

            if (dist < straightW) { px = (Math.random() - 0.5) * straightW; py = -h / 2; }
            else {
              dist -= straightW;

              if (dist < straightH) { px = -w / 2; py = (Math.random() - 0.5) * straightH; }
              else {
                dist -= straightH;

                if (dist < straightH) { px = w / 2; py = (Math.random() - 0.5) * straightH; }
                else {
                  dist -= straightH;

                  const angle = Math.random() * Math.PI / 2;
                  const corner = Math.floor(Math.random() * 4);
                  
                  let cx, cy, actualAngle;
                  if (corner === 0) { cx = w / 2 - r; cy = h / 2 - r; actualAngle = angle; } // Top-Right
                  else if (corner === 1) { cx = -w / 2 + r; cy = h / 2 - r; actualAngle = angle + Math.PI / 2; } // Top-Left
                  else if (corner === 2) { cx = -w / 2 + r; cy = -h / 2 + r; actualAngle = angle + Math.PI; } // Bottom-Left
                  else { cx = w / 2 - r; cy = -h / 2 + r; actualAngle = angle + Math.PI * 1.5; } // Bottom-Right

                  px = cx + r * Math.cos(actualAngle);
                  py = cy + r * Math.sin(actualAngle);
                }
              }
            }
          }

          if (keepHalf === "left") {
            const rx = px * Math.SQRT1_2 - py * Math.SQRT1_2;
            if (rx <= 0) break;
          } else if (keepHalf === "right") {
            const rx = px * Math.SQRT1_2 - py * Math.SQRT1_2;
            if (rx >= 0) break;
          } else {
            break;
          }
        }
        return { x: px, y: py };
      };

      if (rand < 0.35) {
        
        const pt = getRoundedRectPoint(45, 25, 5);
        x = pt.x + jitter;
        y = pt.y + jitter;
        depth = -8; 
      } 
      else if (rand < 0.65) {
        
        const pt = getRoundedRectPoint(34, 18, 4.8);
        x = pt.x + jitter;
        y = pt.y + jitter;
        depth = -4; 
      } 
      else {
        
        const isLeft = Math.random() > 0.5;
        const isInnerCube = Math.random() > 0.6; 
        
        const size = 9;
        const r = 3;  
        
        const innerSize = 5.9;
        const innerR = 1.4; 
        const pt = isInnerCube 
          ? getRoundedRectPoint(innerSize, innerSize, innerR, isLeft ? "left" : "right")
          : getRoundedRectPoint(size, size, r, isLeft ? "left" : "right");
        

        const angle = Math.PI / 4;
        const cos45 = Math.cos(angle);
        const sin45 = Math.sin(angle);
        let rx = pt.x * cos45 - pt.y * sin45;
        let ry = pt.x * sin45 + pt.y * cos45;


        const sideGap = isLeft ? -3.5 : 3.5;
        
        x = rx + sideGap + jitter;
        y = ry + jitter;
        depth = -2; 
      }
      
      return new THREE.Vector3(x, y, depth);
    };

    const getHelixTarget = (i, count) => {
      const isStrand1 = Math.random() > 0.5;
      const strandOffset = isStrand1 ? 0 : Math.PI;


      const isRail1 = Math.random() > 0.5;
      

      const yOffset = isRail1 ? 0.8 : -0.8;
      const rOffset = isRail1 ? 0.3 : -0.3;

      const t = Math.random(); 
      const y = (t - 0.5) * 45 + yOffset; 
      
      const twists = 2.5;
      const angle = t * Math.PI * 2 * twists + strandOffset;
      
      let radius = 7 + rOffset;
      
      const x = Math.cos(angle) * Math.max(0.1, radius);
      const z = Math.sin(angle) * Math.max(0.1, radius) - 4; 
    
      const thickness = 0.15;
      const jitterX = (Math.random() - 0.5) * thickness;
      const jitterY = (Math.random() - 0.5) * thickness;
      const jitterZ = (Math.random() - 0.5) * thickness;
      
      return new THREE.Vector3(x + jitterX, y + jitterY, z + jitterZ);
    };

    const getHexTarget = (i) => {
      const isOuter = Math.random() > 0.5;
      const size = isOuter ? 14 : 9.5;
      
      const side = Math.floor(Math.random() * 6);
      const t = Math.random();
      
      const angle1 = (side * Math.PI) / 3;
      const angle2 = ((side + 1) * Math.PI) / 3;
      
      const px1 = Math.cos(angle1) * size;
      const py1 = Math.sin(angle1) * size;
      const px2 = Math.cos(angle2) * size;
      const py2 = Math.sin(angle2) * size;
      
      let x = px1 + t * (px2 - px1);
      let y = py1 + t * (py2 - py1);
      
      const isRail2 = Math.random() > 0.5;
      const railOffset = isRail2 ? 0.5 : -0.5;
      
      const nx = -(py2 - py1);
      const ny = (px2 - px1);
      const len = Math.sqrt(nx*nx + ny*ny);
      
      x += (nx / len) * railOffset;
      y += (ny / len) * railOffset;
      
      let depth = -3.5;
      const jitter = (Math.random() - 0.5) * 0.15;
      
      return new THREE.Vector3(x + jitter, y + jitter, depth + jitter);
    };

    for (let i = 0; i < count; i++) {
      // --- Calculating the big rings from the home page ---
      const targetIndex = Math.random() < 0.7 
        ? Math.floor(Math.random() * 3) 
        : Math.floor(Math.random() * 3) + 3;
      const targetRing = toriiTargets[targetIndex];

      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;

      const scatterRadius = Math.pow(Math.random(), 1.5) * targetRing.tube;
      const currentRadius = targetRing.radius + scatterRadius * Math.cos(v);

      const stray = Math.random() > 0.95 ? (Math.random() - 0.5) * 6 : 0;

      const localTarget = new THREE.Vector3(
        Math.cos(u) * currentRadius + Math.cos(u) * stray,
        Math.sin(u) * currentRadius + Math.sin(u) * stray,
        scatterRadius * Math.sin(v) + stray
      );

      localTarget.applyEuler(targetRing.rotation);
      localTarget.add(targetRing.position);

      const isLeft = Math.random() > 0.5;
      const startX = (isLeft ? -1 : 1) * (20 + Math.random() * 15);
      const startY = (Math.random() - 0.5) * 30;
      const startZ = (Math.random() - 0.5) * 20;

      let currentPos;
      let isMerged = Math.random() < 0.95;
      let isGathering = !isMerged;

      if (isMerged) {
        currentPos = localTarget.clone();
      } else {
        currentPos = new THREE.Vector3(startX, startY, startZ);
      }

      pos[i * 3] = currentPos.x;
      pos[i * 3 + 1] = currentPos.y;
      pos[i * 3 + 2] = currentPos.z;

      col[i * 3] = LIGHT_BLUE.r;
      col[i * 3 + 1] = LIGHT_BLUE.g;
      col[i * 3 + 2] = LIGHT_BLUE.b;

      sizeArray[i] = 0.3 + Math.pow(Math.random(), 3) * 2.5;

      const squareTarget = getSquareTarget(i);
      const projectsTarget = getHelixTarget(i, count);
      const certsTarget = getHexTarget(i);

      // can slow down morphing and merging speeds
      const morphSpeed = 0.006 + Math.random() * 0.01; 

      pData.push({
        homeTarget: localTarget,
        skillsTarget: squareTarget,
        projectsTarget: projectsTarget,
        certsTarget: certsTarget,
        source: new THREE.Vector3(startX, startY, startZ),
        mergeSpeed: 0.002 + Math.random() * 0.005,
        orbitSpeed: 0.001 + Math.random() * 0.004, 
        morphSpeed: morphSpeed,
        isMerged: isMerged,
        isGathering: isGathering,
        gatherWaitTime: Math.random() * 4.0,
        u: u,
        v: v,
        scatterRadius: scatterRadius,
        stray: stray,
        targetIndex: targetIndex,
        currentRadius: currentRadius,
      });
    }
    return { positions: pos, colorArray: col, sizesArray: sizeArray, particleData: pData };
  }, [count, toriiTargets]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const posAttribute = pointsRef.current.geometry.attributes.position;
    const array = posAttribute.array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      let p = particleData[i];

      let ix = i * 3;
      let iy = i * 3 + 1;
      let iz = i * 3 + 2;

      let curX = array[ix];
      let curY = array[iy];
      let curZ = array[iz];

      let baseTargetX, baseTargetY, baseTargetZ;

      if (shapeState === "home") {
        const ring = toriiTargets[p.targetIndex];

        if (!p.isMerged) {
          if (p.isGathering) {
            p.gatherWaitTime -= delta;
            array[iy] += Math.sin(time + p.u) * 0.01;
            array[ix] += Math.cos(time + p.v) * 0.01;

            if (p.gatherWaitTime <= 0) p.isGathering = false;
          } else {
            let dx = p.homeTarget.x - curX;
            let dy = p.homeTarget.y - curY;
            let dz = p.homeTarget.z - curZ;

            let distSq = dx * dx + dy * dy + dz * dz;
            let distanceCurve = Math.max(0.1, 1 - Math.sqrt(distSq) / 30);

            array[ix] += dx * p.mergeSpeed * (1 + distanceCurve * 2);
            array[iy] += dy * p.mergeSpeed * (1 + distanceCurve * 2);
            array[iz] += dz * p.mergeSpeed * (1 + distanceCurve * 2);

            if (distSq < 1.0) p.isMerged = true;
          }
        } else {
          p.u += p.orbitSpeed * delta * 15;

          const localTarget = new THREE.Vector3(
            Math.cos(p.u) * p.currentRadius + Math.cos(p.u) * p.stray,
            Math.sin(p.u) * p.currentRadius + Math.sin(p.u) * p.stray,
            p.scatterRadius * Math.sin(p.v) + p.stray
          );

          let wobbleRot = ring.rotation.clone();
          wobbleRot.x += Math.sin(time * 0.3 + p.targetIndex) * 0.03;
          wobbleRot.y += Math.cos(time * 0.3 + p.targetIndex) * 0.03;

          localTarget.applyEuler(wobbleRot);
          localTarget.add(ring.position);
          
          p.homeTarget = localTarget.clone();
          baseTargetX = localTarget.x;
          baseTargetY = localTarget.y;
          baseTargetZ = localTarget.z;

          if (Math.random() < 0.0001) { 
            p.isMerged = false;
            p.isGathering = true;
            p.gatherWaitTime = Math.random() * 3.0;

            const isLeft = Math.random() > 0.5;
            const startX = (isLeft ? -1 : 1) * (20 + Math.random() * 10);
            const startY = (Math.random() - 0.5) * 30;
            const startZ = (Math.random() - 0.5) * 20;

            array[ix] = startX;
            array[iy] = startY;
            array[iz] = startZ;
            p.homeTarget = localTarget;
          }
        }
      } else if (shapeState === "skills") {
        let t = p.skillsTarget;
        
        let orbitX = Math.cos(p.u) * p.scatterRadius;
        let orbitY = Math.sin(p.u) * p.scatterRadius;
        let orbitZ = Math.sin(p.v) * p.scatterRadius;
        
        const localTarget = new THREE.Vector3(t.x + orbitX, t.y + orbitY, t.z + orbitZ);

        if (!p.isMerged) {
          if (p.isGathering) {
            p.gatherWaitTime -= delta;
            array[iy] += Math.sin(time * 0.8 + p.u) * 0.02;
            array[ix] += Math.cos(time * 0.8 + p.v) * 0.02;

            if (p.gatherWaitTime <= 0) p.isGathering = false;
          } else {
            let dx = localTarget.x - curX;
            let dy = localTarget.y - curY;
            let dz = localTarget.z - curZ;

            let distSq = dx * dx + dy * dy + dz * dz;
            let distanceCurve = Math.max(0.1, 1 - Math.sqrt(distSq) / 30);

            array[ix] += dx * p.morphSpeed * (1 + distanceCurve);
            array[iy] += dy * p.morphSpeed * (1 + distanceCurve);
            array[iz] += dz * p.morphSpeed * (1 + distanceCurve);

            if (distSq < 1.0) p.isMerged = true;
          }
        } else {
          p.u += p.orbitSpeed * delta * 5;
          baseTargetX = localTarget.x + Math.cos(p.u) * p.stray;
          baseTargetY = localTarget.y + Math.sin(p.u) * p.stray;
          baseTargetZ = localTarget.z + p.stray;

          if (Math.random() < 0.0001) { 
            p.isMerged = false;
            p.isGathering = true;
            p.gatherWaitTime = Math.random() * 2.0;

            const isLeft = Math.random() > 0.5;
            const startX = (isLeft ? -1 : 1) * (20 + Math.random() * 10);
            const startY = (Math.random() - 0.5) * 30;
            const startZ = (Math.random() - 0.5) * 20;

            array[ix] = startX;
            array[iy] = startY;
            array[iz] = startZ;
          }
        }
      } else if (shapeState === "projects") {
        let t = p.projectsTarget;
        let angle = time * 0.4;
        let cosA = Math.cos(angle);
        let sinA = Math.sin(angle);
        let localX = t.x * cosA - (t.z + 4) * sinA;
        let localZ = t.x * sinA + (t.z + 4) * cosA - 4;
        let localY = t.y + Math.sin(time * 2 + t.y * 0.5) * 0.5;
        const localTarget = new THREE.Vector3(localX, localY, localZ);
        if (!p.isMerged) {
          if (p.isGathering) {
            p.gatherWaitTime -= delta;
            array[iy] += Math.sin(time * 0.8 + p.u) * 0.02;
            array[ix] += Math.cos(time * 0.8 + p.v) * 0.02;
            if (p.gatherWaitTime <= 0) p.isGathering = false;
          } else {
            let dx = localTarget.x - curX;
            let dy = localTarget.y - curY;
            let dz = localTarget.z - curZ;
            let distSq = dx * dx + dy * dy + dz * dz;
            let distanceCurve = Math.max(0.1, 1 - Math.sqrt(distSq) / 30);
            array[ix] += dx * p.morphSpeed * (1 + distanceCurve);
            array[iy] += dy * p.morphSpeed * (1 + distanceCurve);
            array[iz] += dz * p.morphSpeed * (1 + distanceCurve);
            if (distSq < 1.0) p.isMerged = true;
          }
        } else {
          p.u += p.orbitSpeed * delta * 5;
          baseTargetX = localTarget.x + Math.cos(p.u) * p.stray * 0.3;
          baseTargetY = localTarget.y + Math.sin(p.u) * p.stray * 0.3;
          baseTargetZ = localTarget.z + p.stray * 0.3;
          if (Math.random() < 0.0001) {
            p.isMerged = false;
            p.isGathering = true;
            p.gatherWaitTime = Math.random() * 2.0;
            const isLeft = Math.random() > 0.5;
            array[ix] = (isLeft ? -1 : 1) * (20 + Math.random() * 10);
            array[iy] = (Math.random() - 0.5) * 30;
            array[iz] = (Math.random() - 0.5) * 20;
          }
        }
      } else if (shapeState === "certificates") {
        let t = p.certsTarget;
        
        let orbitX = Math.cos(p.u) * p.scatterRadius * 0.5;
        let orbitY = Math.sin(p.u) * p.scatterRadius * 0.5;
        let orbitZ = Math.sin(p.v) * p.scatterRadius * 0.5;
        
        // Spin the hexagon slowly
        let angle = time * 0.2;
        let cosA = Math.cos(angle);
        let sinA = Math.sin(angle);
        let localX = t.x * cosA - t.y * sinA;
        let localY = t.x * sinA + t.y * cosA;
        let localZ = t.z;
        
        const localTarget = new THREE.Vector3(localX + orbitX, localY + orbitY, localZ + orbitZ);

        if (!p.isMerged) {
          if (p.isGathering) {
            p.gatherWaitTime -= delta;
            array[iy] += Math.sin(time * 0.8 + p.u) * 0.02;
            array[ix] += Math.cos(time * 0.8 + p.v) * 0.02;

            if (p.gatherWaitTime <= 0) p.isGathering = false;
          } else {
            let dx = localTarget.x - curX;
            let dy = localTarget.y - curY;
            let dz = localTarget.z - curZ;

            let distSq = dx * dx + dy * dy + dz * dz;
            let distanceCurve = Math.max(0.1, 1 - Math.sqrt(distSq) / 30);

            array[ix] += dx * p.morphSpeed * (1 + distanceCurve);
            array[iy] += dy * p.morphSpeed * (1 + distanceCurve);
            array[iz] += dz * p.morphSpeed * (1 + distanceCurve);

            if (distSq < 1.0) p.isMerged = true;
          }
        } else {
          p.u += p.orbitSpeed * delta * 5;
          baseTargetX = localTarget.x + Math.cos(p.u) * p.stray;
          baseTargetY = localTarget.y + Math.sin(p.u) * p.stray;
          baseTargetZ = localTarget.z + p.stray;

          if (Math.random() < 0.0001) { 
            p.isMerged = false;
            p.isGathering = true;
            p.gatherWaitTime = Math.random() * 2.0;

            const isLeft = Math.random() > 0.5;
            array[ix] = (isLeft ? -1 : 1) * (20 + Math.random() * 10);
            array[iy] = (Math.random() - 0.5) * 30;
            array[iz] = (Math.random() - 0.5) * 20;
          }
        }
      }

      if (baseTargetX !== undefined) {
        array[ix] += (baseTargetX - curX) * (shapeState === "home" ? 0.03 : p.morphSpeed);
        array[iy] += (baseTargetY - curY) * (shapeState === "home" ? 0.03 : p.morphSpeed);
        array[iz] += (baseTargetZ - curZ) * (shapeState === "home" ? 0.03 : p.morphSpeed);
      }
    }

    posAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colorArray} itemSize={3} />
        <bufferAttribute attach="attributes-pSize" count={count} array={sizesArray} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={pointSize}
        vertexColors={true}
        sizeAttenuation={true}
        transparent={true}
        opacity={1.0}
        depthWrite={false}
        onBeforeCompile={(shader) => {
          shader.vertexShader = shader.vertexShader
            .replace(
              'void main() {',
              'attribute float pSize;\nvoid main() {'
            )
            .replace(
              '#include <fog_vertex>',
              '#include <fog_vertex>\n  gl_PointSize *= pSize;'
            );

          shader.fragmentShader = shader.fragmentShader.replace(
            '#include <clipping_planes_fragment>',
            '#include <clipping_planes_fragment>\n  if (distance(gl_PointCoord, vec2(0.5)) > 0.5) discard;'
          );
        }}
      />
    </points>
  );
}

export default function Background3D({ shapeState }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: -10, pointerEvents: "none", overflow: "hidden" }}>
      <Canvas camera={{ position: [0, 0, 18], fov: 60 }}>
        <FlowingToriiSystem count={25000} pointSize={0.09} shapeState={shapeState} />
      </Canvas>
    </div>
  );
}
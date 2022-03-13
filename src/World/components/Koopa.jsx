import React, { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useState } from "react";

export default function Koopa(props) {
  const group = useRef();
  const { viewport } = useThree();
  const { nodes, materials } = useGLTF("http://127.0.0.1:8080/models/koopa_troopa.glb");
  const [click, isClicking] = useState(false);

  useFrame(({ mouse, camera }) => {
      const x = mouse.x*viewport.width/2;
      const y = mouse.y*(viewport.height)/2;
    
    if(click){
       group.current.position.set(x, y, 0);
    }
   
  });
  return (
        <group ref={group} {...props} dispose={null} 
                                      onPointerDown={() => isClicking(true)} 
                                      onPointerUp={() => isClicking(false)}>
        <group
            position={[0.03, 0.71, 0.02]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.13}
        >
            <primitive object={nodes.Skl_Root_1} />
            <skinnedMesh
            geometry={nodes.Body__m_Eye.geometry}
            material={materials["Material.003"]}
            skeleton={nodes.Body__m_Eye.skeleton}
            />
            <skinnedMesh
            geometry={nodes.Body__m_Body.geometry}
            material={materials["Material.004"]}
            skeleton={nodes.Body__m_Body.skeleton}
            />
        </group>
        </group>    
  );
}

useGLTF.preload("/koopa_troopa.glb");
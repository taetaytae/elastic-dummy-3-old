import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { meshBounds } from "@react-three/drei";
import { useStore } from '../../pages/Home';


function Cube(props) {

    const group = useRef();
    const { viewport } = useThree();
    const [click, isClicking] = useState(false);
    const { setCoordinates } = useStore();

    useFrame(({ mouse }) => {
        const x = mouse.x*viewport.width/2;
        const y = mouse.y*(viewport.height)/2;

        
    
        if(click){
            setCoordinates(x, y);
            group.current.position.set(x, y, 0);
        }

    });

    return(
        <group ref={group} position={props.position}>
            <mesh onPointerUp={() => isClicking(false)} onPointerDown={() => isClicking(true)} raycast={meshBounds}>
            <sphereBufferGeometry args={[0.8, 30, 30]}/>
            <meshStandardMaterial color='violet'/>
            </mesh>
        </group>
    );
}

Cube.defaultProps = {
    material: <meshStandardMaterial color='orchid'/>,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
};

export default Cube;
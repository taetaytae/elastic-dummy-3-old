import { useRef } from 'react';
import { extend, 
         useFrame, 
        //  useThree,
} from '@react-three/fiber';

import Cube from './Cube.jsx';
import Lights from './Lights';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { degToRad } from 'three/src/math/MathUtils';
import Effects from './Effects';
import Main from './Main';
import Particles from './Particles';

// make OrbitControls available as a jsx element
extend({ OrbitControls });

// const CameraControls = () => {
//     const {
//         camera,
//         gl: {domElement},
//     } = useThree();
//     const controls = useRef();
//     useFrame((state) => controls.current.update());

//     return <orbitControls ref={controls} 
//                           args={[camera, domElement]} 
//                           enableDamping={true}
//                           enableZoom={true}
//                           maxPolarAngle={Math.PI/3}
//                           minPolarAngle={Math.PI/3}/>
// };

function Scene() {

    const mouse = useRef([0, 0]);

    useFrame(({ clock }, delta) => {

    });

    return(
        <>
            {/* <CameraControls/> */}
            <mesh position={[0,0,0]} scale={10} rotation={[degToRad(-90),0,0]}>
                <planeBufferGeometry width={10} height={10}/>
                <meshNormalMaterial/>
            </mesh>
            {/* <gridHelper args={[10, 10, 'black', 'black']}/> */}

            {/* Lights examples */}
            {/* <ambientLight intensity={0.5} /> */}
            {/* <directionalLight color="red" position={[0, 0, 5]} /> */}
           

            <Effects>
                {/* <color attach='background' args={['black']}/> */}
                <Cube position={[0,0,0]}/>
                {/* <Cube position={[4,0,0]}/>
                <Cube position={[-4,0,0]}/> */}
                <ambientLight/>
                {/* <Koopa position={[0,-3,0]}/> */}
            </Effects>
            <Main>
                <Particles count={10000} mouse={mouse}/>
                
                <Lights position={[5,0,0]}/>
                {/* <Cube position={[4,0,0]}/> */}
                {/* <Cube position={[-4,0,0]}/> */}
            </Main>

            
                
            
            
        </>
    );

}

export default Scene;
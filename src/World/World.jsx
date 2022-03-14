import React from 'react';
import '../css/World.css';
import {
    Canvas,
} from '@react-three/fiber';

import Scene from './components/Scene.jsx';
import { Suspense } from 'react';

class World extends React.Component {
    render(){
        return(
            <div id='scene-container'>
                <Canvas camera={{fov:35, aspect:1, near:0.1, far: 200, position:[0,0,10], zoom:1}} dpr={[1, 2]}>
                    <Suspense fallback={null}>
                        <Scene/>
                    </Suspense>
                </Canvas>
            </div>
        );
    }
}

export default World;
import React from 'react';
import { useRef } from 'react';

function Lights(props) {
        const lights = useRef();

        return(
            <>
            <directionalLight ref={lights} color='white' position={props.position}/>
            <ambientLight/>
            <pointLight/>
            </>
        );
}

export default Lights;
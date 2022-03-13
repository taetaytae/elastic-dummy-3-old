import React from "react";
import * as Tone from 'tone';
import Button from '@mui/material/Button';
import { Slider,
         Typography } from "@mui/material";
import '../../css/AudioButton.css';
import { useState } from "react";
import { useStore } from "../../pages/Home";

export function UpdatePosition(props){

    const { x, y } = useStore();
    Tone.Listener.positionX.value = -x;
    Tone.Listener.positionY.value = y;
    return(<></>)

}

function AudioButton(props){

    let pan = new Tone.Panner3D({
        panningModel:'HRTF',
        distanceModel: 'exponential',
        positionX: 0,
        positionY: 0,
        positionZ: 0,
    }).toDestination();
    let audioFile = (new Tone.Player('http://127.0.0.1:8080/audio/toneTest.wav').connect(pan));

    // let now = Tone.now();

    // console.log(audioFile.loaded);
    const [audioCtxReady, setAudioCtx] = useState(false);

    const audioCtxState = audioCtxReady;
    let button;

    const samplePlay = () => {
        audioFile.loaded===true ? 
            (audioFile.state === 'stopped' ? audioFile.start() : audioFile.stop())
            : console.log('File not Loaded');
    }

    const handleAudioCtx = () => {
        setAudioCtx(true);
    }

    const handleChangeX = (event, newValue) => {
        if(typeof newValue === 'number'){
            Tone.Listener.positionX.value = -newValue;
        }
    }

    const handleChangeZ = (event, newValue) => {
        if(typeof newValue === 'number'){
            Tone.Listener.positionZ.value = newValue;
        }
    }

    const handleChangeY = (event, newValue) => {
        if(typeof newValue === 'number'){
            Tone.Listener.positionY.value = newValue;
        }
    }

    if(!audioCtxState){
        button =  <Button variant='outlined' onClick={async () => {
                        await Tone.start();
                        console.log('audio is ready')
                        handleAudioCtx();
                    }}>Tone Start</Button>;
        
    } else {
        button = <Button variant='outlined' onClick={samplePlay}>Sound</Button>;
    }

    return(
        <div className="audioUI">
            {button}
            <div className="sliderPanel">
                {/* <Typography id='x-slider'>X-axis</Typography>
                <Slider aria-label="x-panning" max={2} min={-2} defaultValue={0} step={0.01} onChange={handleChangeX}/>
                <Typography id='z-slider'>Z   --    Y</Typography>
                <div className="zslider">
                <Slider aria-label="z-panning"sx={{
                                                '& input[type="range"]': {
                                                    WebkitAppearance: 'slider-vertical',
                                                },
                                                 }}
                                                orientation="vertical" max={8} min={0} defaultValue={0} step={0.01} onChange={handleChangeZ}/>
                <Slider aria-label="y-panning"sx={{
                                                '& input[type="range"]': {
                                                    WebkitAppearance: 'slider-vertical',
                                                },
                                                 }}
                                                orientation="vertical" max={4} min={-4} defaultValue={0} step={0.01} onChange={handleChangeY}/>
                </div>
                <Typography id='rotation-slider' style={{'marginTop': '20px'}}>Rotation</Typography>
                <Slider aria-label="rotation" max={6.28} min={0} defaultValue={0} step={0.01}/> */}
            </div>
            
        </div>
    );
}

export default AudioButton;
import React from "react";
import * as Tone from 'tone';
import Button from '@mui/material/Button';
import { Slider,
         Typography } from "@mui/material";
import '../../css/AudioButton.css';

class AudioButtonClass extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            audioCtxReady: false,
        }

        this.pan = new Tone.Panner3D({
            panningModel:'HRTF',
            distanceModel: 'exponential',
            positionX: 0,
            positionY: 0,
            positionZ: 0,
        }).toDestination();
        this.audioFile = new Tone.Player('http://127.0.0.1:8080/audio/toneTest.wav').connect(this.pan);
        this.now = Tone.now();

        console.log(this.audioFile.loaded);

        this.handleAudioCtx = this.handleAudioCtx.bind(this);
        this.samplePlay = this.samplePlay.bind(this);
    }

    samplePlay(){
        this.audioFile.loaded===true ? 
            (this.audioFile.state === 'stopped' ? this.audioFile.start() : this.audioFile.stop())
            : console.log('File not Loaded');
    }

    handleAudioCtx(){
        this.setState({audioCtxReady: true});
        console.log(this.audioFile.loaded);
    }

    render(){
        const audioCtxState = this.state.audioCtxReady;
        let button;

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
                            this.handleAudioCtx();
                        }}>Tone Start</Button>;
            
        } else {
            button = <Button variant='outlined' onClick={this.samplePlay}>Sound</Button>;
        }
        
        return(
        <div className="audioUI">
            {button}
            <div className="sliderPanel">
                <Typography id='x-slider'>X-axis</Typography>
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
                <Slider aria-label="rotation" max={6.28} min={0} defaultValue={0} step={0.01}/>
            </div>
            
        </div>
        );
    };
}

export default AudioButtonClass;
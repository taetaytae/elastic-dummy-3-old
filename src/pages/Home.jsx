import React from 'react';
import AudioButton from '../World/components/AudioButton';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../css/Home.css';

import World from '../World/World.jsx';
import SphereContext from '../World/components/SphereContext';
import create from 'zustand';
import { UpdatePosition } from '../World/components/AudioButton';

export const useStore = create((set) => ({
    x: 0,
    y: 0,
    setCoordinates: (x, y) => set((state) => ({x: x, y: y})),
}));


class Home extends React.Component {
    constructor(props){
        super(props);
       
        this.state = {
            renderCanvas: false,
            x: 0,
            y: 0,
        }

        this.toggleCanvasRender = this.toggleCanvasRender.bind(this);
        this.setCoordinates = this.setCoordinates.bind(this);

    }

    toggleCanvasRender(){
        this.setState({renderCanvas: !this.state.renderCanvas})
        console.log('render state: ', this.state.renderCanvas);
    }

    setCoordinates(x, y){
        this.setState({x: x, y: y});
    }

    render(){
        let renderState = this.state.renderCanvas;
        let world;

        const theme = createTheme({
            palette: {
                mode: 'dark',
            },
        });

        const coordinates = {
            x: this.state.x,
            y: this.state.y,
            setCoordinates: () => this.setCoordinates(),
        }
        
        // let renderButton = <Button variant='outlined' onClick={this.toggleCanvasRender}>Render</Button>
        let renderSwitch = <Switch onChange={this.toggleCanvasRender}/>

        if(!renderState){
            world = <></>;
        } else {
            world = <World/>
        }
        
        return(
        <ThemeProvider theme={theme}>
        <div className='homePage' style={{'gridTemplateRows': 'auto',
                                            'display': 'grid'}}>
            <h1>Spatial HRTF Panner (WIP)</h1>
            <SphereContext.Provider value={coordinates}>
                <div className='button'>
                    <AudioButton/>
                    <UpdatePosition/>
                    <div className='divider' style={{'width': '5px', 'height': 'auto', 'display':'inlineBlock'}}/>
                    <FormControlLabel control={renderSwitch} label='Render'/>
                </div> 
                <div className='worldContainer'>
                    {world}
                </div>
            </SphereContext.Provider>
        </div>
        </ThemeProvider>
        );
        
    }
}

export default Home;
import React from 'react';
import styled from 'styled-components';
import NavBar from './components/NavBar';
import SliderComponent from './components/Slider';
import { dummy } from './vars';

const Body = styled.div`
    margin-top: 50px;
`;

function App() {
    return (
        <div className="App">
            <NavBar />
            <Body>
                <SliderComponent header="Today Release" data={dummy} />
                <SliderComponent header="Best Movies" data={dummy} />
            </Body>
        </div>
    );
}

export default App;

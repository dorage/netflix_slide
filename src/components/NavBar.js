import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 50px;
    padding: 10px 20px;
    font-size: 30px;
`;

const NavBar = () => (
    <Container>
        <div className="logo">Netflix Slider</div>
    </Container>
);

export default NavBar;

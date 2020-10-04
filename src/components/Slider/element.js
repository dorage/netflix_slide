import React from 'react';
import styled from 'styled-components';
import { palette } from '../../vars';

const Element = styled.div`
    width: 100%;
    height: 170px;
    margin: 0px 2px;

    background-image: url(${(props) => (props.src ? props.src : '')});
    background-position: center;
    background-size: cover;
    border-radius: 5px;
    &.empty {
        background-color: ${palette.slider.emptyBoxBackground};
        cursor: initial;
    }

    cursor: pointer;
`;

const SliderElement = ({ data }) => {
    return data ? (
        <Element src={data}></Element>
    ) : (
        <Element className={'empty'}></Element>
    );
};

export default SliderElement;

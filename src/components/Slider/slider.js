import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { dummy } from '../../vars';
import Element from './element';

const openAnimation = keyframes`
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0%);
    }
`;
const closeAnimation = keyframes`
    from {
        transform: translateX(0%);
    }
    to {
        transform: translateX(-100%);
    }
`;

const Container = styled.div`
    color: white;
`;
const Header = styled.div`
    font-size: 28px;
    font-weight: 600;
    padding: 0 70px;
`;
const SlideContainer = styled.div`
    display: flex;
    margin: 30px 0px;
    height: 170px;

    &:hover > .prev,
    &:hover > .next {
        opacity: 1;
    }
`;
const SliderElementContainer = styled.div`
    position: absolute;
    width: calc(100% - 140px);
    left: 70px;
    display: flex;
    &.open {
        animation: ${openAnimation} linear 500ms;
    }
    &.close {
        animation: ${closeAnimation} linear 500ms;
    }
    &.openR {
        animation: ${closeAnimation} linear 500ms;
        animation-direction: reverse;
    }
    &.closeR {
        animation: ${openAnimation} linear 500ms;
        animation-direction: reverse;
    }
`;
const SlideButton = styled.div`
    position: absolute;
    &.next {
        right: 0;
        border-radius: 5px 0px 0px 5px;
    }
    &.prev {
        left: 0;
        border-radius: 0px 5px 5px 0px;
    }

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: inherit;

    opacity: 0;
    background-color: transparent;
    transition: 500ms;
    z-index: 50;
    cursor: pointer;
    :hover {
        background-color: rgba(0, 0, 0, 0.4);
    }
`;

/// ref를 이용해 className 을 추가합니다.
const addClassName = function (ref, newClass) {
    ref.current.className = `${ref.current.className} ${newClass}`;
};
/// ref를 이용해 className 을 삭제합니다.
const deleteClassName = function (ref, targetClass) {
    const className = ref.current.className;
    ref.current.className = className.replace(` ${targetClass}`, '');
};

const Slider = ({ header, data }) => {
    const [page, setPage] = useState(0);
    const numOfElements = Math.floor((window.innerWidth - 140) / 290);
    const slider = (sliderRef, className, page) => (
        <SliderElementContainer ref={sliderRef} className={className}>
            {Array(numOfElements)
                .fill(0)
                .map((e, i) => (
                    <Element
                        key={`_${i}`}
                        data={dummy[numOfElements * page + i]}
                    />
                ))}
        </SliderElementContainer>
    );
    var currSliderRef = useRef();
    var newSliderRef = useRef();
    const [isAnimating, setIsAnimating] = useState(false);
    const [prevSlide, setPrevSlider] = useState(null);
    const [currSlide, setCurrSlider] = useState(
        slider(currSliderRef, 'current', page),
    );
    const [nextSlide, setNextSlider] = useState(null);

    const onNext = (event) => {
        if (isAnimating) return;
        event.preventDefault();
        setIsAnimating(true);
        // pagination
        const newPage =
            page < Math.floor(data.length / numOfElements) ? page + 1 : 0;
        setPage(newPage);
        // 애니메이션 엔드는 한곳에서만 추가
        currSliderRef.current.addEventListener('animationend', () => {
            // newSlider className 변경
            addClassName(newSliderRef, 'current');
            deleteClassName(newSliderRef, 'open');
            // element 교체
            setCurrSlider(null);
            setNextSlider(null);
            setCurrSlider(slider(currSliderRef, 'current', newPage));
            setIsAnimating(false);
        });
        // currSlider className 변경
        deleteClassName(currSliderRef, 'current');
        addClassName(currSliderRef, 'close');
        // newSlider 생성
        setNextSlider(slider(newSliderRef, 'open', newPage));
    };
    const onPrev = (event) => {
        if (isAnimating) return;
        event.preventDefault();
        setIsAnimating(true);
        // pagination
        const newPage =
            page > 0 ? page - 1 : Math.floor(data.length / numOfElements);
        setPage(newPage);
        // 애니메이션 엔드는 한곳에서만 추가
        currSliderRef.current.addEventListener('animationend', () => {
            // prevSlider className 변경
            addClassName(newSliderRef, 'current');
            deleteClassName(newSliderRef, 'openR');
            // element 교체
            setCurrSlider(null);
            setPrevSlider(null);
            setCurrSlider(slider(currSliderRef, 'current', newPage));
            setIsAnimating(false);
        });
        // prevSlider className 변경
        deleteClassName(currSliderRef, 'current');
        addClassName(currSliderRef, 'closeR');
        // prevSlider 생성
        setPrevSlider(slider(newSliderRef, 'openR', newPage));
    };
    return (
        <Container>
            <Header>{header}</Header>
            <SlideContainer>
                <SlideButton className={'prev'} onClick={onPrev}>
                    <FontAwesomeIcon icon={faChevronLeft} size={'2x'} />
                </SlideButton>
                {prevSlide}
                {currSlide}
                {nextSlide}
                <SlideButton className={'next'} onClick={onNext}>
                    <FontAwesomeIcon icon={faChevronRight} size={'2x'} />
                </SlideButton>
            </SlideContainer>
        </Container>
    );
};

export default Slider;

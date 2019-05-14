import styled from "@emotion/styled";
import React from "react";

export const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.3125rem;
`;

export const Slider = styled.input`
  ${SliderContainer} & {
    -webkit-appearance: none;
    outline: none;
    background: #175ca5;
    height: 0.375rem;
    width: 12.5rem;
    border-radius: 0.3125rem;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 1.125rem;
      height: 1.125rem;
      border-radius: 50%;
      background: #175ca5;
    }
  }
`;

export const Span = styled.span`
  ${SliderContainer} & {
    background: #175ca5;
    color: #fff;
    border-radius: 0.125rem;
    padding: 0.1875rem 0.4375rem;
    margin: 0rem 0.625rem;
    text-align: center;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: -0.75rem;
      top: 50%;
      transform: translateY(-50%);
      height: 0;
      width: 0;
      border: solid 0.375rem #175ca5;
      z-index: -1;
      border-top-color: white;
      border-bottom-color: white;
      border-left-color: white;
    }
  }
`;

const RangeSlider = ({ value, onChange }) => (
  <SliderContainer>
    <Slider
      type="range"
      min="0"
      max="10"
      step="1"
      name="rating"
      value={value}
      onChange={onChange}
    />
    <Span>{value}</Span>
  </SliderContainer>
);

export default RangeSlider;

import { css } from '@emotion/core'
import React from "react";
// import styled from "@emotion/styled";
import { Input } from "semantic-ui-react";

export const slider = css({
    WebkitAppearance: "none",
    outline: "none",
    background: "#175ca5",
    height: "0.375rem",
    width: "12.5rem",
    borderRadius: "0.3125rem",
    '& ::webkit-slider-thumb': {
      WebkitAppearance: "none",
      width: "1.125rem",
      height: "1.125rem",
      borderRadius: "50%",
      background: "red"
    }
});

export const span = css({
    background: "red",
    color: "red",
    borderRadius: "0.125rem",
    padding: "0.1875rem 0.4375rem",
    margin: "0rem 0.625rem",
    textAlign: "center",
    position: "relative",
    '& :before': {
      content: "",
      position: "absolute",
      left: "-0.75rem",
      top: "50%",
      transform: "translateY(-50%)",
      height: 0,
      width: 0,
      border: "solid 0.375rem #175ca5",
      zIndex: -1,
      borderTopColor: "white",
      borderBottomColor: "white",
      borderLeftColor: "white"
    }
});

export const sliderContainer = css({
    display: "flex",
    alignItems: "center",
    padding: "0.3125rem"
});

const RangeSlider = ({ value, onChange }) => (
  <div css={sliderContainer}>
    <Input
      css={slider}
      type="range"
      min="0"
      max="10"
      step="1"
      name="rating"
      value={value}
      onChange={onChange}
    />
    <span css={span}>{value}</span>
  </div>
);

export default RangeSlider;

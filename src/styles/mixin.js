import { css } from 'styled-components' 


// Mixin breakpoint
export const breakpoint = {
  xxs: (...args) => css`
    @media (max-width: 576px) {
      ${css(...args)}
    }
  `,
  xs: (...args) => css`
    @media (max-width: 767.98px) {
      ${css(...args)}
    }
  `,
  sm: (...args) => css`
    @media (max-width: 991.98px) {
      ${css(...args)}
    }
  `,
  md: (...args) => css`
    @media (max-width: 1199.98px) {
      ${css(...args)}
    }
  `
};


// Mixin position
export const position = {
    relative: css`
      position: relative;
      left: ${({left}) => left}px;
      top: ${({top}) => top}px;
      right: ${({right}) => right}px;
      bottom: ${({bottom}) => bottom}px;
    `,
    absolute: css`
      position: relative;
      left: ${({left}) => left}px;
      top: ${({top}) => top}px;
      right: ${({right}) => right}px;
      bottom: ${({bottom}) => bottom}px;
    `
  };


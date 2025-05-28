const breakpoints = {
  tablet: '768px',
  mobile: '480px',
  smallMobile: '320px',
};

export const device = {
  tablet: `(max-width: ${breakpoints.tablet})`,
  mobile: `(max-width: ${breakpoints.mobile})`,
  smallMobile: `(max-width: ${breakpoints.smallMobile})`,
}; 
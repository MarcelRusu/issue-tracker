export const noProp = f => e => {
  e.stopPropagation();
  f && f(e)
};
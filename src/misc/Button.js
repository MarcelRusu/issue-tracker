import './Button.scss';

export default ({children, ...props}) => (
  <button {...props}>
    {children}
  </button>
);

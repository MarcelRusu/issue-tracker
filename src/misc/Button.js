import './Button.scss';

export default ({children, type, ...props}) => (
  <button className={type === 'danger' && 'danger'} {...props}>
    {children}
  </button>
);

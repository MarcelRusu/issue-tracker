import './Button.scss';

const Button = ({children, type, className, ...props}) => (
  <button className={`${type === 'danger' && 'danger'} ${className}`} {...props}>
    {children}
  </button>
);

export default Button;
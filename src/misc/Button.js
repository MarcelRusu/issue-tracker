import './Button.scss';

const Button = ({children, type, ...props}) => (
  <button className={type === 'danger' && 'danger'} {...props}>
    {children}
  </button>
);

export default Button;
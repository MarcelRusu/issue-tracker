import './Overlay.scss';


const Overlay = ({children, invisible, onClickOut}) => (
  <>
    <div
      onClick={onClickOut}
      className={`absolute z-10 w-screen h-screen ${!invisible && 'bg-gray-500 opacity-30'} left-0 top-0`}
    />
    <div className={`absolute w-1/5 z-20 top-1/5 overlay-content`}>
      {children}
    </div>
  </>
);

export default Overlay;
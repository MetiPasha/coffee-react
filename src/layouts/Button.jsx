const Button = (props) => {
  return (
    <>
      <button
        onClick={props.onClick}
        className="px-6 py-1 border-white bg-[#FFDCAB] hover-brand transition-all rounded-full cursor-pointer"
      >
        {props.title}
      </button>
    </>
  );
};

export default Button;

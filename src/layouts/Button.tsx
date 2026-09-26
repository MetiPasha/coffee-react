interface ButtonProps {
  onClick?: () => void;
  title: string;
}

const Button = ({ onClick, title }: ButtonProps) => {
  return (
    <>
      <button
        onClick={onClick}
        className="px-6 py-1 border-white bg-[#FFDCAB] hover-brand transition-all rounded-full cursor-pointer"
      >
        {title}
      </button>
    </>
  );
};

export default Button;
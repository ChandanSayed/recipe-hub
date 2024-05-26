const Button = ({ name }) => {
  return (
    <button className="px-8 py-3 bg-dark-blue text-lg font-medium rounded-lg hover:bg-opacity-50 hover:text-white hover:shadow-lg">
      {name}
    </button>
  );
};

export default Button;

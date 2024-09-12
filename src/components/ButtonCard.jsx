const ButtonCard = ({ text, type, color = "purple", loading, onClick }) => {
  const isCopyButton = text === "Copiar" || text === "Copiado";

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${
        isCopyButton
          ? "text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300"
          : "text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-purple-300"
      } font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900`}
    >
      {text}
    </button>
  );
};

export default ButtonCard;

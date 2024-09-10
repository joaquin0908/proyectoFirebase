const FormError = ({ error }) => {
  return (
    <>
      {error && (
        <p className=" text-sm text-red-600 dark:text-red-500 mt-2">
          <span className="font-medium">Oops! </span>
          {error.message}
        </p>
      )}
    </>
  );
};
export default FormError;

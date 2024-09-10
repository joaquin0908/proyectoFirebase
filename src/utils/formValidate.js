export const formValidate = (getValues) => {
  const minLengthValue = 6;

  return {
    required: {
      value: true,
      message: "Campo obligatorio",
    },
    patternEmail: {
      value:
        /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
      message: "formato de email incorrecto",
    },
    patternUrl: {
      value: /^(https?:\/\/)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,
      message: "formato de url incorrecto",
    },
    minLength: {
      value: minLengthValue,
      message: ` Minimo ${minLengthValue} caracteres`,
    },
    validateTrim: {
      trim: (v) => {
        if (!v.trim()) {
          return "HAAAAAAAAA HACKERITO";
        }
        return true;
      },
    },
    validateEquals(value) {
      return {
        equals: (v) => v === value || "No coinciden las contraseñas",
      };
    },
  };
};

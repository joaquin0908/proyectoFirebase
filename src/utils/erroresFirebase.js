export const erroresFirebase = (code) => {
    switch (code) {
        case "auth/email-already-in-use":
            return "Usuario ya registrado";
        case "auth/invalid-email":
            return "Formato email no válido";
        case "auth/wrong-password":
            return "Contraseña incorrecta";
        case "auth/user-not-found":
            return "Usuario no encontrado";
        default:
            return "Ocurrió un error en el servidor";
    }
};

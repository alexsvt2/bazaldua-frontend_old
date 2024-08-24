import Axios from "axios";

if (!import.meta.env.VITE_SERVER_URL) {
    throw new Error(
        "VITE_SERVER_URL is not defined (did you forget to create a .env file from .env.template?)"
    );
}

export const axios = Axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});
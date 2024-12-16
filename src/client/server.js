import { requestJson } from "./request";

export const getPayments = async (url) => {
    try {
        const response = await requestJson.get(url);
        return {
            success: true,
            data: response.data,
            message: "Ma'lumot muvaffaqiyatli olindi!",
        };
    } catch (error) {
        let errorMessage = "Xatolik yuz berdi!";
        if (error.response) {
            errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
            errorMessage = "Serverdan javob olinmadi!";
        } else {
            errorMessage = error.message || errorMessage;
        }
        return {
            success: false,
            data: null,
            message: errorMessage,
        };
    }
};

export const postPayments = async (url, data) => {
    try {
        const response = await requestJson.post(url, data);
        return {
            success: true,
            data: response.data,
            message: "Ma'lumot muvaffaqiyatli qo'shildi!",
        };
    } catch (error) {
        let errorMessage = "Xatolik yuz berdi!";
        if (error.response) {
            errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
            errorMessage = "Serverdan javob olinmadi!";
        } else {
            errorMessage = error.message || errorMessage;
        }
        return {
            success: false,
            data: null,
            message: errorMessage,
        };
    }
};
export const deletePayments = async (url, id) => {
    try {
        const response = await requestJson.delete(`${url}/${id}`);
        return {
            success: true,
            data: response.data,
            message: "Ma'lumot muvaffaqiyatli o'chiridi!",
        };
    } catch (error) {
        let errorMessage = "Xatolik yuz berdi!";
        if (error.response) {
            errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
            errorMessage = "Serverdan javob olinmadi!";
        } else {
            errorMessage = error.message || errorMessage;
        }
        return {
            success: false,
            data: null,
            message: errorMessage,
        };
    }
};

import { request } from "./request";
export const getExchange = async (url='usd') => {
    try {
        // GET so'rovni yuborish
        const response = await request.get(url);
        // Muvaffaqiyatli javobni qaytarish
        return {
            success: true,
            data: response.data,
            message: "Ma'lumot muvaffaqiyatli olindi!",
        };
    } catch (error) {
        // Xatoliklarni boshqarish
        let errorMessage = "Xatolik yuz berdi!";
        if (error.response) {
            // Server javob bergan bo'lsa
            errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
            // So'rov yuborildi, lekin javob olinmadi
            errorMessage = "Serverdan javob olinmadi!";
        } else {
            // Xato sozlamalar yoki boshqa muammo
            errorMessage = error.message || errorMessage;
        }

        return {
            success: false,
            data: null,
            message: errorMessage,
        };
    }
};

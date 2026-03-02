export const randomDay = () => {
    return Math.floor(Math.random() * 31) + 1;
};

export const randomMonth = () => {
    return Math.floor(Math.random() * 12) + 1;
};

export const randomYear = () => {
    return Math.floor(Math.random() * 122) + 1900;
};
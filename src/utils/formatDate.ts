const padL = (num: number, len = 2, chr = "0") => `${num}`.padStart(len, chr);

export const cx = (...classes: string[]) => classes.filter((cur) => cur).join(" ");

export const formatDate = (date: Date) => {
    return `${padL(date.getDate())}.${padL(date.getMonth() + 1)}.${date.getFullYear()}`;
};

export const formatDateTime = (date: Date) => {
    return `${formatDate(date)} ${padL(date.getHours())}:${padL(date.getMinutes())}:${padL(date.getSeconds())}`;
};

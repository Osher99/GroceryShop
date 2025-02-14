export const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
};

export const formatDate = (date: Date | null): string => {
    if (!date) return "N/A";
    return date.toLocaleDateString("en-GB"); // DD/MM/YYYY
};

export const cn = (...classes: (string | undefined | false)[]) => {
    return classes.filter(Boolean).join(" ");
};

export const formatDateForAPI = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export const formatStringDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // חודשים ב-JS הם מ-0 עד 11
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
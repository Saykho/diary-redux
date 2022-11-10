export function formatDate(date: Date) {
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();
    const hh = date.getHours();
    const min = date.getMinutes();

    return [date.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd,
        (hh > 9 ? '' : '0') + hh,
        (min > 9 ? '' : '0') + min,
    ].join('/');
}
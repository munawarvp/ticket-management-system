
export const getLocal = (key) => {
    let data = localStorage.getItem(key);
    return data;
}

export function setLocal(data, key) {
    localStorage.setItem(key, data);
}
const LOCAL_STORAGE_KEY = 'temp-data-stash';

export const stash = (data) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

export const unstash = () => {
    const strStash = localStorage.getItem(LOCAL_STORAGE_KEY);
    const data = (typeof strStash === 'string' && strStash !== '' ? JSON.parse(strStash) : {});
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return data;
}
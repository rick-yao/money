const localStorageKeyName = "RecordList";
const modelRecord = {
  clone(data: RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(data));
  },
  fetch(): RecordItem[] {
    return JSON.parse(
      localStorage.getItem(localStorageKeyName) || "[]"
    ) as RecordItem[];
  },
  save(data: RecordItem[]): void {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  },
};
export { modelRecord };

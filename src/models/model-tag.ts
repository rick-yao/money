const localStorageKeyName = "tagListModel";
type LocalTags = {
  tag: string[];
  fetch: () => string[];
  save: () => void;
  create: (data: string) => void;
};
const tagListModel: LocalTags = {
  tag: [],
  fetch() {
    this.tag = JSON.parse(localStorage.getItem(localStorageKeyName) || "[]");
    return this.tag;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tag));
  },
  create(newTag: string) {
    this.tag.push(newTag);
    this.save();
  },
};
export { tagListModel };

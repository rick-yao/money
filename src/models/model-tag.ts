import GenerateID from "@/lib/IdGenerator";

const localStorageKeyName = "tagListModel";
type Tag = {
  id: string;
  name: string;
};
type LocalTags = {
  tag: Tag[];
  fetch: () => Tag[];
  update: (id: string, name: string) => void;
  remove: (index: number) => void;
  save: () => void;
  create: (data: string) => void;
};
const tagListModel: LocalTags = {
  tag: [],
  fetch() {
    this.tag = JSON.parse(localStorage.getItem(localStorageKeyName) || "[]");
    return this.tag;
  },
  update(id, name) {
    const index = this.tag.findIndex((item) => item.id === id);
    if (index >= 0) {
      this.tag[index].name = name;
      this.save();
    }
  },
  remove(index) {
    this.tag.splice(index, 1);
    this.save();
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tag));
  },
  create(name: string) {
    const id = GenerateID();
    const tmp: Tag = { id: id.toString(), name: name };
    this.tag.push(tmp);
    this.save();
  },
};
export { tagListModel };

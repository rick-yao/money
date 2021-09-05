import GenerateID from "@/lib/IdGenerator";
import Tags from "@/components/Money/Tags.vue";

const localStorageKeyName = "tagListModel";
type Tag = {
  id: string;
  name: string;
};
type LocalTags = {
  tag: Tag[];
  fetch: () => Tag[];
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
  create(name: string) {
    const id = GenerateID();
    const tmp: Tag = { id: id.toString(), name: name };
    this.tag.push(tmp);
    this.save();
  },
};
export { tagListModel };

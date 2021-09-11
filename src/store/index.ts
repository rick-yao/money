import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import GenerateID from "@/lib/IdGenerator";

type Tag = {
  id: string;
  name: string;
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
    currentTag: {} as Tag,
  },
  mutations: {
    loadRecords(state) {
      state.recordList = JSON.parse(localStorage.getItem("RecordList") || "[]");
    },
    saveRecord(state) {
      window.localStorage.setItem(
        "RecordList",
        JSON.stringify(state.recordList)
      );
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.date = new Date();
      state.recordList && state.recordList.push(record2);
      this.commit("saveRecord");
    },
    loadTags(state) {
      state.tagList = JSON.parse(localStorage.getItem("tagList") || "[]");
    },
    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
    updateTag(state, object: Tag) {
      const idList = state.tagList.map((t) => t.id);
      const nameList = state.tagList.map((t) => t.name);
      const index = idList.findIndex((item) => item === object.id);
      const nameIndex = nameList.findIndex((t) => t === object.name);
      if (index >= 0) {
        if (nameIndex >= 0) {
          window.alert("标签名重复了");
        } else {
          state.tagList[index].name = object.name;
          this.commit("saveTags");
        }
      }
    },
    removeTag(state, index) {
      state.tagList.splice(index, 1);
      this.commit("saveTags");
    },
    createTag(state, name: string) {
      const id = GenerateID();
      const tmp: Tag = { id: id.toString(), name: name };
      state.tagList.push(tmp);
      this.commit("saveTags");
    },
    setCurrentTag(state, name) {
      state.currentTag = state.tagList.filter((t) => t.name === name)[0];
    },
  },
});

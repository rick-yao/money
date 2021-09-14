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
    loadTags(state) {
      state.tagList = JSON.parse(localStorage.getItem("tagList") || "[]");
    },
    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
    setCurrentTag(state, name) {
      state.currentTag = state.tagList.filter((t) => t.name === name)[0];
    },
  },
  actions: {
    createTag(context, name: string) {
      const id = GenerateID();
      const tmp: Tag = { id: id.toString(), name: name };
      context.state.tagList.push(tmp);
      context.commit("saveTags");
    },
    removeTag(context, index) {
      context.state.tagList.splice(index, 1);
      context.commit("saveTags");
    },
    updateTag(context, object: Tag) {
      const idList = context.state.tagList.map((t) => t.id);
      const nameList = context.state.tagList.map((t) => t.name);
      const index = idList.findIndex((item) => item === object.id);
      const nameIndex = nameList.findIndex((t) => t === object.name);
      if (index >= 0) {
        if (nameIndex >= 0) {
          window.alert("标签名重复了");
        } else {
          context.state.tagList[index].name = object.name;
          context.commit("saveTags");
        }
      }
    },
    createRecord(context, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.date = new Date().toISOString();
      context.state.recordList?.push(record2);
      context.commit("saveRecord");
    },
  },
});

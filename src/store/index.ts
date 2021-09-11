import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
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
      // @ts-ignore
      this.commit("saveRecord");
    },
  },
});

import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import GenerateID from "@/lib/IdGenerator";
import dayjs from "dayjs";

type Tag = {
  id: string;
  name: string;
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tagHashTable: {
      baoxian: "保险",
      dianfei: "电费",
      food: "食物",
      fumu: "父母",
      huafei: "话费",
      shenghuojiaofei: "生活缴费",
      shoujihao: "手机号",
      xiche: "洗车",
      empty: "无标签",
      salary: "工资",
      hongbao: "红包",
      claim: "报销",
      finance: "理财",
      parttime: "兼职",
    },
    tagHashTableOutPut: {
      baoxian: "保险",
      dianfei: "电费",
      food: "食物",
      fumu: "父母",
      huafei: "话费",
      shenghuojiaofei: "生活缴费",
      shoujihao: "手机号",
      xiche: "洗车",
    },
    tagHashTableInPut: {
      salary: "工资",
      hongbao: "红包",
      claim: "报销",
      finance: "理财",
      parttime: "兼职",
    },
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
  getters: {
    getRecord:
      (state) =>
      ({ type, selector }: { type: string; selector: string }) => {
        const recordList = state.recordList;
        const selectHastTable = {
          M: "YYYY-MM",
          Y: "YYYY",
        };
        const queryHashTable = {
          M: "month" as const,
          Y: "year" as const,
        };
        const n = clone(
          recordList
            .filter((t) => t.type === type)
            .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())
        );
        if (selector === "M" || selector === "Y") {
          const hashTable: { title: string; items: RecordItem[] }[] = [
            {
              title: dayjs(n[0].date).format(selectHastTable[selector]),
              items: [n[0]],
            },
          ];
          for (let i = 1; i <= n.length - 1; i++) {
            const current = n[i];
            const last = hashTable[hashTable.length - 1];
            if (
              dayjs(current.date).isSame(last.title, queryHashTable[selector])
            ) {
              last.items.push(current);
            } else {
              hashTable.push({
                title: dayjs(current.date).format(selectHastTable[selector]),
                items: [current],
              });
            }
          }
          return hashTable;
        }
        if (selector === "W") {
          const tmp = n.filter((t) =>
            dayjs().subtract(7, "day").isBefore(dayjs(t.date))
          );
          const hashTable = [
            {
              title: dayjs(tmp[0].date).format("YYYY-MM-DD"),
              items: [tmp[0]],
            },
          ];

          for (let i = 1; i <= tmp.length - 1; i++) {
            const current = tmp[i];
            const last = hashTable[hashTable.length - 1];
            if (dayjs(current.date).isSame(last.title, "day")) {
              last.items.push(current);
            } else {
              hashTable.push({
                title: dayjs(current.date).format("YYYY-MM-DD"),
                items: [current],
              });
            }
          }
          return hashTable;
        }
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
      if (record2.type === "-") {
        record2.number = "-" + record2.number;
      }
      context.state.recordList?.push(record2);
      context.commit("saveRecord");
    },
  },
});

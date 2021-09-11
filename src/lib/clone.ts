function clone(data: RecordItem[] | RecordItem): RecordItem {
  return JSON.parse(JSON.stringify(data));
}

export default clone;

import dayjs from "dayjs";
function init(): void {
    if (!localStorage.getItem('RecordList')) {
        const today : string= dayjs().format('YYYY-MM-DD')
        const yesterday :string= dayjs().subtract(1,'day').format('YYYY-MM-DD')
        const sample = [
            {
                type: '-',
                selectedTags: ['fumu'],
                notes: '买洗衣机',
                number: '-3',
                id: 1,
                date: today+'T04:02:17.390Z',
            },
            {
                type: '-',
                selectedTags: ['dianfei'],
                notes: '上个月电费',
                number: '-33',
                id: 3,
                date: today+'T07:29:21.555Z',
            },
            {
                type: '-',
                selectedTags: ['fumu'],
                notes: '衣服',
                number: '-3',
                id: 5,
                date: yesterday+'T07:29:24.954Z',
            },
            {
                type: '+',
                selectedTags: ['claim'],
                notes: '',
                number: '3',
                id: 6,
                date: yesterday+'T07:29:27.205Z',
            },
            {
                type: '+',
                selectedTags: ['hongbao'],
                notes: '父母',
                number: '3',
                id: 8,
                date: yesterday+'T07:29:30.048Z',
            },
        ];
        localStorage.setItem('RecordList', JSON.stringify(sample));
        localStorage.setItem('_IdMax', '8');
    }
}

export default init;

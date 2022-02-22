function init(): void {
    if (!localStorage.getItem('RecordList')) {
        const sample = [
            {
                type: '-',
                selectedTags: ['fumu'],
                notes: 'dsf',
                number: '-3',
                id: 1,
                date: '2022-02-01T04:02:17.390Z',
            },
            {
                type: '-',
                selectedTags: ['dianfei'],
                notes: '哈哈',
                number: '-33',
                id: 3,
                date: '2022-02-01T07:29:21.555Z',
            },
            {
                type: '-',
                selectedTags: ['fumu'],
                notes: '111',
                number: '-3',
                id: 5,
                date: '2022-02-01T07:29:24.954Z',
            },
            {
                type: '+',
                selectedTags: ['claim'],
                notes: '',
                number: '3',
                id: 6,
                date: '2022-02-01T07:29:27.205Z',
            },
            {
                type: '+',
                selectedTags: ['hongbao'],
                notes: '',
                number: '3',
                id: 8,
                date: '2022-02-01T07:29:30.048Z',
            },
        ];
        localStorage.setItem('RecordList', JSON.stringify(sample));
        localStorage.setItem('_IdMax', '8');
    }
}

export default init;

import { groupByKey } from '../src/common/bizHelper'

test('data is normalOk ', () => {
    const testData = [{ name: 'abc', value: 'cccc', zid: 'A' }, { name: 'abc', value: 'bbbb', zid: 'B' }];
    expect(groupByKey(testData, 'zid')).toEqual(
            { A: { NAME: 'abc', VALUE: 'cccc' }, B: { NAME: 'abc', VALUE: 'bbbb' }})
});

test('DATA is Null', () => {
    const testData = [];
    expect(groupByKey(testData, 'zid')).toEqual({});
})

import _ from 'lodash'
/**
 *  groupByKey
 *
 *  把lastData数组 按zid分组 baseSeries
 *
 *  [{name:"abc",value:"cccc",zid:"A"},{name:"abc",value:"bbbb",zid:"B"}]
 *   转换成 =>
 *  { A : {NAME:"abc",VALUE:"cccc"} , B :{NAME:"abc",VALUE:"bbbb"} }
 *
 * @param  {Array}
 * @return {Object}
 */
export const groupByKey = (lastData, key) => {
    const v = _.chain(lastData)
      .groupBy(it => { return it[key] })
      .map((e, key) => {
          let ob = e[0];
          ob = _.mapKeys(ob, function (val, k) {
              return k.toUpperCase()
          })
          delete ob['ZID']
          return {
              [key]: ob
          }
      });

    if (Array.isArray(lastData)) {
        const r = {};
        v.value().forEach(function (a) {
            _.forIn(a, (v, k) => {
                if (k !== 'undefined') {
                    r[k] = v
                }
            })
        })
        return r;
    }
    return v.first().value()
}

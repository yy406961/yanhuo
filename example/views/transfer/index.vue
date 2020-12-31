<template>
  
            <transfer :option="transferOpt"></transfer>
</template>

<script>
    import transfer from 'src/components/transfer'
    export default {
        data () {
            return {
                transferOpt: {
                    data: [],
                    titles: ['目标号码', '已选目标'],
                    value: [],
                    handleChange (val) {
                        me.sendPhones = [];
                        let orgData = me.tableData.rows;
                        for (let j = 0; j < val.length; j++) {
                            me.sendPhones.push(orgData[val[j] - 1].msisdn + '&' +
                                orgData[val[j] - 1].name + '&' + orgData[val[j] - 1].imei + '&' + orgData[val[j] - 1].imsi + '$')
                        }
                    }
                }
            }
        },
        components: {
            transfer
        }
    }
</script>

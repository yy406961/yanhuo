/*
 * @Author: your name
 * @Date: 2020-11-23 16:23:24
 * @LastEditTime: 2021-03-26 15:48:42
 * @LastEditors: your name
 * @Description: In User Settings Edi
 * @FilePath: \yanhuo\config\dev.env.js
 */
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    loginName: prodEnv.loginName,
    // MOCK_URL: '"http://172.17.18.10:7080/yq_web"',
    // MOCK_URL:'"http://192.168.3.209:8686/policeBusiness"'
    // MOCK_URL:'"http://192.168.3.175:8080/policeBusiness"'
    // MOCK_URL:'"http://10.8.0.23:8080/policeBusiness"'
    // MOCK_URL: '"http://172.17.20.227:8080/mockjsdata/34/"'
    //   CK_URL:'"http://10.8.0.19:8080/mockjsdata/1"'
    // MOCK_URL:'"http://192.168.3.157:9080/mockjsdata/5"'
    // MOCK_URL:'"http://10.8.0.15:8080/mockjsdata/1"'
    // MOCK_URL:'"http://192.168.3.195:8080/policeBusiness"'
    // MOCK_URL:'"http://192.168.3.185:8080/policeBusiness"'
    // MOCK_URL:'"http://192.168.3.196:8080/policeBusiness"'
    // MOCK_URL:'"http://192.168.3.185:8080/policeBusiness"'
     MOCK_URL:'"http://15.15.11.29:8145/policeBusiness"'
    // MOCK_URL:'"http://locallhost:8080/policeBusiness"'
   // MOCK_URL:'"15.15.11.128:8045/policeBusiness"'
    //MOCK_URL:'"15.15.11.25:8080/policeBusiness"'
    // MOCK_URL:'"http://10.250.192.204:8085/policeBusiness"'
    // MOCK_URL:'"http://10.8.0.20:8080/policeBusiness"'

});

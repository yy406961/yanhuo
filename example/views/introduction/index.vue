<template>
    <div class="app-container">
        <div class="filter-container">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="关键字" v-model="listQuery.title">
          </el-input>
          <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
          <el-button type="primary" @click="add">新 建 事件</el-button>
        </div>

        <el-table  :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
          <el-table-column align="center" label="序号" width="65"  type="index">
          </el-table-column>

          <el-table-column  align="center" label="事件名称">
            <template scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>


          <el-table-column width="110px" align="center" label="敏感事件ID">
            <template scope="scope">
              <span>{{scope.row.id}}</span>
            </template>
          </el-table-column>

          <el-table-column width="180px" align="center" label="事件创建时间">
            <template scope="scope">
              <span>{{scope.row.createTime}}</span>
            </template>
          </el-table-column>

          <el-table-column min-width="300px" label="事件摘要">
            <template scope="scope">
              <span class="link-type" >{{scope.row.ab}}</span>
            </template>
          </el-table-column>

          <el-table-column  align="center" label="操作" width="150">
            <template scope="scope">
              <el-button size="small" type="success" @click="handleModifyStatus(scope.row,'updated')">修改
              </el-button>
              <el-button size="small" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
                </el-button>
            </template>
          </el-table-column>

        </el-table>

        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
             <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
               <el-form-item label="事件id">
                 <el-input v-model="temp.id"></el-input>
               </el-form-item>

               <el-form-item label="开始时间">
                 <el-date-picker v-model="temp.startTime" placeholder="选择开始日期时间">
                 </el-date-picker>
               </el-form-item>

               <el-form-item label="结束时间">
                 <el-date-picker v-model="temp.endTime"  placeholder="选择结束日期时间">
                 </el-date-picker>
               </el-form-item>

               <el-form-item label="事件名称">
                 <el-input v-model="temp.title"></el-input>
               </el-form-item>

               <el-form-item label="事件摘要">
                 <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="temp.ab">
                 </el-input>
               </el-form-item>
             </el-form>
             <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible = false">取 消</el-button>
               <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
               <el-button v-else type="primary" @click="update">确 定</el-button>
             </div>
           </el-dialog>

    </div>
</template>
<script>
    import { search, update, del, create} from 'api/minganEvent'
    export default {
        name: 'intro',
        data() {
            return {
                listQuery: {
                    page: 1,
                    limit: 20,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id'
                },
                list: [],
                total: null,
                tableKey: 0,
                listLoading: true,
                temp: {
                    id: undefined,
                    startTime: '',
                    endTime: '',
                    cn: [1, 2],
                    name: '',
                    ab: ''
                },
                dialogStatus: 'create',
                dialogFormVisible: false,
                textMap: {
                    update: '编辑',
                    create: '创建'
                }
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            async fetchData() {
                this.listLoading = true;
                let resp = await search()
                console.log(resp)
                this.list = resp.rows;
                this.listLoading = false;
            },
            handleFilter() {

            },
            add() {
                this.dialogStatus = 'create';
                this.clear();
                this.dialogFormVisible = true;
            },
            create() {
                let param = _.clone(this.temp);
                create(param).then(resp => {
                    console.log(resp)
                    this.dialogFormVisible = false;
                })
            },
            clear() {
                this.temp.id = '';
                this.temp.abstract = '';
                this.temp.mg_name = '';
            },
            update() {
                let param = _.clone(this.temp);
                update(param, param.id).then(resp => {
                    console.log(resp)
                    this.dialogFormVisible = false;
                })
            },
            handleModifyStatus(row, type) {
                if (type === 'updated') {
                    this.dialogStatus = 'update';
                    this.temp.id = row.id;
                    this.temp.abstract = row.abstract;
                    this.temp.mg_name = row.mg_name;
                    this.dialogFormVisible = true;
                } else if (type === 'deleted') {
                    del(row.id).then(resp => {
                        console.log(resp)
                    })
                }
            }
        }
    }
</script>
<style scoped>
    .app-container{
        padding: 20px;
    }
</style>

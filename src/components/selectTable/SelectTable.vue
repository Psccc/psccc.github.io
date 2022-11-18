<template>
    <div>
        <div style="padding: 1px;">
            <el-input v-model="searchColumn[item.prop]" style="width: 200px" :placeholder="'请输入'+item.label" suffix-icon="el-icon-search"
                v-for="(item,k) in searchs" :key="k"></el-input>
           <!-- <el-input v-model="no" class="ml-5" style="width: 200px" placeholder="请输入账号" suffix-icon="el-icon-search"></el-input>-->
            <el-button type="primary" icon="el-icon-search" class="ml-5" @click="search" v-if="searchShow">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh" class="ml-5" @click="reset" v-if="searchShow">清空</el-button>
        </div>
        <el-table :data="tableData" border header-cell-class-name="table_header_class"
                  ref="multipleTable"
                  @selection-change="handleSelectionChange" :row-key="getRowKey"
                  highlight-current-row @current-change="singleChange"
                  @row-dblclick="dbClick">
            <el-table-column type="selection" :reserve-selection="true" label="选择" width="60"
                v-if="!singleFlag">
            </el-table-column>

           <el-table-column type="index" label="序号"></el-table-column>
            <template v-for="(item,k) in select.columns">
                <el-table-column :prop="item.prop" :label="item.label" :width="item.width"
                                 :key="k" v-if="item.show==false?false:true">
                </el-table-column>
            </template>
            <!--<el-table-column prop="no" label="账号" width="200">
            </el-table-column>-->
           <!-- <el-table-column prop="sex" label="性别" width="60">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.sex === '1' ? 'primary' : 'success'"
                            disable-transitions>{{scope.row.sex==1?"男":"女"}}</el-tag>
                </template>
            </el-table-column>-->
            <!--<el-table-column prop="age" label="年龄" width="80">
            </el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>-->

        </el-table>
        <div style="padding: 10px 0">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>

        <div style="text-align: left;margin-left: 50px;">
            <el-button type="primary" @click="onSelectUserSubmit">确 定</el-button>
            <el-button @click="onSelectUserClose">取 消</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SelectTable",
        data(){
            return{
                item:'123',
                tableData: [],
                pageSize:5,
                pageNum:1,
                total:0,
                resultSize:1,
                searchColumn: {},
                searchShow:false,
                formShow:false,
                singleFlag:false,
                currentRow:{},
                multipleSelection:[],
                table_key:'',
                searchs:[],
                body:{
                    //roleId: 2//用户
                }
            }
        },
        props:{
            select:Object
        },
        methods:{
            set(key,val){
                console.log(val)
                this.searchColumn[key]=val
            },
            getRowKey(row){
                return row[this.table_key]
            },
            dbClick(row){
                if(this.singleFlag){//单选 双击直接提交
                    this.onSelectUserSubmit()
                }else{//多选的话，双击选中或者取消选中
                    this.$refs.multipleTable.toggleRowSelection(row);
                }

            },
            singleChange(val) {
                this.currentRow = val;
            },
            onSelectUserSubmit(){
                if(this.singleFlag){
                    let o={}
                    this.select.columns.forEach(item=>{
                        o[item.prop] = this.currentRow[item.prop]
                    })
                    this.select.submit && this.select.submit(o)
                    return
                }
                let data=[]
                let checkArr = this.multipleSelection

                if(checkArr.length<=0){
                    this.$message.error("请至少选择一条记录")
                    return
                }
                if(this.resultSize!=checkArr.length){
                    this.$message.error("只能选择"+this.resultSize+"条记录")
                    return
                }
                checkArr.forEach(row=>{
                    let o={}
                    this.select.columns.forEach(item=>{
                       //if(item.return){
                            o[item.prop] = row[item.prop]
                        //}

                    })

                    data.push(o)
                })

                this.select.submit && this.select.submit(data)
            },
            onSelectUserClose(){
                this.select.cancel && this.select.cancel()
            },
            reset(){
                for (const key in  this.searchColumn) {
                    this.searchColumn[key]=''
                }
            },
            search(){
                //每次搜索要把当前页设置为第一页
                this.pageNum=1;
                this.load();
            },
            load(){
                this.buildBody();
                this.http.post(this.select.url,
                    this.body
                ).then(res=>{
                    console.log(res)

                    this.dealResult(res);
                })
            },
            buildBody(){
                console.log(123123)
                this.body.pageSize=this.pageSize
                this.body.pageNum=this.pageNum
                for (const key in  this.searchColumn) {
                    //key = name
                    this.body[key] = this.searchColumn[key]
                }
            },
            dealResult(res){
                let select_res = this.select.res;
                if(select_res){
                    for (const k in select_res) {
                        if(k=='data'){
                            this.tableData = this.getResult(select_res[k],res)
                        }else if(k=='total'){
                            this.total = this.getResult(select_res[k],res)
                        }
                    }
                }else{
                    this.tableData = res.data.list
                    this.total=res.data.total
                }
            },
            getResult(key,res){
                //key= 'data.list.sdfsd.ddsf'
                //res['data']['list']

                let result = res ;
                let keys = key.split(".");
                for (const v of keys) {
                    result = result[v]
                }

                return result;
            },
            init(){
                //处理默认参数
                let param = this.select.defaultParam
                for (const k in param) {
                    this.body[k]=param[k]
                }
                //处理是否单选
                this.singleFlag = this.select.single

                if(!this.singleFlag){
                    if(this.select.resultSize>1){
                        this.resultSize=this.select.resultSize
                    }
                }
            },
            initColumn(){
                let searchs=[]
                this.select.columns.forEach(item=>{
                    if(item.key){
                        this.table_key = item.prop
                    }
                    if(item.search){
                        searchs.push({
                            prop:item.prop,
                            label:item.label
                        })

                        this.$set(this.searchColumn,item.prop,'')

                        this.searchShow=true
                    }
                })

                this.searchs=searchs;
            },
            handleSizeChange(val){
                //每次切换每页条数要把当前页设置为第一页
                this.pageNum=1;
                this.pageSize=val;
                this.load();
            },
            handleCurrentChange(val){
                this.pageNum=val;
                this.load();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection)
            },


            onSubmit(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.http.post("/user/save",
                            this.form
                        ).then(res=>{
                            console.log(res)
                            if(res.code==200){//成功
                                this.$message({
                                    showClose: true,
                                    message: '操作成功！',
                                    type: 'success'
                                });
                                this.formShow=false
                                this.$refs.form.resetFields();

                                this.load()
                            }else{
                                this.$message({
                                    showClose: true,
                                    message: '操作失败！',
                                    type: 'error'
                                });
                            }

                        })
                    }else{
                        return false;
                    }
                });

            }
        },
        created() {
            this.initColumn()
            this.init()
            this.load();
        }
    }
</script>

<style>
    .table_header_class{
        background-color: #D3DCE6 !important;
        color: black;
    }
</style>
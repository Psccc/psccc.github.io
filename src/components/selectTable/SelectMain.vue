<template>
    <div style="margin:30px;">
        <el-col :span="4">
        <el-input v-model="userName" readonly placeholder="请选择用户" @click.native="showSelect"></el-input>
        </el-col>
        <el-dialog title="维护信息" :visible.sync="userSelectTableShow" @close="close" width="860px">
            <SelectTable :select="select" v-if="selectTableShow" ref="refSelectTable">
            </SelectTable>
        </el-dialog>

    </div>
</template>

<script>
    import SelectTable from "./SelectTable";

    export default {
        name: "SelectMain",
        components:{SelectTable},
        data(){
            return {
                userName:'',
                userId:'',
                userSelectTableShow:false,
                selectTableShow:false,
                select:{

                    url:'/user/listByPage',

                    res:{
                        data:'data.list',
                        total:'data.total'
                    },
                    //默认查询参数
                    defaultParam:{
                        roleId: 2//用户
                    },
                    resultSize:2,
                    //表示单选
                    //single:true,
                    //确定的回调
                    submit:(data)=>{
                        console.log(data)
                        this.userSelectTableShow=false

                        if(!Array.isArray(data)){
                            this.userName=data.name
                            this.userId=data.id
                        }else{
                            this.userName=data[0].name
                            this.userId=data[0].id
                        }

                    },
                    //取消的回调
                    cancel:()=>{
                        this.userSelectTableShow=false
                    },
                    columns:[
                        {
                            prop:'id',
                            label:'ID',
                            key:true,
                            show:true
                        },
                        {
                            prop:'name',
                            label:'名字',
                            width:200,
                            search:true
                        },
                        {
                            prop:'no',
                            label:'账号',
                            width:200,
                            //search:true
                        },
                        {
                            prop:'age',
                            label:'年龄',
                            width:80
                        },
                        {
                            prop:'phone',
                            label:'电话',
                           // return:true
                        }
                    ]
                },

                select1:{
                    result:'',
                    name:'食物',
                    select:(val)=>{
                        this.$nextTick(()=>{
                            console.log(this.$refs)
                            this.$refs.refSelectTable.set('name',val)
                        })

                    },
                    data:[
                        {
                            value: '选项1',
                            label: '黄金糕'
                        }, {
                            value: '选项2',
                            label: '双皮奶'
                        }, {
                            value: '选项3',
                            label: '蚵仔煎'
                        }, {
                            value: '选项4',
                            label: '龙须面'
                        }, {
                            value: '选项5',
                            label: '北京烤鸭'
                        }
                    ]
                }
            }
        },
        methods:{
            close(){
                this.userSelectTableShow=false
            },
            showSelect(){
                this.userSelectTableShow=true

                this.selectTableShow=false

                this.$nextTick(()=>{
                    this.selectTableShow=true
                })
            }
        }
    }
</script>

<style scoped>

</style>
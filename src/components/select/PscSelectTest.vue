<template>
    <div>
        <PscSelect :select="select"  @setresult="setresult" @setSelectC="setSelectC"></PscSelect>
        <PscSelect :select="selectC" @setresult="setresultC"></PscSelect>
    </div>
</template>

<script>
import PscSelect from './PscSelect.vue'
export default {
    name: 'PscSelectTest',
    components: {
        PscSelect
    },
    data() {
        return {
            selectC:{
                result:'',
                data:[],
                name:'children',
            },
            select: {
                result:'选项3',
                name:'parent',
                data: [{
                        value: '选项1',
                        label: '黄金糕',
                        children:[
                            {
                                value: '选项1-1',
                                label: '黄金糕1-1'
                            },
                            {
                                value: '选项1-2',
                                label: '黄金糕1-2'
                            },
                        ]
                    }, {
                        value: '选项2',
                        label: '双皮奶',
                        children:[
                            {
                                value: '选项2-1',
                                label: '双皮奶2-1'
                            },
                            {
                                value: '选项2-2',
                                label: '双皮奶2-2'
                            },
                        ]
                    }, {
                        value: '选项3',
                        label: '蚵仔煎',
                        children:[
                            {
                                value: '选项3-1',
                                label: '蚵仔煎3-1'
                            },
                            {
                                value: '选项3-2',
                                label: '蚵仔煎3-2'
                            },
                        ]
                    }, {
                        value: '选项4',
                        label: '龙须面'
                    }, {
                        value: '选项5',
                        label: '北京烤鸭'
                    }]
            }
        }
    },
    methods:{
        setresult(val){ //父组件获取子组件value
            this.select.result = val
        },
        setSelectC(data){ //设置二级菜单
            this.selectC.result =''
            this.selectC.data = data

            // 子菜单设置默认值
            if(this.selectC.data.length > 0){
                this.selectC.result = this.selectC.data[0].value
            } else {
                this.selectC.result =''
            }
        },
        setresultC(val){ //二级菜单获取value
            this.selectC.result = val
        },
    }
}
</script>
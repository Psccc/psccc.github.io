<template>
    <el-select v-model="val" filterable :placeholder="'请选择'+select.name" @change="change">
        <el-option
                v-for="item in select.data"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        name: "SelectComp",
        data() {
            return {

            }
        },
        computed:{
           val:{
                get() {
                    this.select.change && this.select.change(this.buildChild(this.select.selectResult))
                    return this.select.selectResult
                },
                set(){

                }
            }
        },
        props:{
            select:Object,
        },
        methods:{
            change(val){
                this.select.change&&this.select.change(this.buildChild(val));
                this.$emit('callback',val)
            },
            buildChild(val){
                let select_item = this.select.data.find(item=>{
                    return item.value==val
                })
                return select_item&&select_item.children
            }
        }
    }
</script>

<style scoped>

</style>
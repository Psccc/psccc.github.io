<template>
    <el-select v-model="value" placeholder="请选择" @change="change">
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
    name:'PscSelect',
    data() {
      return {

      }
    },
    computed:{
        value:{
            get(){
                if(this.select.name == 'parent'){
                    this.$emit('setSelectC', this.findC(this.select.result))
                }
                return this.select.result
            },
            set(){
                // return this.select.result
            }
        }
    },
    props:{
        select:Object,
    },
    methods:{
        change(value){
            this.$emit('setresult',value)
            this.$emit('setSelectC', this.findC(value))
        },
        findC(val){
            const dataC = this.select.data.find(item => {
                return item.value == val
            })
            if(dataC.children){
                return dataC.children
            } else {
                return []
            }
        }
    }
}
</script>
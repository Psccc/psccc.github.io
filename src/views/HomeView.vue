<template>
  <div class="home">
    <SelectTest></SelectTest>
    <PscSelectTest></PscSelectTest>
  </div>
</template>

<script>
// @ is an alias to /src
import SelectTest from '../components/select/SelectTest.vue'
import PscSelectTest from '../components/select/PscSelectTest.vue'

export default {
  name: 'HomeView',
  components:{
    SelectTest,
    PscSelectTest
  }
}
</script>

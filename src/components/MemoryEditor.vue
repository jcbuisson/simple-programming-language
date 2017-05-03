
<template>
   <titled-editor :title="'Memory'"></titled-editor>
</template>

<script>
import titled from '@/components/TitledEditor'

export default {
   components: { TitledEditor: titled },
   props: {
      title: String,
      //value: String,
   },
   data () {
      return {
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

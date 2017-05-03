
<template>
   <div>
      <b-alert show class="title"> {{ title }} </b-alert>
      <my-code-mirror v-model="code" :options="editorOptions"></my-code-mirror>
   </div>
</template>

<script>
import defaultInMyCodeMirror from '@/components/MyCodeMirror'

export default {
   components: { MyCodeMirror: defaultInMyCodeMirror },
   props: {
      title: String,
      //value: String,
   },
   data () {
      return {
         state: true,
         code: 'titled editor',
         editorOptions: {
            mode: this.mode,
            tabSize: 3,
            lineNumbers: true,
            firstLineNumber: 0,
            lineWrapping: true,
            extraKeys: {'Ctrl-Space': 'autocomplete'},
         }
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .title {
      margin-bottom: 0;
      padding-top: 6px;
      padding-bottom: 6px;
   }
</style>

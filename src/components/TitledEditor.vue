
<template>
   <div>

      <!--b-card v-bind:header="title" class="mb-2" no-block vv-bind:variant="variant">
         <code-mirror v-bind:value="currentcontent" v-bind:options="editorOptions" v-on:change="contentChanged"></code-mirror>
      </b-card-->

<div class="card no-block">

  <div class="card-header">
    <ul class="nav nav-navs card-header-navs">
      <div class="navbar-brand">{{ title }}</div>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Examples
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <div class="dropdown-item">Example 1</div>
          <div class="dropdown-item">Example 2</div>
          <div class="dropdown-item">Example 3</div>
        </div>
      </li>
    </ul>
  </div>
  <code-mirror v-bind:value="currentcontent" v-bind:options="editorOptions" v-on:change="contentChanged"></code-mirror>

</div>

   </div>
</template>

<script>
   import codemirror from '@/components/CodeMirror'

   export default {
      components: { CodeMirror: codemirror },
      props: {
         variant: String,
         title: String,
         initialcontent: String,
      },
      methods: {
         contentChanged: function(newContent) {
            console.log('currentcontent = ' + this.currentcontent)
            this.$emit('contentchanged', newContent)
         },
      },
      computed: {
         currentcontent: function() {
            return this.initialcontent
         }
      },
      data () {
         return {
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

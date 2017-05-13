<template>
  <div id="app">

    <b-navbar toggleable type="inverse" variant="success">
        <b-nav-toggle target="nav_collapse"></b-nav-toggle>
        <b-link class="navbar-brand" to="#">
           <span>Simple Programming Language</span>
           <span> <b-button v-on:click="setSandboxCurrent">sandbox</b-button> </span>
           <span> <b-button v-on:click="setTutorialCurrent">tutorial</b-button> </span>
           <span> <b-button v-on:click="setDocumentationCurrent">reference</b-button> </span>
        </b-link>
        <b-collapse is-nav id="nav_collapse">
            <b-nav is-nav-bar class="ml-auto">
                <b-nav-item v-bind:active="isSandboxCurrent" v-on:click="setSandboxCurrent">Sandbox</b-nav-item>
                <b-nav-item v-bind:active="isDocumentationCurrent" v-on:click="setDocumentationCurrent">Documentation</b-nav-item>
                <b-nav-item><a class="a" href="https://github.com/jcbuisson/simple-programming-language" target="_blank">Development</a></b-nav-item>
            </b-nav>
        </b-collapse>
    </b-navbar>

    <!--router-view></router-view-->
    <keep-alive>
       <component v-bind:is="currentView"></component>
    </keep-alive>

  </div>
</template>

<script>
   import sandbox from '@/components/Sandbox'
   import tutorial from '@/components/Tutorial'
   import documentation from '@/components/Documentation'

   export default {
      name: 'app',
      components: {
         Sandbox: sandbox,
         Tutorial: tutorial,
         Documentation: documentation,
      },
      data () {
         return {
            currentView: sandbox,
         }
      },
      mounted: function() {
         console.log('app mounted')
      },
      computed: {
         isSandboxCurrent: function() {
            return this.currentView === sandbox
         },
         isTutorialCurrent: function() {
            return this.currentView === tutorial
         },
         isDocumentationCurrent: function() {
            return this.currentView === documentation
         },
      },
      methods: {
         setSandboxCurrent: function() {
            this.currentView = sandbox
         },
         setTutorialCurrent: function() {
            this.currentView = tutorial
         },
         setDocumentationCurrent: function() {
            this.currentView = documentation
         },
      },
   }
</script>

<style>

html, body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  display: flex;
  flex-direction: column;  
  justify-content: flex-start;

  align-items: stretch;
  align-content: stretch;
}

.a {
  color: #aedcae;
}

.header {

}

.main {
  flex: 1;
}

</style>

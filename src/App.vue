<template>
   <div id="app">

      <b-navbar toggleable type="inverse" variant="success">
         <b-nav-toggle target="nav_collapse"></b-nav-toggle>
         <b-link class="navbar-brand" to="#">
            <span>Simple Programming Language</span>
         </b-link>
         <b-nav is-nav-bar class="ml-auto">
            <div class="btn-group">
               <button type="button" class="btn btn-success" v-bind:class="{ active: isSandboxCurrent }" v-on:click="setSandboxCurrent">Sandbox</button>
               <button type="button" class="btn btn-success" v-bind:class="{ active: isTutorialCurrent }" v-on:click="setTutorialCurrent">Tutorial</button>
               <button type="button" class="btn btn-success" v-bind:class="{ active: isReferenceCurrent }" v-on:click="setReferenceCurrent">Reference</button>
            </div>
         </b-nav>
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
   import reference from '@/components/Reference'

   export default {
      name: 'app',
      components: {
         Sandbox: sandbox,
         Tutorial: tutorial,
         Reference: reference,
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
         isReferenceCurrent: function() {
            return this.currentView === reference
         },
      },
      methods: {
         setSandboxCurrent: function() {
            this.currentView = sandbox
         },
         setTutorialCurrent: function() {
            this.currentView = tutorial
         },
         setReferenceCurrent: function() {
            this.currentView = reference
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

<template>
  <div id="app">

    <b-navbar toggleable type="inverse" variant="success">
        <b-nav-toggle target="nav_collapse"></b-nav-toggle>
        <b-link class="navbar-brand" to="#">
           <span>Simple Programming Language</span>
        </b-link>
        <b-collapse is-nav id="nav_collapse">
            <b-nav is-nav-bar class="ml-auto">
                <b-nav-item v-bind:active="mode === 'sandbox'" v-on:click="mode = 'sandbox'" href="#/">Sandbox</b-nav-item>
                <b-nav-item v-bind:active="mode === 'documentation'" v-on:click="mode = 'documentation'" href="#/documentation">Documentation</b-nav-item>
                <b-nav-item><a class="a" href="https://github.com/jcbuisson/simple-programming-language" target="_blank">Development</a></b-nav-item>
            </b-nav>
        </b-collapse>
    </b-navbar>

    <router-view></router-view>

  </div>
</template>

<script>
   export default {
      name: 'app',
      data () {
         return {
            mode: 'sandbox',
         }
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

<template>
  <div id="app">

    <b-navbar toggleable type="inverse" variant="success">

        <b-nav-toggle target="nav_collapse"></b-nav-toggle>

        <b-link class="navbar-brand" to="#">
           <span>Simple Programming Language {{ mode }}</span>
        </b-link>

        <b-collapse is-nav id="nav_collapse">
            <b-nav is-nav-bar class="ml-auto">
                <b-nav-item v-bind:active="mode === 'online'" v-on:click="mode = 'online'" href="#/online">Online version</b-nav-item>
                <b-nav-item v-bind:active="mode === 'documentation'" v-on:click="mode = 'documentation'" href="#/documentation">Documentation</b-nav-item>
                <b-nav-item v-bind:active="mode === 'development'" v-on:click="mode = 'development'" href="https://github.com/jcbuisson/">Development</b-nav-item>
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
            mode: 'online',
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
}

</style>

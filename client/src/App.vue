<template>
  <div id="app">
    <header-bar>
      <!-- <search-bar v-if="isPageList"/> -->
    </header-bar>
    <router-view/>
    <footer-bar/>
  </div>
</template>

<script>
  import HeaderBar from './components/HeaderBar.vue'
  import FooterBar from './components/FooterBar.vue'
  import SearchBar from './components/SearchBar.vue'

  export default {
    name: 'App',

    components: {
      HeaderBar,
      FooterBar, // https://vuejs.org/v2/guide/components-registration.html#Name-Casing ~ footer-bar, search-bar this take me so much time to figure it out. fuk it !
    },

    data () {
      return {
        title: 'Magano',
        menuVisible: false,
      }
    },

    computed: {
      isPageList () {
        return this.$route.name === 'page-list'
      }
    }

  }
</script>

<style type="scss">
  @import './assets/styles/index.css'
</style>
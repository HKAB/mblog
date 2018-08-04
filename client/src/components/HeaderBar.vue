<template>
    <div class="header">
    <md-toolbar md-elevation="1">
      <md-button v-on:click="$router.push({ name: 'page-list'})" class="md-icon-button"><img src="../assets/tea.svg" width="24px" height="24px"></md-button>
      <div style="flex: 1; font-size: 25px;">Papapa</div>
      <md-badge v-bind:md-content="author_notification.length">
        <md-button class="md-icon-button" @click="show = !show">
          <md-icon>notifications</md-icon>
        </md-button>
          <div class="notification">
    <transition name="fadeStart" v-cloak>
      <div v-if="show" class="tooltip">
        <div id="heading">
          <div class="heading-left">
            <h6 class="heading-title">Notifications</h6>
          </div>
          <div class="heading-right">
            <a class="notification-link" href="#">See all</a>
          </div>
        </div>
        <ul class="notification-list">
          <li class="notification-item" v-for="author in author_notification">
            <div class="img-left">
              <img class="user-photo" alt="User Photo" :src="getImgUrl(author.picture)" />
            </div>
            <div class="user-content">
              <p class="user-info"><span class="name">{{ author.name }}</span> added a post.</p>
              <p class="time">x hour ago</p>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
      </md-badge>
              <md-button class="md-icon-button">
          <md-icon>perm_contact_calendar</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="showSidepanel = true">
          <md-icon>menu</md-icon>
        </md-button>
    </md-toolbar>
    <md-drawer class="md-right" :md-active.sync="showSidepanel">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Favourites <md-icon style="color: #e74c3c;">favorite</md-icon></span>
      </md-toolbar>

      <md-list>
    <md-empty-state v-if="this.$store.state.savePosts.length == 0"
    class="md-primary"

      md-icon="sentiment_satisfied"
      md-label="You don't have a favorite post yet!"
      md-description="But i bet you can find one.">
    </md-empty-state>
    <ul class="save-post-list">
    <!-- <div v-for="list in $store.state.savePosts" :key="list._id"> -->
      <li class="save-list" v-for="saveList in $store.state.savePosts" :key="saveList._id">
        <div class="media-unit">
            <md-avatar class="md-avatar-icon md-large">
                <img alt="User Photo" :src="getImgUrl(saveList.author.replace('.', ''))" />
            </md-avatar>
            <div class="details-unit">
              <router-link style="text-decoration: none;color: #2c3e50;" :to="{name: 'page-post', params: { id: saveList._id}} "><b>{{ saveList.title }}</b></router-link>
              <button class="remove-save-post" v-bind:id="saveList._id" @click="removeSavePost(saveList._id)"><b>x</b></button>
                
              <span class="sub-text"><i>{{ saveList.author }}</i></span>
            </div><!-- ./details-unit -->
          </div><!-- ./media-unit -->
      </li>
    <!-- </div> -->
  </ul>
      </md-list>
    </md-drawer>
  </div>
</template>

<script>
  export default {
    name: 'Temporary',
    data () {
      return {
        showSidepanel: false,
        author_notification: [
          {
              "name": "Mr.Robot",
              "picture": "MrRobot",
          },
          {
              "name": "Mr.Coconut",
              "picture": "MrCoconut",
          }
        ],
        show: false,
      }
    },
    methods: {
      getImgUrl(pet) {
        var images = require.context('../assets/', false, /\.png$/)
        return images('./' + pet + ".png")
    },
      removeSavePost(id) {
        var pos = 0;
        this.$store.state.savePosts.forEach(function (item, index) {
          if (item._id == id) {pos = index}
        })
        this.$store.commit('removePost', pos)
      },

    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/headerBar.scss'
</style>
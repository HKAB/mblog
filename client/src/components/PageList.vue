<template>
  <div class="main">
   <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <div class="list-tag" @click="showAlertSnackbar = !showAlertSnackbar">
         <md-list v-if="!loading" class="tags md-scrollbar md-elevation-1">
          <md-list-item v-for="tag in tags">
            <span class="tag">{{ tag }}</span>
          </md-list-item>
         </md-list>
         </div>
      </div>
      <div class="md-layout-item">
         <div v-if="lists.length === 0 && !loading" class="no-content">
           <md-empty-state
              md-icon="mood_bad"
              md-label="Opps! something gone wrong.">
            </md-empty-state>
         </div>
         <div v-else-if="lists.length > 0"  class="md-layout">
            <div class="md-layout-item">
               <center>
                  <md-button class="md-icon-button button-track">
                     <md-icon>today</md-icon>
                     <md-tooltip md-direction="right">Feed</md-tooltip>
                  </md-button>
               </center>
            </div>
            <div class="md-layout-item">
               <center>
                  <md-button class="md-icon-button button-track">
                     <md-icon>trending_up</md-icon>
                     <md-tooltip md-direction="right">Trend</md-tooltip>
                  </md-button>
               </center>
            </div>
            <div class="md-layout-item">
               <center>
                  <md-button class="md-icon-button button-track">
                     <md-icon>brightness_5</md-icon>
                     <md-tooltip md-direction="right">Hot</md-tooltip>
                  </md-button>
               </center>
            </div>
         </div>
         <div class="content" v-for="list in lists" :key="list._id">
            <md-card>
               <md-card-media md-ratio="16:9">
                  <img src="../assets/card.jpeg" alt="card-name">
               </md-card-media>
               <md-card-header>
                  <md-card-header-text>
                    <router-link style="text-decoration: none;" class="md-title" :to="{name: 'page-post', params: { id: list._id}} " v-html="emojiConvert(list.title)"></router-link>
                     <div>
                        <div class="md-subhead">
                          <md-icon>face</md-icon> {{ list.author }} ・
                           {{ moment(list.created_time).fromNow() }}
                        </div>      
                     </div>
                     <span v-for="tag in list.tags" class="post-tag">{{ tag }}</span>
                             <md-button @click="savePost(list)" v-bind:id = "list._id"  class="md-icon-button" style="float: right;">
            <md-icon>turned_in</md-icon>
        </md-button>


                  </md-card-header-text>
               </md-card-header>
            </md-card>
            <br>
         </div>
         <infinite-loading @infinite="infiniteHandler">
           <span slot="no-more">
                  There is no more posts <md-icon>sync_disabled</md-icon>
           </span>
         </infinite-loading>
<!--          <md-button @click="loadMorePost()">
                     Load more...
                  </md-button> -->
      </div>
      <div class="md-layout-item">
        <div class="top-post" v-if="!loading" @click="showAlertSnackbar = !showAlertSnackbar">
      	<div style="margin-top: 50px;"><md-icon>filter_1</md-icon> <span>POST OF THE WEEK</span></div>
             <md-card class="hot-trend">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">How to make a blog ?</div>
          <div class="md-subhead">By Mr.Robot</div>
          </md-card-header-text>
                </md-card-header>
   <div class="survey">
                           <div class="survey-progress">
                           <span class="survey-progress-bg">
                           <span class="survey-progress-fg" style="width: 88%;"></span>
                           </span>
                           <span class="survey-progress-labels">
                           <span class="survey-progress-label">
                           88%
                           </span>
                           <span class="survey-completes">
                           490 / 500
                           </span>
                           </span>
                           <md-button class="md-icon-button" style="margin-top: -10px;">
            <md-icon>turned_in</md-icon>
          </md-button>
                           </div>
                        </div>
    </md-card>
      </div>
      <md-snackbar md-position="left" :md-duration="2000" :md-active.sync="showFailSnackbar" md-persistent>
      <span>Duplicate save post</span>
      <md-button class="md-primary" @click="showFailSnackbar = false"><md-icon style="color: #f1c40f;">warning</md-icon></md-button>
    </md-snackbar>
    <md-snackbar md-position="left" :md-duration="2000" :md-active.sync="showSuccessSnackbar" md-persistent>
      <span>Saved successfully!</span>
      <md-button class="md-primary" @click="showSuccessSnackbar = false"><md-icon style="color: #44bd32;">done</md-icon></md-button>
    </md-snackbar>
    <md-snackbar md-position="left" :md-duration="4000" :md-active.sync="showAlertSnackbar" md-persistent>
      <span>It's just a fake! We haven't make this feature.</span>
      <md-button class="md-primary" @click="showAlertSnackbar = false"><md-icon style="color: #e84118;">priority_high</md-icon></md-button>
    </md-snackbar>
    </div>
   </div>
   </div>
</template>
<script>
    import postsService from '../services/postsService'
    import emojione from 'emojione'
    import InfiniteLoading from 'vue-infinite-loading';
       
       export default {
       
           data() {
                   return {
                       tags: [
                        "#vuejs",
                        "#python",
                        "#C++",
                        "#Github",
                        "#javascript"],
                       lists: [],
                       loading: true,
                       toggleCard: false,
                       showSuccessSnackbar: false,
                       showFailSnackbar: false,
                       showAlertSnackbar: false,
                       totalPost: 0,
                   }
               },
       
               watch: {
                   '$route': 'loadList'
               },
       
               async mounted() {
                   // window.document.title = conf.blogTitle
                   this.loadList()
                   // this.scroll(this.lists, this.totalPost)
               },
       
               methods: {
                   async loadList() {
                       this.loading = true
                       this.lists = (await postsService.getListPost(this.totalPost)).posts
                       this.loading = false
                   },
                    toggle () {
        				        this.toggleCard = !this.toggleCard
      				      },
                    emojiConvert(data) {
                      return emojione.toImage(data)
                    },
      				savePost (list) {
                if (this.$store.getters.getSavePostById(list._id) == undefined) {
      				    this.$store.commit('addPost', list)
                  this.showSuccessSnackbar = true
                }
                else{
                  this.showFailSnackbar = true
                }
      				},
              async infiniteHandler($state) {
                this.totalPost = this.totalPost + 2
                var newsPosts = (await postsService.getListPost(this.totalPost)).posts
                if (newsPosts.length != 0) {
                  this.lists = this.lists.concat(newsPosts) // joint two array
                  console.log(this.lists)
                  $state.loaded()
                }
                else {
                  $state.complete()
                }
                
              },
              
              },
              components: {
                InfiniteLoading,
              },
       }
</script>
<style lang="scss" scoped>
      .post-tag {
        margin-right: 10px;
        color: white;
        background: tomato;
        padding-right: 5px;
        padding-left: 5px;
        font-size: 10px;
        border-radius: 5px;
        margin-top: 10px;
        display: inline-block;
      }
      .main {
        padding-bottom: 60px;
      }
      .loading {
        margin-top: 100px;
        margin-left: 50%;
      }

      .tag {
        color: #353b48;
      }
     .md-card {
         width: 600px;
         max-height: 600px;
         height: auto;
         margin: 5px;
         vertical-align: top;
         word-break: normal;
         display: block;
    }
    
    
     .tags {
         margin-left: 40px;
         margin-top: 55px;
         border: #C0C0C0 1px solid;
         background-color: #f5f6fa;
    }
     .button-track {
         margin-top: 10px;
    }
     .md-progress-bar {
         width: 100px;
    }
    
    .md-card-content {
    }
    
     $theme-color: #8DC63F;
    .survey {
    	 border-top: 1px solid #eee;
    }
     .survey-progress {
        display: block;
        height: 50px;
        width: 310px;
        padding : 15px;
    }
    
     .survey-progress-label {
         vertical-align: middle;
         margin: 0 10px;
         color: $theme-color;
    }
     .survey-progress-bg {
         display: inline-block;
         vertical-align: middle;
         position: relative;
         width: 100px;
         height: 4px;
         border-radius: 2px;
         overflow: hidden;
         background: #eee;
    }
    .survey-progress-fg {
         position: absolute;
         top: 0;
         bottom: 0;
         height: 100%;
         left: 0;
         margin: 0;
         background: $theme-color;
    }
    
    .hot-trend {
         width: 300px;
         vertical-align: top;
         word-break: normal;
     }
</style>
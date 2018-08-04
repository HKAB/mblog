<template>
  <div class="main">
  <div class="md-layout">
    <div class="md-layout-item md-size-15">
      <div class="love-button">
        <md-tooltip md-direction="top">15 people like this</md-tooltip>
        <span class="love-button-content"><b>❤</b></span>
      </div>
    </div>
    <div class="md-layout-item md-size-70">
      <md-card>
        <md-card-media>
                  <img src="../assets/card.jpeg" alt="card-name">
        </md-card-media>
        <md-card-header>
          <div class="md-title" v-html="emojiConvert(title)"></div>
                        <div class="md-subhead">
                          <md-icon>face</md-icon>{{ author }}
                           <md-icon>access_time</md-icon>
                           {{ moment(created_time).fromNow() }}
                        </div>
        </md-card-header>
        <md-card-content>
          <article
       v-if="content"
      v-html="htmlFromMarkdown" />
                    <md-card-actions>
      </md-card-actions>
        <div class="heading">COMMENTS</div>
        <div class="comment-content" style="margin-left: 50px; margin-right: 50px;margin-top: 20px;">
          <md-field>
            <md-icon>textsms</md-icon>
            <label>Your comments. Just 20 words :)</label>
            <md-input id="comment-text"></md-input>
            <md-button class="md-icon-button" @click="addComment()">
              <md-icon>send</md-icon>
            </md-button>
          </md-field>
          <ul class="comment-stream">
            <li class="comment" v-for="comment in comments" v-html="commentHtmlConvert(comment)">
            </li>
          </ul>
        </div>
    </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-size-15"></div>
  </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import postsService from '../services/postsService'
  import emojione from 'emojione'
  import marked from '../utils/render.js'

  export default {

    data () {
      return {
        title: '',
        created_time: null,
        content: '',
        author: '',
        comments: [
          {
            "owner": 'Mr.Coconut',
            "content": 'Lovely post :sparkling_heart:'
          },
          {
            "owner": 'Mr.Robot',
            "content": 'thanks man :smile:'
          }
        ]
      }
    },

    computed: {
      htmlFromMarkdown () {
        return marked(emojione.toImage(this.content))
      },
    },

    watch: { // htmlFromMarkdown is expression and newTab is a callback func
      'htmlFromMarkdown': 'newTab',
      '$route' (to, from) {
          this.loadPost()
      }, // when user change param, we reload content
        // https://router.vuejs.org/guide/essentials/ dynamic-matching.html#reacting-to-params-changes
    },

    created () {
      this.loadPost()
    },

    methods: {
      async loadPost () {
        const response = (await postsService.getPost(this.$route.params.id))
        this.title = response.title
        this.created_time = response.created_time
        this.author = response.author
        this.content = response.content
        console.log(response)
        // window.document.title = this.title
      },
      emojiConvert(data) {
        return emojione.toImage(data)
      },

      newTab () {
        Vue.nextTick(function () { // use when data is update but DOM haven't update yet
          // Load the external link into new tab
          const linksArray = [...document.querySelectorAll('a')]// https://viblo.asia/p/three-dots-da-thay-doi-javascript-nhu-the-nao-QpmlenBr5rd ~ nice article about spread sytax
          const currentHost = window.location.host
          linksArray.forEach(el => {
            if (el.href && el.host !== currentHost) {
              el.target = '_blank'
              // https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
              //https://mathiasbynens.github.io/rel-noopener more detail in here
              el.rel = 'noopener noreferrer'
            }
          })

        })
      },
      commentHtmlConvert(comment) {
        return emojione.toImage("<b>" + comment.owner + "</b>" + ": " + comment.content)
      },
      addComment() {
        this.comments.unshift({'owner': 'You', 'content': document.getElementById('comment-text').value})
      }
    }
  }
</script>

<style type="text/css">
.main {
  padding-bottom: 70px;
}
.love-button:hover {
  background: #ff3838;
  color: white;
  border: 1px solid #ff3838;
}

.love-button {
  display: inline-block;
  border: 1px solid #b2bec3;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  color: #ff3838;
  width: 50px;
  height: 50px;
  margin-top: 150px;
  margin-left: 70px;
  position: fixed;
}

.love-button-content {
  -moz-user-select: none;
  -webkit-user-select: none;
  font-size: 30px;
  position: relative;
  top: 15px;
}

b {
  top: 100px;
}

.md-card {
  margin-top: 20px;
}

.heading {
    color: dodgerblue;
    border-left: 4px solid dodgerblue;
    line-height: 1;
    padding-left: 12px;
}

.comment-stream {
    list-style: none;
    padding: 0;
    margin-top: 40px;
  }
.comment {
      font-size: 15px;
      padding-left: 10px;
      border-left: 3px solid #4a4a4a;
      margin-bottom: 25px;
    }
</style>
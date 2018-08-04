<template>
  <div class="editor">
    <md-field :class="messageClass">
      <label>Textarea</label>
      <md-textarea v-model="input">## Introduce myself</md-textarea>
    </md-field>
  <div v-html="htmlFromMarkdown"></div>
  </div>
</template>

<script>
	import emojione from 'emojione'
  	import marked from '../utils/render.js'

	export default {

    data () {
      return {
      	input: ''
      }
    },
    computed: {
      htmlFromMarkdown () {
        return marked(emojione.toImage(this.input))
      },
    },
  }
</script>

<style type="text/css">
</style>
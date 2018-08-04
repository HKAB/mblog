<template>
  <footer>
    <div class="footer-container">
      <!-- <span class="info-author" @click="">Author</span> -->
      <md-button class="md-icon-button" @click="showDialog = !showDialog">
          <md-icon class="improve">local_florist</md-icon>
      </md-button>
      <span class="info-owner">Make with <md-icon style="color: #e74c3c;">favorite</md-icon> by hkab</span>
    </div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Will do to improve this project <md-icon class="improve_tree">nature_people</md-icon></md-dialog-title>
      <md-dialog-content>
        <ul>
          <li>Make <b>admin dashboard</b>.</li>
          <li>Make <b>comment section</b> less simple.</li>
          <li><b>Login</b>.</li>
          <li>Algorithm to <b>fetch hot post, trending post</b>.</li>
          <li><b>Search bar</b>.</li>
          <li>etc.</li>
        </ul>
      </md-dialog-content>
    </md-dialog>
  </footer>
</template>

<script>
  export default {
    data () {
      return {
        showDialog: false,
        thisYear: new Date().getFullYear()
      }
    }
  }
</script>

<style type="text/css" scoped>
  footer {
    height: 60px;
    background: #ecf0f1;
    position:absolute;
    bottom:0;
    width:100%;
  }
  .footer-container {
    margin-top: 20px;
    position: absolute;
    color: #636e72;
    width: 100%;
  }
  .info-owner {
    float: right;
    margin-right: 10px;
  }
  .md-button {
    margin-top: -10px;
  }
  .md-button .improve:hover {
    color: #44bd32;
  }
  .md-dialog {
    width: 500px;
  }

  .improve_tree {
    margin-top: -5px;
  }
</style>

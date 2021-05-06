<template>
  <div class="flex h-screen pt-0">
    <video class="video-js w-screen h-screen" controls preload='auto' id="video" autoplay type="video/webm; codecs=vp9,vorbis" ></video>
  </div>
</template>

<style>
</style>


<script>
import axios from 'axios'
import Hls from 'hls.js'
export default {
  name: 'livestream',
  data: function () {
    return {
    }
  },
  mounted(){
    var video = document.getElementById('video');
    video.src = 'http://yourdns.vodiptv.org:83/movie/gurudev/stbapp125/'+this.$route.params.id;
          video.addEventListener('loadedmetadata',function() {
            video.play();
          });
  }
}
</script>

<template>
    <div class="w-full h-full" id="scrollbar-1">
      <div class="flex flex-col md:flex-row lg:flex-row xl:flex-row">
      <div class="top-sticky sticky top-0 md:w-3/6 lg:w-3/6 xl:w-3/6 md:order-1 lg:order-1 xl:order-1">
        <div class="flex flex-col sticky top-0">
          <vue-plyr><video class="video bg-black"  id="video" controls crossorigin></video></vue-plyr>
          <div class="bg-gray-400 flex flex-row justify-between items-center py-4 px-2 font-semibold">
            <h4>{{this.categories[selectedIndex].category_name}}</h4>
            <button class="bg-green-500 py-2 px-4 text-sm font-semibold text-gray-100 shadow rounded" @click="showCategories=!showCategories">Change Category</button>
          </div>
          <div class="bg-gray-100 p-3" v-show="epg.length!=0">
            <h4 class="font-bold pb-2 pt-1">EPG Listings</h4>
            <ul class="list-none">
              <li v-for="(item,index) in epg">
                {{item.start.split(" ")[1]}} - {{decodeBase64(item.title)}}
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="flex-1 md:w-3/6 lg:w-3/6 xl:w-3/6 md:order-2 lg:order-2 xl:order-2 mt-2">
        <div id="scrollbar-1" class="flex flex-col md:fixed md:top-0 md:bottom-0 md:mt-16 lg:fixed lg:top-0 lg:bottom-0 lg:mt-16 xl:fixed xl:top-0 xl:bottom-0 xl:mt-16 overflow-y-auto w-full">
          <input v-model="search" type="text" class="m-1 block appearance-none  bg-white border border-grey-light hover:border-grey px-2 py-2 shadow" placeholder="Enter search term">
          <ul class="" >
            <li class="stream-channel-list-item flex flex-row flex-wrap items-center" v-for="(stream,index) in filteredItems()" v-on:click="changeStream(index,stream.stream_id)">
              <img class="w-12 h-8 rounded bg-gray-300" v-bind:src="stream.stream_icon"><a class="text-sm text-gray-900 pl-2">{{stream.name}}</a>
            </li>
          </ul>
        </div>
        
      </div>
      <div class="side-nav flex flex-shrink-0 flex-grow-none overflow-x-hidden" id="scrollbar-1" :style="{width: showCategories?'320px':'0%'}">
        <ul class="list-none flex-shrink-0 flex-grow-none" id="scrollbar-1">
          <li v-for="(category,index) in categories" v-on:click="changeCategory(index,category.category_id)">
            <div class="stream-category-list-item" v-bind:class="{'selected':isSelected(index)}">
              {{category.category_name}}
              
            </div>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="w-full h-full absolute top-0 bottom-0 bg-gray-900 z-10 opacity-50 " style="z-index:99;" v-bind:class="{'hidden':!showCategories}" @click="showCategories=!showCategories">

    </div>

    </div>
</template>

<style>
  .stream-card{
    transform: scale(1.0);
    transition: transform 0.5s ease;
  }
  .stream-card:hover{
    transform: scale(1.1);
    transition: transform 0.5s ease;
  
  }
  .side-nav{
    transition: 0.3s;
    @apply h-full w-0 fixed  top-0 left-0 bottom-0 bg-gray-900 overflow-y-scroll shadow;
    z-index: 100;
   
  }
  
  .stream-category-list-item{
    @apply text-sm py-2 px-6 font-normal  bg-transparent text-gray-600 ;
    transition: 0.3s;
  }

  .stream-category-list-item:hover{
    @apply bg-red-200 ;
  }
  .stream-category-list-item.selected{
    @apply bg-red-200 font-semibold text-red-500;
  }
  .stream-channel-list-item{
    @apply text-sm py-2 pl-2  font-normal  bg-gray-100 text-gray-600 mx-1 shadow;
    margin-bottom: 1px;
    
    transition: 0.3s;
  }
  
  .stream-channel-list-item:hover{
    @apply bg-red-200 ;
  }
  .stream-channel-list-item.selected{
    @apply bg-red-200 font-semibold text-red-500 shadow-inner shadow-outline rounded-none;
  }
  .video-container {
    /* width is set as 100% here. any width can be specified as per requirement */
    width: 100%;
    padding-top: 56.25%;
    height: 0px;
    position: relative;
}

.video {
    width: 100%;
    min-width: 100%;
    height: auto;
    position: sticky;
    top: 0;
    left: 0;
}
.top-sticky{
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -ms-sticky;
  position: -o-sticky;
  top: 0;
}
</style>


<script>
import axios from 'axios'
import Hls from 'hls.js'
import { Base64 } from 'js-base64';

export default {
  name: 'livetv',
  data: function () {
    return {
      categories: [],
      streams:[],
      selectedIndex:0,
      streamSelectedIndex:0,
      showCategories:false,
      search:'',
      epg:[]
    }
  },
  methods:{
    isSelected(index){
      return index== this.selectedIndex
    },
    isStreamSelected(index){
      return index== this.streamSelectedIndex
    },
    filteredItems() {
      return this.streams.filter(item => {
         return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      })
    },
    changeCategory(index,categoryID){
      if(this.selectedIndex != index){
        this.selectedIndex = index
        this.getStreams(categoryID)
        
      }
      this.showCategories = false
    },
    decodeBase64(encodedString){
      return Base64.decode(encodedString)
    },
    changeStream(index,streamID){
      if(this.streamSelectedIndex != index){
        this.streamSelectedIndex = index
      }
      
      this.playStream(this.streams[index])
    },
    playStream(stream){
      this.epg = []
      this.getShortEPG(stream.stream_id)
      var video = document.getElementById('video');
      var secureUrl = "http://tanmedia.watch:8880";
      var convertedUrl = md5(secureUrl);
      if(Hls.isSupported()) {
          var hls = new Hls();
          console.log(convertedUrl);          
          hls.loadSource(convertedUrl+'/live/'+localStorage.getItem('userName')+'/'+localStorage.getItem('password')+'/'+stream.stream_id+'.m3u8');
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED,function() {
            video.play();
        });
      }else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'http://tanmedia.watch:8880/live/'+localStorage.getItem('userName')+'/'+localStorage.getItem('password')+'/'+stream.stream_id+'.m3u8';
        video.addEventListener('loadedmetadata',function() {
          video.play();
        });
      }
    },
    getShortEPG(id){
      axios.get('http://tanmedia.watch:8880/player_api.php?username='+localStorage.getItem('userName')+'&password='+localStorage.getItem('password')+'&action=get_short_epg&stream_id='+id)
      .then(response => {
        console.log(response.data.epg_listings)
        this.epg = response.data.epg_listings
      })
      .catch(err => {
        console.log(err)
      })
    }
    ,
    getStreams(categoryID){
      axios.get('http://tanmedia.watch:8880/player_api.php?username='+localStorage.getItem('userName')+'&password='+localStorage.getItem('password')+'&action=get_live_streams&category_id='+categoryID)
      .then(response => {
        console.log(response)
        this.streams = response.data
        this.streamSelectedIndex = 0
        this.playStream(this.streams[0])
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    axios.get('http://tanmedia.watch:8880/player_api.php?username='+localStorage.getItem('userName')+'&password='+localStorage.getItem('password')+'&action=get_live_categories')
      .then(response => {
        console.log(response)
        this.categories = response.data
        this.getStreams(this.categories[0].category_id)
      })
      .catch(err => {
        console.log(err)
      })
  },
  mounted(){
    
  }
}
</script>

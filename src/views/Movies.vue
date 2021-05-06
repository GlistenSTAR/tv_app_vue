<template>
  <div class="flex w-full h-full pt-0">
    
    <div class="flex-1 flex flex-col flex-wrap px-4 py-4 ">
        <div class="flex-1 bg-gray-400 flex flex-row justify-between items-center py-4 px-2 font-semibold">
            <h4>{{this.categories[selectedIndex].category_name}}</h4>
            <button class="bg-green-500 py-2 px-4 text-sm font-semibold text-gray-100 shadow rounded" @click="showCategories=!showCategories">Change Category</button>
        </div>
        <div class="flex-1 flex flex-wrap">
          <div v-for="(movie,index) in movies" v-on:click="playStream(movie)" class="my-6 px-2    sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/6 cursor-pointer">
          
            <div class="movie-card max-w-sm h-48 rounded shadow overflow-hidden m-2 .bg-no-repeat" v-bind:style="{ 'background-repeat': 'no-repeat', 'background-image': 'url('+movie.stream_icon+')'}">
              <div class="h-48 px-2 py-2" style="background: rgb(255,255,255);background: linear-gradient(360deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.70155812324929976) 35%, rgba(255,255,255,0) 100%);">
                <div class="mt-40 px-2 font-semibold  mb-1 text-sm ">{{movie.name}}</div>
              </div>
            </div>
            
          </div>
        </div>
    </div>
    <div class="side-nav flex flex-shrink-0 flex-grow-none overflow-x-hidden overflow-y-scroll" id="scrollbar-1" :style="{width: showCategories?'320px':'0%'}">
        <ul class="list-none flex-shrink-0 flex-grow-none" id="scrollbar-1">
          <li v-for="(category,index) in categories" v-on:click="changeCategory(index,category.category_id)">
            <div class="stream-category-list-item" v-bind:class="{'selected':isSelected(index)}">
              {{category.category_name}}
              
            </div>
          </li>
        </ul>
      </div>
    <div class="w-full h-full absolute top-0 bottom-0 bg-gray-900 z-10 opacity-50" style="z-index:99;" v-bind:class="{'hidden':!showCategories}" @click="showCategories=!showCategories">

    </div>
  </div>
</template>

<style>
  .movie-card{
    transform: scale(1.0);
    transition: transform 0.5s ease;
  }
  .movie-card:hover{
    transform: scale(1.1);
    transition: transform 0.5s ease;
  
  }
  .side-nav{
    transition: 0.3s;
    @apply h-full w-0 fixed  top-0 left-0 bottom-0 bg-gray-900 overflow-y-scroll shadow;
    z-index: 100;
   
  }
  .movie-category-list-item{
    @apply text-sm py-2 px-6 font-normal  bg-transparent text-gray-600 ;
    transition: 0.3s;
  }
  .movie-category-list-item:hover{
    @apply bg-red-200 font-semibold;
  }
  .movie-category-list-item.selected{
    @apply bg-red-200 font-semibold text-red-500;
  }
</style>


<script>
import axios from 'axios'
import Hls from 'hls.js';

export default {
  name: 'movies',
  data: function () {
    return {
      categories: [],
      movies:[],
      selectedIndex:0,
      showCategories:false,
    }
  },
  methods:{
    isSelected(index){
      return index== this.selectedIndex
    },
    changeCategory(index,categoryID){
      if(this.selectedIndex != index){
        this.selectedIndex = index
        this.movies = []
        this.getMovies(categoryID)
      }
      this.showCategories = false
    },
    playStream(movie){
      this.$router.push({ path: 'movie/'+movie.stream_id+"."+movie.container_extension })
    },
    getMovies(categoryID){
      axios.get('http://yourdns.vodiptv.org:83/player_api.php?username='+localStorage.getItem('userName')+'&password='+localStorage.getItem('password')+'&action=get_vod_streams&category_id='+categoryID)
      .then(response => {
        console.log(response)
        this.movies = response.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    axios.get('http://yourdns.vodiptv.org:83/player_api.php?username='+localStorage.getItem('userName')+'&password='+localStorage.getItem('password')+'&action=get_vod_categories')
      .then(response => {
        console.log(response)
        this.categories = response.data
        this.getMovies(this.categories[0].category_id)
      })
      .catch(err => {
        console.log(err)
      })
    
  }
}
</script>

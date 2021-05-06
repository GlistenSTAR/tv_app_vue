<template>
  <div class="container mx-auto h-full flex justify-center items-center">
     <div class=" md:2/3 lg:1/3 xl:w-1/3">
            <h1 class="text-lg font-bold mb-6 text-center">Login </h1>
            <div class="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
                <div class="mb-4">
                    <label class="font-bold text-grey-darker block mb-2">Username or Email</label>
                    <input v-model="username" type="text" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Username">
                </div>

                <div class="mb-4">
                    <label class="font-bold text-grey-darker block mb-2">Password</label>
                    <input v-model="password" type="password" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Password">
                </div>

                <div class="flex items-center justify-between">
                    <button @click="doLogin()" class="flex-1 bg-teal-500  mt-2 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded">
                        Login
                    </button>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  name: 'login',
  components: {
    
  },
  data:function(){
      return {
          username:"",
          password:""
      }
  },
  methods:{
      doLogin(){
          Axios.get('http://tanmedia.watch:8880/player_api.php?username='+this.username+'&password='+this.password).then(response=>{
              if(response.status == 200 && response.data.user_info.auth == 1){
                  localStorage.setItem("isLoggedIn",true)
                  localStorage.setItem("userName",this.username)
                  localStorage.setItem("password",this.password)
                  this.$router.push("/")
              }else{
                  alert("invalid credentials")
              }
          }).catch(err=>{
              alert("invalid credentials")
          })
      }
  }
}
</script>

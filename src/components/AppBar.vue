<template>
  <div class="topbar w-full bg-white shadow mb-1 lg:sticky xl:sticky top-0 z-30">
	<div class="flex flex-col lg:flex-row xl:flex-row md:flex-row  flex-wrap overflow-x-hidden">
		<div class="flex-1 py-4 px-4">
			<img src="../assets/images/supa_tv_logo.png" alt=""/>
		</div>
		<div class="flex-1">
			<nav class="flex md:justify-center lg:justify-center xl:justify-center">
				<router-link to="/" active-class="selected" class="nav-item lg:px-6 xl:px-6  lg:pt-4 xl:pt-4 md:pt-4" exact><i class="fa fa-television pr-1"></i> LiveTv</router-link>
				<router-link to="/movies" exact active-class="selected" class="nav-item lg:px-6 xl:px-6  lg:pt-4 xl:pt-4 md:pt-4"><i class="fa fa-film pr-1"></i> Movies</router-link>
				<router-link to="/series" active-class="selected" class="nav-item  lg:pt-4 lg:px-6 xl:px-6 xl:pt-4 md:pt-4"><i class="fa fa-video-camera pr-1"></i> Series</router-link>
				<router-link to="/settings" active-class="selected" class="nav-item  lg:pt-4 lg:px-6 xl:px-6 xl:pt-4 md:pt-4"><i class="fa fa-cog pr-1"></i> Settings</router-link>
			</nav>
		</div>
		
	</div>
</div>
</template>
<style>
	.nav-item {
		@apply text-sm font-semibold text-gray-800 border-b-4 border-solid border-transparent px-4 pb-4 pt-2 ;
		
	}
	.nav-item:hover{
		@apply text-red-500 border-red-500;
	}
	.nav-item.selected{
		@apply text-red-600 border-red-600;
	}
</style>

<script>

export default {
  name: 'AppBar',
}
</script>

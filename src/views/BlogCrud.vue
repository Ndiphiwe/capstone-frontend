<template>
  <div class="shape">
     <div class="container">
		 <div class="row row-cols-1 row-cols-md-3 g-4">
				<div class="card pt-3"  v-for='product of products' :key="product.id">
				<img :src="product.image" class="card-img-top" alt="product.image">
				<div class="card-body">
				<h5 class="card-title">{{product.title}}</h5>
				<p class="card-text">{{product.description}}</p>
				</div>
				<div class="card-footer">
				<h3>R{{product.price}}</h3>
				</div>
			</div>
			</div>
  		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
<template>
  <div class="mx-auto p-2 bg-red-400">
    <h1>Hello World!</h1>
  </div>
</template>

<script setup lang="ts">
const name = (params:any) => {
  console.log('params', params);
  return 'Hello ' + params.name;
}

function test(params:type) {

}
</script>

<style scoped></style>

<template>
  <div class="container">
    <h1>Hello World</h1>
    <p>Mi primer proyecto con Nuxt 3</p>
  </div>
</template>

<script setup>
// Proyecto 1 - Hello World con Nuxt 3
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #0f172a;
  color: #f8fafc;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #22d3ee, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

p {
  font-size: 1.25rem;
  color: #94a3b8;
}
</style>

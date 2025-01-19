<!-- src/components/AppNavbar.vue -->

<template>
  <header>
    <h1 class="logo">Mush.io</h1>
  </header>
</template>

<style scoped>
header {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

header h1 {
  font-size: 3rem;
  margin: 0;
  cursor: pointer; /* Show a pointer cursor when hovering */
  transition: color 0.3s ease; /* Smooth transition for the color change */
}

header h1:hover {
  color: #007bff; /* Light blue color on hover */
}
</style>

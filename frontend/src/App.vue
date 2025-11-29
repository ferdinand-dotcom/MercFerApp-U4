<template>
  <div>
    <h1>FERMASKOT</h1>

    <nav>
      <a href="/">Home</a> |
      <a href="/about">About</a> |
      <a href="/cart">Carrito</a>
    </nav>

    <router-view />
  </div>
</template>

<style>
nav a {
  margin-right: 15px;
}
</style>

window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {  // Cuando el usuario baja más de 50px
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const gridItems = document.querySelectorAll(".grid-item");

  gridItems.forEach(item => {
    const video = item.querySelector("video");
    const img = item.querySelector("img");

    // Al entrar el mouse: ocultamos imagen, mostramos video, y reproducimos
    item.addEventListener("mouseenter", () => {
      img.style.display = "none";
      video.style.display = "block";
      video.play();
    });

    // Al salir el mouse: pausamos y reseteamos el video, volvemos a mostrar la imagen
    item.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
      video.style.display = "none";
      img.style.display = "block";
    });
  });

  const circle = document.getElementById('circle');
  const nextSection = document.getElementById('next-section');
  
  // Función para actualizar el círculo al hacer scroll
  function updateCircle() {
      // Obtener la posición y dimensiones de la sección next-section
      const nextSectionRect = nextSection.getBoundingClientRect();
      const nextSectionTop = nextSectionRect.top + window.scrollY;
      
      // Altura de la ventana del navegador
      const windowHeight = window.innerHeight;
      
      // Posición actual del scroll
      const scrollPosition = window.scrollY;
      
      // Comprueba si el usuario ha llegado a next-section o lo ha sobrepasado
      if (scrollPosition >= nextSectionTop - windowHeight) {
          // Calcula cuánto se ha desplazado desde que next-section se volvió visible
          const scrollPastSection = scrollPosition - (nextSectionTop - windowHeight);
          const maxScroll = document.body.scrollHeight - nextSectionTop;
          
          // El radio debe ser lo suficientemente grande para cubrir toda la pantalla
          const maxRadius = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2));
          
          // Calcula el radio actual basado en el scroll, pero solo después de llegar a next-section
          const radius = (scrollPastSection / maxScroll) * maxRadius * 1.2;
          
          // Actualiza el tamaño del círculo
          circle.style.width = `${radius * 2}px`;
          circle.style.height = `${radius * 2}px`;
          circle.style.bottom = `${-radius}px`;
          circle.style.display = 'block'; // Muestra el círculo
      } else {
          // Si no ha llegado a la sección, oculta el círculo
          circle.style.display = 'none';
      }
  }
  
  // Ejecuta la función al cargar y al hacer scroll
  window.addEventListener('scroll', updateCircle);
  window.addEventListener('load', updateCircle);
  window.addEventListener('resize', updateCircle);
});


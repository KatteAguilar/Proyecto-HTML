document.addEventListener("DOMContentLoaded", (e)=> {
    const listBtns = document.querySelectorAll(".btnAdd")
     //console.log(listBtns)  

    //buscar a que boton se le hizo clic
    listBtns.forEach((boton,index) => {
        boton.addEventListener("click", (e) => {
            const tarjeta = e.target.closest(".tarjeta");
            const nombre = tarjeta.querySelector(".nombre").textContent;


            const item = {}
            // Aquí va el código que deseas ejecutar al hacer clic
        });
    });
});
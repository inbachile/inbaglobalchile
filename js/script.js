const filas = 21;
const columnas = "ABCDEFGHIJK".split("");
const sala = document.getElementById("sala");
const encabezado = document.getElementById("encabezado");
const seleccionados = new Set();
const seleccionadosDiv = document.getElementById("seleccionados");

// Ocupados predefinidos (puedes agregar los que quieras)
const ocupados = []; // ejemplo: ["A1", "B2"]

// Crear encabezado con letras (A-K) como columnas
columnas.forEach(col => {
    const letraDiv = document.createElement("div");
    letraDiv.className = "letra";
    letraDiv.textContent = col;
    encabezado.appendChild(letraDiv);
});

// Generar filas de asientos
for (let fila = 1; fila <= filas; fila++) {
    const filaDiv = document.createElement("div");
    filaDiv.className = "fila";

    columnas.forEach(col => {
        const id = col + fila;
        const seat = document.createElement("div");
        seat.className = "asiento";
        seat.textContent = id;

        if (fila <= 3) seat.classList.add("vip"); // Las primeras 3 filas son VIP
        if (ocupados.includes(id)) {
            seat.classList.add("ocupado");
        } else {
            seat.onclick = () => {
                if (seat.classList.contains("ocupado")) return;
                if (seleccionados.has(id)) {
                    seleccionados.delete(id);
                    seat.style.backgroundColor = seat.classList.contains("vip") ? "gold" : "green";
                } else {
                    seleccionados.add(id);
                    seat.style.backgroundColor = "orange";
                }
                actualizarSeleccion();
            };
        }

        filaDiv.appendChild(seat);
    });

    sala.appendChild(filaDiv);
}

function actualizarSeleccion() {
    const lista = Array.from(seleccionados).sort().join(", ");
    seleccionadosDiv.textContent = lista
        ? "Asientos seleccionados: " + lista
        : "Asientos seleccionados: ninguno";
}

function enviarReserva() {
    if (seleccionados.size === 0) {
        alert("Debes seleccionar al menos un asiento.");
        return;
    }
    const lista = Array.from(seleccionados).sort().join(", ");
    const mensaje = `Hola, quiero reservar los siguientes asientos para el evento INBA Chile 2025: ${lista}. Por favor confirmar.`;
    const url = "https://wa.me/56961451122?text=" + encodeURIComponent(mensaje);
    window.open(url, "_blank");
}

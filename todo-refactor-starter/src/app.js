/*
 *  MISIÓN 9 · ADAPTADOR DE INTERFAZ
 * Lee los eventos del DOM, llama a las funciones de taskService.js
 * y dibuja el resultado con render().
 */

import {
  crearTarea,
  agregarTarea,
  cambiarEstado,
  eliminarTarea,
  obtenerPendientes,
  obtenerTerminadas,
  obtenerResumen
} from "./taskService.js";

const formulario = document.querySelector("#task-form");
const campoTitulo = document.querySelector("#task-input");
const lista = document.querySelector("#task-list");
const mensaje = document.querySelector("#message");
const resumen = document.querySelector("#summary");
const botonesFiltro = [...document.querySelectorAll("[data-filter]")];

// Estado de la aplicación
let tareas = [
  crearTarea(1, "Revisar requisitos"),
  crearTarea(2, "Diseñar pruebas"),
  crearTarea(3, "Refactorizar código")
];
let siguienteId = 4;
let filtro = "todas";

// Cada filtro se traduce a una función de dominio
const vistas = {
  todas: (tareas) => tareas,
  pendientes: obtenerPendientes,
  terminadas: obtenerTerminadas
};

function crearItem(tarea) {
  const elemento = document.createElement("li");
  elemento.className = "task";
  elemento.classList.toggle("done", tarea.completada);

  const titulo = document.createElement("span");
  titulo.className = "title";
  titulo.textContent = tarea.titulo;

  const acciones = document.createElement("span");
  acciones.className = "task-actions";

  const botonEstado = document.createElement("button");
  botonEstado.dataset.toggle = tarea.id;
  botonEstado.textContent = tarea.completada ? "Reabrir" : "Completar";

  const botonEliminar = document.createElement("button");
  botonEliminar.dataset.delete = tarea.id;
  botonEliminar.textContent = "Eliminar";

  acciones.append(botonEstado, botonEliminar);
  elemento.append(titulo, acciones);
  return elemento;
}

function render() {
  const visibles = vistas[filtro](tareas);

  lista.innerHTML = "";
  visibles.forEach((tarea) => lista.appendChild(crearItem(tarea)));

  const { total, pendientes, terminadas } = obtenerResumen(tareas);
  resumen.textContent = `Total: ${total} · Pendientes: ${pendientes} · Terminadas: ${terminadas}`;
}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const titulo = campoTitulo.value.trim();
  if (!titulo) {
    mensaje.textContent = "Escribe un título antes de agregar.";
    return;
  }
  tareas = agregarTarea(tareas, crearTarea(siguienteId, titulo));
  siguienteId += 1;
  campoTitulo.value = "";
  mensaje.textContent = "";
  render();
});

lista.addEventListener("click", (event) => {
  const { toggle: idParaCambiar, delete: idParaEliminar } = event.target.dataset;

  if (idParaCambiar !== undefined) {
    tareas = cambiarEstado(tareas, Number(idParaCambiar));
  } else if (idParaEliminar !== undefined) {
    tareas = eliminarTarea(tareas, Number(idParaEliminar));
  } else {
    return;
  }
  render();
});

botonesFiltro.forEach((botonPulsado) =>
  botonPulsado.addEventListener("click", () => {
    filtro = botonPulsado.dataset.filter;
    botonesFiltro.forEach((boton) =>
      boton.classList.toggle("active", boton === botonPulsado)
    );
    mensaje.textContent = "";
    render();
  })
);

render();

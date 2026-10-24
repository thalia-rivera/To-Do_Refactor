/*
 * MISIÓN 9 · ADAPTADOR DE INTERFAZ
 *
 * Este archivo solo lee eventos, delega las reglas a taskService.js
 * y dibuja el resultado en el DOM. No contiene reglas de negocio.
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

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const message = document.querySelector("#message");
const summary = document.querySelector("#summary");
const filterButtons = [...document.querySelectorAll("[data-filter]")];

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
  todas: (coleccion) => coleccion,
  pendientes: obtenerPendientes,
  terminadas: obtenerTerminadas
};

function crearItem(tarea) {
  const li = document.createElement("li");
  li.className = "task";
  li.classList.toggle("done", tarea.completada);

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
  li.append(titulo, acciones);
  return li;
}

function render() {
  const visibles = vistas[filtro](tareas);

  list.innerHTML = "";
  visibles.forEach((tarea) => list.appendChild(crearItem(tarea)));

  const { total, pendientes, terminadas } = obtenerResumen(tareas);
  summary.textContent = `Total: ${total} · Pendientes: ${pendientes} · Terminadas: ${terminadas}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const titulo = input.value.trim();
  if (!titulo) {
    message.textContent = "Escribe un título antes de agregar.";
    return;
  }
  tareas = agregarTarea(tareas, crearTarea(siguienteId, titulo));
  siguienteId += 1;
  input.value = "";
  message.textContent = "";
  render();
});

list.addEventListener("click", (event) => {
  const { toggle, delete: eliminar } = event.target.dataset;

  if (toggle !== undefined) {
    tareas = cambiarEstado(tareas, Number(toggle));
  } else if (eliminar !== undefined) {
    tareas = eliminarTarea(tareas, Number(eliminar));
  } else {
    return;
  }
  render();
});

filterButtons.forEach((button) =>
  button.addEventListener("click", () => {
    filtro = button.dataset.filter;
    filterButtons.forEach((b) => b.classList.toggle("active", b === button));
    message.textContent = "";
    render();
  })
);

render();

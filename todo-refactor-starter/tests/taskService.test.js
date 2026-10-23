import { describe, it, expect } from "vitest";
import {
  crearTarea,
  agregarTarea,
  buscarTarea,
  obtenerPendientes,
  obtenerTerminadas,
  cambiarEstado,
  eliminarTarea,
  obtenerResumen
} from "../src/taskService.js";

/*
 * TODO REFACTOR LAB · SUITE STARTER
 *
 * Activa/crea pruebas misión por misión. No escribas todas las soluciones de
 * una vez. Para cada comportamiento sigue RED → GREEN → REFACTOR.
 */

describe("crearTarea", () => {
  it("crea una tarea pendiente con id y título", () => {
    // Arrange
    const id = 10;
    const titulo = "Diseñar pruebas";

    // Act
    const tarea = crearTarea(id, titulo);

    // Assert
    expect(tarea).toEqual({ id: 10, titulo: "Diseñar pruebas", completada: false });
  });
});

//AÑADÍ ESTO PARA HACER UNA PRUEBA


describe("agregarTarea", () => {
  it("devuelve la colección con la nueva tarea al final", () => {
    // Arrange
    const tareas = [{ id: 1, titulo: "Revisar requisitos", completada: false }];
    const nueva = { id: 2, titulo: "Diseñar pruebas", completada: false };

    // Act
    const resultado = agregarTarea(tareas, nueva);

    // Assert
    expect(resultado).toEqual([
      { id: 1, titulo: "Revisar requisitos", completada: false },
      { id: 2, titulo: "Diseñar pruebas", completada: false }
    ]);
  });

  it("devuelve una colección con un elemento más", () => {
    // Arrange
    const tareas = [
      { id: 1, titulo: "Revisar requisitos", completada: false },
      { id: 2, titulo: "Diseñar pruebas", completada: false }
    ];
    const nueva = { id: 3, titulo: "Refactorizar código", completada: false };

    // Act
    const resultado = agregarTarea(tareas, nueva);

    // Assert
    expect(resultado).toHaveLength(tareas.length + 1);
  });

  it("no modifica el array original", () => {
    // Arrange
    const tareas = [{ id: 1, titulo: "Revisar requisitos", completada: false }];
    const nueva = { id: 2, titulo: "Diseñar pruebas", completada: false };

    // Act
    agregarTarea(tareas, nueva);

    // Assert
    expect(tareas).toHaveLength(1);
  });
});


// MISIÓN 4: prueba id existente e inexistente para buscarTarea().

describe("buscarTarea", () => {
  it("encuentra una tarea con un id existente", () => {
    // Arrange
    const tareas = [crearTarea(1, "Analizar requisitos"), crearTarea(2, "Diseñar pruebas")];

    // Act
    const resultado = buscarTarea(tareas, 2);

    // Assert
    expect(resultado).toEqual({ id: 2, titulo: "Diseñar pruebas", completada: false });
  });

  it("devuelve undefined si el id no existe", () => {
    const tareas = [crearTarea(1, "Analizar requisitos"), crearTarea(2, "Diseñar pruebas")];

    const resultado = buscarTarea(tareas, 99);

    expect(resultado).toBeUndefined();
  });

});

// MISIÓN 5: prueba colección mixta, sin coincidencias y vacía.
// MISIÓN 6: prueba cambio correcto, otra tarea intacta e id inexistente.
// MISIÓN 7: prueba eliminar existente, inexistente y colección vacía.
// MISIÓN 8: prueba obtenerResumen(), incluyendo colección vacía.

// Los imports anteriores quedan preparados para que construyas la suite de forma incremental.
void buscarTarea;
void obtenerPendientes;
void obtenerTerminadas;
void cambiarEstado;
void eliminarTarea;
void obtenerResumen;

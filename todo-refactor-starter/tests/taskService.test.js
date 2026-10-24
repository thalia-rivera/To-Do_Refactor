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
    describe("obtenerPendientes", () => {
  it("devuelve solo las tareas pendientes en una colección mixta", () => {
    // Arrange
    const tareas = [
      { id: 1, titulo: "Revisar requisitos", completada: true },
      { id: 2, titulo: "Diseñar pruebas", completada: false },
      { id: 3, titulo: "Refactorizar código", completada: false }
    ];

    // Act
    const resultado = obtenerPendientes(tareas);

    // Assert
    expect(resultado).toEqual([
      { id: 2, titulo: "Diseñar pruebas", completada: false },
      { id: 3, titulo: "Refactorizar código", completada: false }
    ]);
  });

  it("devuelve un arreglo vacío si ninguna está pendiente", () => {
    // Arrange
    const tareas = [
      { id: 1, titulo: "Revisar requisitos", completada: true }
    ];

    // Act
    const resultado = obtenerPendientes(tareas);

    // Assert
    expect(resultado).toEqual([]);
  });

  it("devuelve un arreglo vacío si la colección está vacía", () => {
    // Arrange
    const tareas = [];

    // Act
    const resultado = obtenerPendientes(tareas);

    // Assert
    expect(resultado).toEqual([]);
  });
});

describe("obtenerTerminadas", () => {
  it("devuelve solo las tareas terminadas en una colección mixta", () => {
    // Arrange
    const tareas = [
      { id: 1, titulo: "Revisar requisitos", completada: true },
      { id: 2, titulo: "Diseñar pruebas", completada: false },
      { id: 3, titulo: "Refactorizar código", completada: true }
    ];

    // Act
    const resultado = obtenerTerminadas(tareas);

    // Assert
    expect(resultado).toEqual([
      { id: 1, titulo: "Revisar requisitos", completada: true },
      { id: 3, titulo: "Refactorizar código", completada: true }
    ]);
  });

  it("devuelve un arreglo vacío si ninguna está terminada", () => {
    // Arrange
    const tareas = [
      { id: 1, titulo: "Revisar requisitos", completada: false }
    ];

    // Act
    const resultado = obtenerTerminadas(tareas);

    // Assert
    expect(resultado).toEqual([]);
  });

  it("devuelve un arreglo vacío si la colección está vacía", () => {
    // Arrange
    const tareas = [];

    // Act
    const resultado = obtenerTerminadas(tareas);

    // Assert
    expect(resultado).toEqual([]);
  });

  it("no modifica la colección original", () => {
    // Arrange
    const tareas = [
      { id: 1, titulo: "Revisar requisitos", completada: true },
      { id: 2, titulo: "Diseñar pruebas", completada: false }
    ];

    // Act
    obtenerTerminadas(tareas);

    // Assert
    expect(tareas).toHaveLength(2);
  });
}); 

// MISIÓN 6: prueba cambio correcto, otra tarea intacta e id inexistente.

describe("cambiarEstado", () => {
  it("cambia el estado de la tarea indicada", () => {
    // Arrange
    const tareas = [crearTarea(1, "Analizar requisitos"), crearTarea(2, "Diseñar pruebas")];

    // Act
    const resultado = cambiarEstado(tareas, 2);

    // Assert
    expect(resultado[1]).toEqual({ id: 2, titulo: "Diseñar pruebas", completada: true });
  });

  it("no altera las demás tareas", () => {
    const tareas = [crearTarea(1, "Analizar requisitos"), crearTarea(2, "Diseñar pruebas")];

    const resultado = cambiarEstado(tareas, 2);

    expect(resultado[0]).toEqual({ id: 1, titulo: "Analizar requisitos", completada: false });
  });

  it("conserva el contenido si el id no existe", () => {
    const tareas = [crearTarea(1, "Analizar requisitos"), crearTarea(2, "Diseñar pruebas")];

    const resultado = cambiarEstado(tareas, 99);

    expect(resultado).toEqual([
      { id: 1, titulo: "Analizar requisitos", completada: false },
      { id: 2, titulo: "Diseñar pruebas", completada: false }
    ]);
  });
});

// MISIÓN 7: prueba eliminar existente, inexistente y colección vacía.

describe("eliminarTarea", () => {
  it("elimina la tarea con un id existente", () => {
    // Arrange
    const tareas = [crearTarea(1, "Analizar requisitos"), crearTarea(2, "Diseñar pruebas"), crearTarea(3, "Ejecutar pruebas")];

    // Act
    const resultado = eliminarTarea(tareas, 2);

    // Assert
    expect(resultado).toEqual([
      { id: 1, titulo: "Analizar requisitos", completada: false },
      { id: 3, titulo: "Ejecutar pruebas", completada: false }
    ]);
  });

  it("conserva todas las tareas si el id no existe", () => {
    const tareas = [crearTarea(1, "Analizar requisitos"), crearTarea(2, "Diseñar pruebas")];

    const resultado = eliminarTarea(tareas, 99);

    expect(resultado).toEqual([
      { id: 1, titulo: "Analizar requisitos", completada: false },
      { id: 2, titulo: "Diseñar pruebas", completada: false }
    ]);
  });

  it("devuelve una colección vacía si la colección está vacía", () => {
    const resultado = eliminarTarea([], 1);

    expect(resultado).toEqual([]);
  });

});

// MISIÓN 8: prueba obtenerResumen(), incluyendo colección vacía.
describe("obtenerResumen", () => {
  it("cuenta total, pendientes y terminadas en una colección mixta", () => {
    // Arrange
    const tareas = [
      { id: 1, titulo: "Revisar requisitos", completada: true },
      { id: 2, titulo: "Diseñar pruebas", completada: false },
      { id: 3, titulo: "Refactorizar código", completada: false },
      { id: 4, titulo: "Escribir README", completada: true },
      { id: 5, titulo: "Hacer commit", completada: false }
    ];

    // Act
    const resumen = obtenerResumen(tareas);

    // Assert
    expect(resumen).toEqual({ total: 5, pendientes: 3, terminadas: 2 });
  });

  it("devuelve ceros con una colección vacía", () => {
    // Arrange
    const tareas = [];

    // Act
    const resumen = obtenerResumen(tareas);

    // Assert
    expect(resumen).toEqual({ total: 0, pendientes: 0, terminadas: 0 });
  });

  it("cuenta todo como pendiente si ninguna está terminada", () => {
    // Arrange
    const tareas = [
      { id: 1, titulo: "Revisar requisitos", completada: false },
      { id: 2, titulo: "Diseñar pruebas", completada: false }
    ];

    // Act
    const resumen = obtenerResumen(tareas);

    // Assert
    expect(resumen).toEqual({ total: 2, pendientes: 2, terminadas: 0 });
  });

  it("cumple que total = pendientes + terminadas", () => {
    // Arrange
    const tareas = [
      { id: 1, titulo: "A", completada: true },
      { id: 2, titulo: "B", completada: false },
      { id: 3, titulo: "C", completada: true }
    ];

    // Act
    const { total, pendientes, terminadas } = obtenerResumen(tareas);

    // Assert
    expect(total).toBe(pendientes + terminadas);
  });
});

// Los imports anteriores quedan preparados para que construyas la suite de forma incremental.
void buscarTarea;                                                                                                      
void cambiarEstado;
void eliminarTarea;


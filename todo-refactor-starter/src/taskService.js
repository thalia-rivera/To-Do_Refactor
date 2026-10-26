/*
 * TODO REFACTOR LAB · LÓGICA DE DOMINIO
 */

// MISIÓN 2
export function crearTarea(id, titulo) {
  return { id, titulo, completada: false };
}

// MISIÓN 3
export function agregarTarea(tareas, nuevaTarea) {
  return [...tareas, nuevaTarea];
}

// MISIÓN 4
export function buscarTarea(tareas, id) {
  return tareas.find(tarea => tarea.id === id);
}

// MISIÓN 5
export function obtenerPendientes(tareas) {
  return tareas.filter(tarea => !tarea.completada);
}

export function obtenerTerminadas(tareas) {
  return tareas.filter(tarea => tarea.completada);
}    

// MISIÓN 6
export function cambiarEstado(tareas, id) {
  return tareas.map(tarea => {
    if (tarea.id !== id) return tarea;
    return { ...tarea, completada: !tarea.completada };
  });

}

// MISIÓN 7
export function eliminarTarea(tareas, id) {
  return tareas.filter(tarea => tarea.id !== id);
}


// MISIÓN 8
export function obtenerResumen(tareas) {
  return {
    total: tareas.length,
    pendientes: obtenerPendientes(tareas).length,
    terminadas: obtenerTerminadas(tareas).length
  };
}

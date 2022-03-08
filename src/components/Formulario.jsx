import { useState } from "react"
import Swal from "sweetalert2"
import { useFormulario } from "../hooks/useFormulario"

const Formulario = ({agregarTarea}) => {

  const initialState = {
      nombre : '',
      descripcion: '',
      estado: 'pendiente',
      prioridad: false
  }  

  const [inputs, handleChange, reset] = useFormulario(initialState) 

  const {nombre, descripcion, estado, prioridad} = inputs

  const handleSubmit = e =>{
      e.preventDefault()
      if (!nombre.trim()) {
            e.target[0].focus();
            Swal.fire({
                title: 'Error!',
                text: 'No deje el nombre en blanco',
                icon: 'error',
            })
            return
        }

        if (!descripcion.trim()) {
            e.target[1].focus();
            Swal.fire({
                title: 'Error!',
                text: 'No deje la descripcion en blanco',
                icon: 'error',
            })
            return
        }
        Swal.fire({
            title: 'Exito!',
            text: 'Tarea agregada',
            icon: 'success',
        })
        agregarTarea({
            nombre,
            descripcion,
            estado: estado === 'pendiente' ? false : true,
            prioridad,
            id: Date.now()
        })
        reset()
  }

  return (
    <>
        <h2>Agregar tarea</h2>

        <form onSubmit={handleSubmit}>
            <input
              type="text" 
              className="form-control mb-2"
              name="nombre"
              placeholder="Ingrese un nombre para la tarea"
              value={nombre}
              onChange={handleChange}
            />
            <textarea
              className="form-control mb-2"
              name="descripcion"
              placeholder="Ingrese una descripcion para la tarea"
              value={descripcion}
              onChange={handleChange}
            />
            <select
              name="estado"
              className="form-control mb-2"
              value={estado}
              onChange={handleChange}
            >
                <option value="pendiente">Pendiente</option>    
                <option value="completado">Completado</option>
            </select>
            <div className="form-check">
                <input
                  className="form-check-input"
                  id="flexCheckDefault"
                  name="prioridad"
                  type="checkbox" 
                  checked={prioridad}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexCheckDefault"
                >
                    Dar prioridad
                </label>
            </div>

            <button type="submit" className="btn btn-primary">Agregar</button>
        </form>


    </>
  )
}

export default Formulario
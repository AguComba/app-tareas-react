import { useEffect, useState } from "react"
import Formulario from "./Formulario"
import Tarea from "./Tarea"

const TareaLista = () => {
  
  const [tareas, setTareas] = useState([])  

  useEffect(()=>{
      if(localStorage.getItem('tareas')){
          setTareas(JSON.parse(localStorage.getItem('tareas')))
      }
  },[])

  useEffect(()=>{
    localStorage.setItem('tareas', JSON.stringify(tareas))
  },[tareas])

  const agregarTarea = tarea => {
      setTareas((old)=>[...old, tarea])
  }

  const eliminarTarea = (id)=>{
      setTareas((old)=>old.filter(item=> item.id !== id))
  }
    
  const editarTarea = (id)=>{
      const editarTareas = tareas.map(item =>(
          item.id === id ? {...item, estado: !item.estado} : item
      ))

      setTareas(editarTareas)
  }

  return (
    <>
        <Formulario agregarTarea={agregarTarea}/>
        <ul className="list-group list-group-numbered mt-2">
        {
            tareas.map(item =>(
                   <Tarea
                      key={item.id}
                      tarea={item}
                      eliminarTarea={eliminarTarea}
                      editarTarea = {editarTarea}
                    />
            ))
        }

        </ul>
    </>
  )
}

export default TareaLista
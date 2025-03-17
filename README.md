
# Proyecto Angular - Task Manager

Este proyecto es un frontend desarrollado con Angular para gestionar una lista de tareas. Permite ver, agregar, marcar como completadas y eliminar tareas.

## Requisitos

* Node.js (versión 14 o superior)
* npm (versión 6 o superior)
* Angular CLI (versión 15 o superior)

## Instalación

1.  Clona el repositorio:

    
    git clone https://github.com/RCisneroC/Proyecto-Frontend.git
  

2.  Navega al directorio del proyecto:

  
    cd <Proyect-frontend>
  

3.  Instala las dependencias:

   
    npm install


## Ejecución local

1.  Ejecuta el servidor de desarrollo:

  
    ng serve
   

2.  Abre tu navegador y visita `http://localhost:4200/AppTaskManager/#/task-manager/task-list`.

## Conexión con el Backend .NET

Este frontend se comunica con un backend .NET para persistir y gestionar las tareas.

1.  Asegúrate de que el backend .NET esté en ejecución y accesible.
2.  Configura la URL del backend en el archivo `src/environments/environment.ts`
3.   importante recordar que se debe valiar al ejecutar el backend ya sea por http o https cambiarlos en la variable de entorno siguiente.

    ```typescript
    export const environment = {
      production: false,
      apiUrlTaskManager: 'http://localhost:5175/api/v1/' // Reemplaza con la URL de tu backend
    };
    ```

3.  Si el backend y el frontend están en dominios diferentes, asegúrate de que el backend tenga CORS configurado para permitir las solicitudes desde `http://localhost:4200/`.


## Estructura del proyecto

* `src/app`: Contiene los componentes, servicios y módulos de la aplicación.
* `src/environments`: Contiene la configuración del entorno.
* `src/assets`: Contiene los archivos estáticos (imágenes, estilos, etc.).

## Dependencias principales

* `@angular/core`: Núcleo de Angular.
* `@angular/common`: Funcionalidades comunes de Angular.
* `@angular/forms`: Módulo para trabajar con formularios.
* `@angular/http`: Módulo para realizar solicitudes HTTP.


## Funcionalidades adicionales

* Validaciones en el formulario de creación/edición de tareas.
* Filtro para mostrar tareas pendientes, completadas o todas.

## Autor

* [Ricardo cisnero coronado]
<!-- *********************************************************************** -->
<!-- *********************************************************************** -->
<!-- *********************************************************************** -->
<!-- *********************************************************************** -->
<!-- *********************************************************************** -->
<!-- *********************************************************************** -->
# PROYECTO FINAL DE DESARROLLO WEB AVANZADO - COMPONENTE DE FRONT END EN ANGULAR 18
### PROGRAMA TALENTO TECH
### MINISTERIO DE TECNOLOGÍAS DE INFORMACIÓN Y LAS COMUNICACIONES

**ELABORO:**  
**ING. JAIME ALBERTO GUTIÉRREZ MEJÍA**  
**CC. 9733675 DE ARMENIA, QUINDÍO**  
**ANALISTA PROGRAMADOR JAVA Y NODEJS**

**Fecha de elaboración:** Octubre 2024

**MINTIC**  
**TALENTO TECH**  
**TODOS LOS DERECHOS RESERVADOS**  
**JAIME ALBERTO GUTIÉRREZ**  
**2024**

### Arquitectura del Proyecto

La arquitectura de este proyecto se basa en el modelo hexagonal, lo que permite una separación clara de las responsabilidades y una fácil integración de componentes. La estructura del proyecto está organizada en las siguientes capas:

1. **Capa de Configuración (Config)**:
   - **app.config.ts** y **app.config.server.ts**: Archivos que contienen la configuración del entorno, incluyendo variables como la URL del servidor, opciones de conexión y configuraciones específicas para el manejo de tokens JWT.

2. **Capa de Presentación (Controllers)**:
   - Esta capa se encarga de gestionar la lógica de la interfaz de usuario y la interacción con el modelo. Se compone de los componentes principales que renderizan las vistas y manejan la interacción del usuario.
   - Ejemplos:
     - `clientes-create`, `clientes-detail`, `clientes-edit`, y `clientes-list` para gestionar las operaciones relacionadas con los clientes.
     - `interacciones-create`, `interacciones-detail`, `interacciones-edit`, y `interacciones-list` para gestionar interacciones con clientes.
     - `oportunidades-create`, `oportunidades-detail`, `oportunidades-edit`, y `oportunidades-list` para manejar las oportunidades de negocio.
     - Componentes adicionales como `dashboard` y `analitica` para la visualización de datos y análisis.

3. **Capa de Dominio (Models)**:
   - Aquí se encuentran los modelos de datos que representan las entidades principales del sistema, ubicados en la carpeta `models`:
     - `cliente.model.ts`: Define la estructura y los atributos de un cliente.
     - `interaccion.model.ts`: Representa las interacciones realizadas con los clientes.
     - `oportunidad.model.ts`: Describe las oportunidades de negocio.
     - `pago.model.ts`: Modela la información relacionada con los pagos.

4. **Capa de Rutas (Routes)**:
   - Las rutas principales del sistema están definidas en **app-routing.module.ts** y **app.routes.ts**, permitiendo la navegación entre las diferentes funcionalidades del sistema. Cada componente está asociado a una ruta específica que se activa al navegar en la aplicación.

5. **Capa Compartida (Shared)**:
   - La carpeta `shared` incluye componentes, servicios y módulos que son reutilizables en diferentes partes de la aplicación, promoviendo la reutilización de código y la consistencia en la implementación.

6. **Capa de Recursos Estáticos (Assets)**:
   - En la carpeta `assets`, se encuentran los recursos estáticos utilizados por la aplicación, como imágenes y otros archivos que enriquecen la experiencia del usuario.

---

Esta estructura organizada permite que el sistema sea modular, facilitando la escalabilidad y el mantenimiento a largo plazo del CRM.

Contacto:  jaimealbertogutierrez@gmail.com.  057 3118841634 - 034 649067928

<!-- *********************************************************************** -->
<!-- *********************************************************************** -->
<!-- *********************************************************************** -->
<!-- *********************************************************************** -->
<!-- *********************************************************************** -->
<!-- *********************************************************************** -->


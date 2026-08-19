# TaskApp - Proyecto DevOps

Aplicación web sencilla para la gestión de tareas, desarrollada como proyecto práctico para demostrar la implementación de un pipeline DevOps completo.

El proyecto integra desarrollo web, pruebas automatizadas, análisis estático, contenedores Docker, integración continua, despliegue automatizado y monitoreo básico.

---

## 1. Tecnologías utilizadas

- Node.js
- Express.js
- SQLite
- HTML
- CSS
- JavaScript
- Jest
- Supertest
- ESLint
- Docker
- Git
- GitHub
- GitHub Actions
- Docker Hub

---

## 2. Funcionalidades

La aplicación permite:

- Visualizar las tareas existentes.
- Crear nuevas tareas.
- Consultar las tareas mediante una API REST.
- Verificar el estado de la aplicación.
- Consultar métricas básicas.
- Registrar las solicitudes realizadas al servidor.
- Ejecutarse localmente o mediante Docker.

---

## 3. Arquitectura del proyecto

```text
                         ┌─────────────────┐
                         │     Usuario     │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │    Frontend     │
                         │ HTML/CSS/JS     │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Backend         │
                         │ Node.js/Express │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ SQLite Database │
                         └─────────────────┘
```

El proyecto también incorpora un flujo DevOps:

```text
GitHub
   │
   │ Push
   ▼
GitHub Actions
   │
   ├── Instalar dependencias
   ├── ESLint
   ├── Jest
   ├── Docker Build
   ├── Docker Login
   └── Docker Push
             │
             ▼
        Docker Hub
```

---

## 4. Estructura del proyecto

```text
TaskApp/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── src/
│   ├── app.js
│   └── database.js
│
├── tests/
│   └── app.test.js
│
├── data/
│
├── .dockerignore
├── .gitignore
├── Dockerfile
├── eslint.config.mjs
├── package.json
├── package-lock.json
└── README.md
```

---

# 5. Requisitos

Para ejecutar el proyecto se necesita:

- Node.js
- npm
- Git
- Docker Desktop

---

# 6. Instalación

Clonar el repositorio:

```bash
git clone https://github.com/CarlosC-code/TaskApp-DevOps.git
```

Entrar al proyecto:

```bash
cd TaskApp-DevOps
```

Instalar las dependencias:

```bash
npm install
```

---

# 7. Ejecución local

Para iniciar la aplicación:

```bash
npm start
```

La aplicación estará disponible en:

```text
http://localhost:3000
```

---

# 8. API

## Health Check

Endpoint:

```text
GET /health
```

Ejemplo:

```json
{
  "status": "OK",
  "uptime": 22.873,
  "timestamp": "2026-08-19T21:22:46.522Z"
}
```

Este endpoint permite comprobar que la aplicación está funcionando correctamente.

---

## Obtener tareas

Endpoint:

```text
GET /api/tasks
```

Devuelve las tareas almacenadas en SQLite.

---

## Crear una tarea

Endpoint:

```text
POST /api/tasks
```

Ejemplo de solicitud:

```json
{
  "title": "Completar proyecto DevOps"
}
```

La API devuelve la información de la tarea creada.

---

# 9. Base de datos

La aplicación utiliza **SQLite** como sistema de base de datos.

La base de datos contiene la tabla:

```text
tasks
```

con los siguientes campos:

| Campo | Tipo | Descripción |
|---|---|---|
| id | INTEGER | Identificador de la tarea |
| title | TEXT | Título de la tarea |
| completed | INTEGER | Estado de la tarea |

La aplicación crea automáticamente la tabla si no existe.

---

# 10. Pruebas automatizadas

El proyecto utiliza:

- Jest
- Supertest

Las pruebas verifican:

- `GET /health`
- `POST /api/tasks`
- `GET /api/tasks`

Para ejecutar las pruebas:

```bash
npm test
```

Resultado esperado:

```text
Test Suites: 1 passed
Tests: 3 passed
```

---

# 11. Análisis estático

El proyecto utiliza **ESLint** para analizar el código JavaScript.

Para ejecutar el análisis:

```bash
npm run lint
```

Si no existen errores, ESLint finaliza correctamente.

---

# 12. Docker

La aplicación puede ejecutarse mediante Docker.

## Construir la imagen

```bash
docker build -t taskapp .
```

## Ejecutar el contenedor

```bash
docker run -d -p 3000:3000 --name taskapp-container -v "${PWD}/data:/app/data" taskapp
```

La aplicación estará disponible en:

```text
http://localhost:3000
```

---

# 13. Persistencia de datos

La aplicación utiliza SQLite y almacena la base de datos dentro de:

```text
/app/data/tasks.db
```

Para conservar los datos cuando el contenedor se elimina y se crea nuevamente, se utiliza un volumen Docker:

```text
${PWD}/data:/app/data
```

De esta manera, los datos se mantienen fuera del ciclo de vida del contenedor.

---

# 14. Monitoreo básico

La aplicación cuenta con mecanismos básicos de monitoreo.

## Health Check

Permite comprobar el estado de la aplicación:

```text
http://localhost:3000/health
```

Devuelve:

- Estado de la aplicación.
- Tiempo de ejecución.
- Fecha y hora actual.

---

## Métricas

Endpoint:

```text
http://localhost:3000/metrics
```

Ejemplo:

```json
{
  "totalRequests": 3,
  "totalErrors": 1,
  "uptime": 36.328
}
```

Las métricas muestran:

- Número total de solicitudes.
- Número de errores.
- Tiempo de ejecución de la aplicación.

---

## Logs

La aplicación registra las solicitudes realizadas.

Ejemplo:

```text
[2026-08-19T21:17:18.567Z] GET /health - 200 - 4ms
```

Los registros incluyen:

- Fecha y hora.
- Método HTTP.
- Ruta.
- Código de respuesta.
- Tiempo de respuesta.

Cuando la aplicación se ejecuta mediante Docker, los logs pueden consultarse con:

```bash
docker logs taskapp-container
```

---

# 15. Pipeline CI/CD

El proyecto utiliza **GitHub Actions** para automatizar el proceso de integración y despliegue.

El pipeline se ejecuta automáticamente cuando se realiza un `push` a la rama `main`.

El flujo implementado es:

```text
Git Push
   │
   ▼
GitHub Actions
   │
   ▼
Checkout del código
   │
   ▼
Configuración de Node.js
   │
   ▼
Instalación de dependencias
   │
   ▼
ESLint
   │
   ▼
Pruebas Jest
   │
   ▼
Construcción de imagen Docker
   │
   ▼
Login en Docker Hub
   │
   ▼
Publicación de imagen
```

---

# 16. Integración continua (CI)

La fase de integración continua ejecuta automáticamente:

1. Descarga del código fuente.
2. Configuración de Node.js.
3. Instalación de dependencias.
4. Análisis estático mediante ESLint.
5. Ejecución de pruebas automatizadas.
6. Construcción de la imagen Docker.

Si una etapa falla, el pipeline se detiene y el cambio no continúa hacia la publicación de la imagen.

---

# 17. Despliegue continuo (CD)

Después de que las pruebas y el análisis sean exitosos, GitHub Actions:

1. Construye la imagen Docker.
2. Inicia sesión en Docker Hub.
3. Publica automáticamente la imagen.

La imagen publicada es:

```text
carloscode1/taskapp:latest
```

Repositorio de Docker Hub:

```text
carloscode1/taskapp
```

---

# 18. Docker Hub

La imagen de la aplicación se encuentra publicada en Docker Hub.

Nombre:

```text
carloscode1/taskapp
```

Etiqueta:

```text
latest
```

Para descargar la imagen:

```bash
docker pull carloscode1/taskapp:latest
```

Para ejecutarla:

```bash
docker run -d -p 3000:3000 --name taskapp-container -v "${PWD}/data:/app/data" carloscode1/taskapp:latest
```

---

# 19. Secrets de GitHub

Para permitir que GitHub Actions publique imágenes en Docker Hub se utilizan Secrets de GitHub.

Los secretos utilizados son:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

Las credenciales no se almacenan directamente en el código fuente ni en el archivo del pipeline.

---

# 20. Manual de operaciones

## Ver contenedores activos

```bash
docker ps
```

## Ver todos los contenedores

```bash
docker ps -a
```

## Consultar logs

```bash
docker logs taskapp-container
```

## Detener el contenedor

```bash
docker stop taskapp-container
```

## Eliminar el contenedor

```bash
docker rm taskapp-container
```

## Descargar la última imagen

```bash
docker pull carloscode1/taskapp:latest
```

## Construir una nueva imagen

```bash
docker build -t taskapp .
```

## Ejecutar la aplicación

```bash
docker run -d -p 3000:3000 --name taskapp-container -v "${PWD}/data:/app/data" taskapp
```

---

# 21. Verificación de la aplicación

Después de iniciar la aplicación se pueden utilizar los siguientes endpoints:

### Aplicación

```text
http://localhost:3000
```

### Health Check

```text
http://localhost:3000/health
```

### Métricas

```text
http://localhost:3000/metrics
```

### API de tareas

```text
http://localhost:3000/api/tasks
```

---

# 22. Solución de problemas

## El puerto 3000 está ocupado

Comprobar los contenedores:

```bash
docker ps
```

Si existe un contenedor utilizando el puerto:

```bash
docker rm -f taskapp-container
```

Después iniciar nuevamente la aplicación.

---

## Las pruebas fallan

Ejecutar:

```bash
npm test
```

Revisar el mensaje mostrado por Jest y corregir el problema indicado.

---

## ESLint muestra errores

Ejecutar:

```bash
npm run lint
```

Corregir los errores indicados y ejecutar nuevamente el comando.

---

## Docker no puede iniciar sesión en Docker Hub

Comprobar que los Secrets de GitHub estén configurados correctamente:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

El token debe tener permisos suficientes para publicar imágenes.

---

# 23. Resultados obtenidos

El proyecto implementa un flujo DevOps funcional que integra:

- Control de versiones mediante Git y GitHub.
- Integración continua mediante GitHub Actions.
- Pruebas automatizadas.
- Análisis estático.
- Contenedores Docker.
- Persistencia de datos mediante volumen Docker.
- Publicación automática de imágenes en Docker Hub.
- Monitoreo básico.
- Health Check.
- Métricas.
- Logs.

El pipeline fue ejecutado exitosamente mediante GitHub Actions y finalizó con estado:

```text
Success
```

La imagen Docker también fue publicada correctamente en Docker Hub.

---

# 24. Lecciones aprendidas

Durante el desarrollo del proyecto se aprendió:

- Cómo utilizar Git y GitHub para controlar versiones.
- Cómo crear un pipeline automatizado con GitHub Actions.
- Cómo ejecutar pruebas automáticamente.
- Cómo utilizar ESLint para mejorar la calidad del código.
- Cómo crear y ejecutar contenedores Docker.
- Cómo utilizar volúmenes para conservar datos.
- Cómo publicar imágenes Docker automáticamente.
- Cómo implementar mecanismos básicos de monitoreo.
- Cómo utilizar logs y métricas para observar el comportamiento de una aplicación.

---

# 25. Desafíos y soluciones

### Problema con las dependencias de Docker

Durante la construcción de la imagen se produjo un problema relacionado con la sincronización entre `package.json` y `package-lock.json`.

**Solución:** se actualizaron las dependencias y se ajustó la instalación utilizada en el Dockerfile.

---

### Problemas con Jest en GitHub Actions

Las pruebas locales funcionaban correctamente, pero el proceso de Jest mantenía procesos abiertos en el entorno de CI.

**Solución:** se utilizó:

```bash
jest --forceExit
```

para finalizar correctamente el proceso después de ejecutar las pruebas.

---

### Problema con SQLite en GitHub Actions

La aplicación intentaba acceder a una carpeta de datos que no existía en el entorno de CI.

**Solución:** se agregó la creación automática del directorio antes de inicializar la base de datos.

---

### Problemas de autenticación con Docker Hub

Inicialmente el pipeline no podía autenticarse correctamente con Docker Hub.

**Solución:** se configuraron Secrets de GitHub y un Access Token de Docker Hub con permisos adecuados para publicar imágenes.

---

# 26. Conclusión

TaskApp demuestra la implementación de un flujo DevOps básico y funcional para una aplicación web.

El proyecto integra desarrollo, control de versiones, pruebas, análisis de código, contenedores, automatización CI/CD y monitoreo.

El uso de GitHub Actions permite automatizar las tareas de validación y construcción, mientras que Docker y Docker Hub facilitan el empaquetado y distribución de la aplicación.

El resultado es un flujo automatizado en el que un cambio realizado en la rama `main` puede ser validado, convertido en una imagen Docker y publicado automáticamente en Docker Hub.
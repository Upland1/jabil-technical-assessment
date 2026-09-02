# Jabil Technical Assessment - CRUD Movies & Directors

Solución al ejercicio técnico.
La aplicación implementa una solución full-stack para la gestión de las entidades **Director** y **Movie**:

- **Base de Datos:** MySQL
- **Backend:** C# (.NET 8 Web API + Entity Framework Core / Pomelo MySQL)
- **Frontend:** Angular (Standalone Components, HttpClient y FormsModule)

---

## Requisitos Previos

Para ejecutar la solución localmente se requiere:

- **MySQL Server:** 8.0+
- **.NET SDK:** 8.0+
- **Node.js:** 20.19+ (or 22.12+)
- **npm**

Puedes verificar las versiones instaladas con:

```bash
mysql --version
dotnet --version
node -v
npm -v
```

---

## Ejecución

### 1. Inicialización de la Base de Datos

Abre una terminal en la raíz del proyecto y ejecuta el script de creación de la base de datos:

```bash
sudo mysql -u root < db/schema.sql

# Cargar datos de prueba
sudo mysql -u root < db/seed.sql
```

El script `schema.sql` crea la base de datos y las tablas. El script `seed.sql` carga los datos de prueba.

### 2. Configuración del Usuario de MySQL

Se recomienda utilizar un usuario dedicado para la aplicación.

Ejecuta:

```bash
sudo mysql -u root -e "
CREATE USER IF NOT EXISTS 'jabil_user'@'localhost' IDENTIFIED BY 'JabilPass123!';
GRANT ALL PRIVILEGES ON MoviesDB.* TO 'jabil_user'@'localhost';
FLUSH PRIVILEGES;
"
```

La cadena de conexión utilizada por el backend está configurada en:

```text
backend/Program.cs
```

Actualmente utiliza:

```text
Server=localhost;Database=MoviesDB;User=jabil_user;Password=JabilPass123!;
```

> **Nota:** Para un entorno de producción se recomienda utilizar variables de entorno o un sistema seguro de configuración de secretos en lugar de almacenar credenciales directamente en el código.

---

## 2. Ejecutar Backend (C# .NET 8 Web API)

Abre una terminal y entra en la carpeta del backend:

```bash
cd backend
```

Restaura las dependencias de NuGet:

```bash
dotnet restore
```

Ejecuta la aplicación:

```bash
dotnet run
```

El backend estará disponible en:

- **API Base:** `http://localhost:5235/api`
- **Swagger:** `http://localhost:5235/swagger`

Swagger permite consultar y probar los endpoints disponibles directamente desde el navegador.

---

## 3. Ejecutar Frontend (Angular)

Abre una **nueva terminal** y entra en la carpeta del frontend:

```bash
cd frontend
```

Instala las dependencias:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npm start
```

La aplicación estará disponible en:

```text
http://localhost:4200
```

Abre esta dirección en tu navegador.

---

## Estructura

```text
├── db/
│   ├── schema.sql
│   └── seed.sql
│
├── backend/
│   ├── Controllers/
│   │   ├── DirectorsController.cs
│   │   └── MoviesController.cs
│   │
│   ├── Data/
│   │   └── AppDbContext.cs
│   │
│   ├── Models/
│   │   ├── Director.cs
│   │   └── Movie.cs
│   │
│   └── Program.cs
│
├── frontend/
│   └── src/
│       └── app/
│           ├── api.service.ts
│           ├── models.ts
│           ├── app.ts
│           ├── app.html
│           └── app.css
│
└── README.md
```

### Descripción de carpetas

| Carpeta / Archivo | Descripción |
|---|---|
| `db/schema.sql` | Script SQL para crear la base de datos y las tablas. |
| `db/seed.sql` | Script SQL para cargar datos de prueba. |
| `backend/Controllers/` | Controladores REST para Movies y Directors. |
| `backend/Data/` | Configuración de Entity Framework Core y acceso a MySQL. |
| `backend/Models/` | Modelos y entidades utilizados por el backend. |
| `backend/Program.cs` | Configuración principal de la API, MySQL, CORS y Kestrel. |
| `frontend/src/app/api.service.ts` | Servicio Angular encargado de comunicarse con la API. |
| `frontend/src/app/models.ts` | Interfaces TypeScript para Movie y Director. |
| `frontend/src/app/app.ts` | Lógica principal y manejo del estado de la aplicación. |
| `frontend/src/app/app.html` | Interfaz de usuario de la aplicación. |
| `frontend/src/app/app.css` | Estilos y diseño responsivo. |

---

## Endpoints API REST

### Directors

Base URL:

```text
/api/Directors
```

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/Directors` | Obtiene la lista completa de directores. |
| `GET` | `/api/Directors/{id}` | Consulta un director por su ID. |
| `POST` | `/api/Directors` | Crea un nuevo director. |
| `PUT` | `/api/Directors/{id}` | Modifica un director existente. |
| `DELETE` | `/api/Directors/{id}` | Elimina un director. |

---

### Movies

Base URL:

```text
/api/Movies
```

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/Movies` | Obtiene la lista de películas junto con los datos de su director asociado. |
| `GET` | `/api/Movies/{id}` | Consulta una película por su ID. |
| `POST` | `/api/Movies` | Registra una nueva película. |
| `PUT` | `/api/Movies/{id}` | Modifica los datos de una película existente. |
| `DELETE` | `/api/Movies/{id}` | Elimina una película. |

---


Configuración del Backend

    Crear y activar un entorno virtual:

python -m venv env
source env/bin/activate   # En Windows: env\Scripts\activate

Instalar dependencias:

pip install -r requirements.txt

Configurar las variables de entorno y secretos (ver archivo .env.example para referencia).

Migrar la base de datos:

python manage.py migrate

Ejecutar el servidor:

    python manage.py runserver

Configuración del Frontend

    Navegar a la carpeta del frontend:

cd frontend

Instalar dependencias:

npm install

Ejecutar la aplicación:

    npm start

Ejecución y Pruebas

    Backend: Ejecuta pruebas unitarias y de integración:

python manage.py test

Frontend: Ejecuta pruebas con:

    npm test

Asegúrate de simular escenarios de intentos de acceso no autorizado y verificar la robustez del sistema MFA.
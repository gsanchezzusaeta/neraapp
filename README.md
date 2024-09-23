## BackEnd

El backend se trabajo sobre Python utilizando FastAPI en conjunto con sqlalchemy y Sqlite. 

Para poder utilizar en necesario ejecutar el siguiente comando una vez parados sobre la carpeta raiz de la rama:

```
pip install -r requirements.txt
```

Y una vez que esten instaladas todas las dependencias, lo ejecutamos:

```
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Estructura

Se utiliza la siguiente estructura para el proyecto:

```
├── app
│   ├── crud
│   │    ├── ..._crud.py
│   │    ... 
│   ├── models
│   │    ├── ..._models.py
│   │    ... 
│   ├── routes
│   │    ├── ..._routes.py
│   │    ...  
|   ├── schemas
│   │    ├── ..._schemas.py
│   │    ...  
│   ├── config.py
│   ├── database.py
│   └── main.py
├── .env
├── .gitignore
└── requirements.txt

```

Se realiza dicha separación donde mantendremos los **modelos** que utilizará nuestra BD, los **schemas** que utilizará FastAPI para interpretar dicha data, los **crud** donde realizamos toda la lógica contra la BD y las **routes** que serán nuestros endpoints.

En el archivo `main.py` se establece la relación entre cada route y su prefijo. Si ya tiene el módulo corriendo, se puede visualizar los docs en la siguiente url:

```
http://localhost:8000/docs
```

También en dicho archivo creamos data *default* en la BD integrada la cual se creará una vez nosotros inicialicemos el proyecto.

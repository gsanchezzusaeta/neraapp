# Challenge Nera

Se realizó el Challenge trabajando el FrontEnd por un lado y el BackEnd sobre otro, cada uno en una rama diferente.


Para poder reproducir la aplicación es necesario realizar clonarse o bajarse como zip las dos siguientes *branches*:

```
frontend 
backend
```

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


## FrontEnd

Para el FrontEnd se utilizó Next.js 14 junto a Redux Toolkit, el cual también provee RTK Query, similar al React Query, junto a Tailwind y Typescript.


Para poder utilizar en necesario ejecutar el siguiente comando una vez parados sobre la carpeta raiz de la rama:

```
npm i
```

Y una vez que esten instaladas todas las dependencias, lo ejecutamos:

```
npm run dev
```

Podremos visualizarlo accediendo a la siguiente url:

```
http://localhost:3000
```


### Estructura

Se utiliza la siguiente estructura para el proyecto:

```
├── src
│   ├── app
│   │    ├── home
│   │    │    └── page.tsx
│   │    ├── login
│   │    │    └── page.tsx
│   │    ├── layout.tsx
│   │    ├── global.scss
│   │    ├── _shared.scss
│   │    └── favico.ico
│   ├── assets
│   │    └...
│   ├── components
│   │    ├── background
│   │    │    | ...
│   │    ├── cards
│   │    │    | ...
│   │    ├── forms
│   │    │    | ...
│   │    ├── loadingSpinner
│   │    │    | ...
│   │    ├── modals
│   │    │    | ...
│   │    └── navbar
│   │         | ...
│   ├── redux
│   │    ├── api
│   │    │    ├── cuentaApi.tsx
│   │    │    ├── transaccionApi.tsx
│   │    │    └── userApi.tsx
│   │    ├── features
│   │    │    └── userSlice.tsx
│   │    ├── hooks.ts
│   │    ├── redux-provider.tsx
│   │    └── store.ts
|   └── types
│        └...
├── next.config.mjs
...
```

En sí, el Front cuenta con dos vistas, el Login y el Home, pero es necesario pasar por el Login para poder ingresar al Home. Se realiza el chequeo en el `redux-provider.tsx` si el usuario está logueado o no.

Lo que es registro de Cliente, se dejo como `TODO` ya que no es necesaria la creación de clientes en el challenge, pero si se vió necesario un login para poder identificar a aquellos clientes existentes y permitirles el ingreso.

Los clientes creados son (también se pueden visualizar en el `main.py` del Back):

```
guidosanchez nerapp123
juancitolopez soyjuanlop
vivimen soyviviana
rickyricon rickyfort
scarface sayhellotomylittlefriend
```

## Funcionalidades

Una vez ingresados, podremos ver la vista de Home, la cual contará con las cuentas bancarias del cliente con el que ingreso. Se verá una lista de sus cuentas con Nombre - Nro de Cuenta / Fecha creada / Monto Disponible

En la parte superior de este Card, hay un boton + el cual permite agregar más cuentas al usuario, donde deberemos ingresar *Nombre*, *Numero de Cuenta* (el cual no puede coinicidir con otra cuenta ya creada) y *Monto Inicial*.

En el caso que querramos ver mayor información acerca de cada cuenta, debemos hacer click en cualquier de cards de la ***cuenta***. Este actualizará nuestra *cuenta activa* y podremos ver en el lado derecho de la pantalla la cuenta seleccionada y sus transacciones.

En el card nuevo, veremos dos botones, Ingresar y Retirar, los cuales nos permitirán ***Depositar*** dinero en dicha cuenta o ***Retirarlo*** donde debemos ingresar el monto que querramos.

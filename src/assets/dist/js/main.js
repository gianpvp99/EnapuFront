async function  listAll(urlbase) {
    try {
      const response = await fetch(urlbase); // URL de la API
        if (!response.ok) {
        throw new Error('Error al consumir la API'); // Manejo de errores si la respuesta no es exitosa
        }

      const data = await response.json(); // Convertir la respuesta a formato JSON
      console.log(data);
      return data
       // Hacer algo con los datos de la API
    } catch (error) {
        console.error(error);
    }
}

async function searchId(params ,urlbase ){
    urlbase =urlbase;
    // Generar la URL con los parámetros
    const url = new URL(urlbase);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al consumir la API'); // Manejo de errores si la respuesta no es exitosa
        }
        const data = await response.json(); // Convertir la respuesta a formato JSON
        console.log(data);
        return data
    }catch{
        console.error(error);
    }
    
}
/*
    OPTIONS 
    0 AGREGAR
    1 ACTUALIZAR
    2 ACTIVAR
    3 LOG ELIMINACION

*/

async function Mantenimiento(params, urlbase) {
    try {
        const url = urlbase + "maintenance";
        const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
        });

        if (!response.ok) {
        throw new Error('Error en la solicitud'); // Manejo de errores si la respuesta no es exitosa
        }
  
        const data = await response.json();
      // Manejar los datos de la respuesta JSON
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
  }
  
/**
 * Función para obtener un File a partir de un base64.
 *
 * @param url - Archivo en base64
 * @param filename - Nombre del archivo
 * @returns - Retorna el archivo
 */
export const urlToFile = (
  url,
  filename = `created_file_${new Date().toISOString()}`
): Promise<File> =>
  fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], filename))
    .catch(() => null);

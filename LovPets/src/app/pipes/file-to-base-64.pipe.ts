import { Pipe, PipeTransform } from "@angular/core";

/**
 * Pipe que convierte un archivo a base64.
 */
@Pipe({
  name: "fileToBase64",
})
export class FileToBase64Pipe implements PipeTransform {
  /**
   * Función que convierte un archivo a base64.
   *
   * @param file - Archivo a convertir a base64
   * @returns - Retorna el archivo convertido a base64
   */
  async transform(file: File): Promise<string> {
    return new Promise((resolve, _) => {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.onerror = () => {
          resolve(null);
        };
      } else {
        resolve(null);
      }
    });
  }
}

import { ComponentType } from '@angular/cdk/portal';
/**
 * Interface que define la configuración que se le puede pasar a un crud dialog
 */
export interface Marco {
  /**
   * Titulo del dialog
   */
  title: string;
  /**
   * Componente que se mostrará en el dialog: Deberá ser importado en la sección EntryComponents del módulo
   */
  component: ComponentType<any>;
  /**
   * Data que recibirá el componente que se mostrará en el dialog, deberá incluir en su constructor una inyección de MAT_DIALOG_DATA
   */
  dataComponent: any;
  /**
   * Ancho máximo del dialog
   */
  maxWidth?: string;

  /**
   * Acciones que recibirá el dialog
   */
  actions?: {
    /**
     * Nombre que tendrá la acción primaria
     */
    primary?: string;
    /**
     * Nombre que tendrá la acción secundaria
     */
    secondary?: string;
  };
}

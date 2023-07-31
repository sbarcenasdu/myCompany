import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

const BASE_URL: String = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public httpOptions: any = {};
  constructor(private http: HttpClient) {
    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }

  /**
* Método de servicio para obtener todos los productos
*/
  public getProducts = () => {
    return this.http.get(`${BASE_URL}/products`, this.httpOptions).pipe(
      map(resp => resp)
    )
  }

  /**
  * Método de servicio para actualizar productos
  * @param formData => Información del formulario (modal editar usuario)
  */
  public updateProductService = (formData: any) => {
    const json = {
      name: formData.name,
      description: formData.description,
      valor: formData.valor,
      imageUrl: formData.image
    }
    return this.http.patch(`${BASE_URL}/products/${formData.itemId}`, json, this.httpOptions).pipe(
      map(resp => resp)
    )
  }

  /**
  * Método de servicio para eliminar productos
  * @param formData => Información del formulario (modal editar usuario)
  */
  public deleteItemService = (id: any) => {
    return this.http.delete(`${BASE_URL}/products/${id}`, this.httpOptions).pipe(
      map(resp => resp)
    )
  }
}

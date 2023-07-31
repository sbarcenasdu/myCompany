import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from './services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EasyNET_test';
  public dataProducts: Array<any> = [];

  public actualizarItemForm = this.fb.group({
    itemId: [''],

    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    valor: ['', [Validators.required]],
    image: ['', [Validators.required]]

  });

  constructor(
    private prdSrv: ProductsService,
    private fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.getProducts();
  }
  public getProducts = () => {
    this.prdSrv.getProducts().subscribe((resp: any) => {
      this.dataProducts = resp;
      console.log(this.dataProducts);
    })
  }

  openModalItem(item: any) {
    console.log(item);
    this.actualizarItemForm.patchValue({
      itemId: item.id,
      name: item.name,
      description: item.description,
      valor: item.valor,
      image: item.imageUrl

    });
  }

  actualizarItem() {
    this.prdSrv.updateProductService(this.actualizarItemForm.value).subscribe((resp: any) => {
      Swal.fire('Bien hecho!', `Producto actualizado correctamente`, 'success');
      setTimeout(() => { this.getProducts() }, 2000);
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    })
  }

  eliminarItem(item: any) {
    console.log(item);
    Swal.fire({
      title: 'Desea eliminar el item ' + item.id + '?',
      showCancelButton: true,
      confirmButtonText: `Aceptar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.prdSrv.deleteItemService(item.id).subscribe((resp: any) => {
          Swal.fire('Bien hecho!', `Producto Eliminado`, 'success');
          setTimeout(() => { this.getProducts() }, 2000);
        }, (err) => {
          console.log(err.error.msg);
          Swal.fire('Error', err.error.msg, 'error');
        })
      }
    })
  }
}

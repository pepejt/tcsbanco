import { Component } from '@angular/core';
import { ProductService } from './services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductInterface } from './interfaces/product.interface';
import { SlicePipe } from '@angular/common';
import { DateformatPipe } from './pipes/dateformat.pipe';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'banco';

}

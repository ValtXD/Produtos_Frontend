import {Component, OnInit} from '@angular/core';
import {Client} from '../../shared/models/client';
import {HttpClient, HttpParams} from '@angular/common/http';
import {URLS} from '../../shared/urls';
import {Observable} from 'rxjs';
import {HttpOptions} from '../../shared/http/http-options';
import {MatCard} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {BaseService} from '../../shared/services/base.service';
import {Employee} from '../../shared/models/employee';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    MatCard,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatIconButton,
    MatInput,
    MatIcon,
    MatPaginator,
    MatButton,
    MatFabButton,
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {
  public dataSource: Client[] = [];
  public displayedColumns:string[] = ['id', 'name', 'age','rg','cpf','actions'];
  public searchValue:string = '';
  public searchQtd: string = '';

  // @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;

  private router:Router = new Router();

  private service: BaseService<Client>;


  constructor(private http: HttpClient) {
    this.service = new BaseService<Client>(http,URLS.CLIENT);
  }

  public ngOnInit(): void {
    this.search();
  }

  public search(resetIndex: boolean = false): void {
    this.service.clearParameter();
    this.service.addParameter('age',this.searchQtd);
    this.service.addParameter('name', this.searchValue);
    this.service.getAll().subscribe({
      next: (data: Client[]) => {
        this.dataSource = data;
      },
      error: (_) => {
        console.error('Error loading Clients');
      }
    });
  }

  public deleteObject(id:number): void{
    this.service.delete(id).subscribe({
      next:(_)=>{
        this.search();
      },
      error:(_)=>{
        console.error('Error deleting product');
      }
    });
  }

  public goToPage(route:string):void{
    const extras: NavigationExtras = {queryParamsHandling:'merge'};
    this.router.navigate([route],extras).then();
  }


}

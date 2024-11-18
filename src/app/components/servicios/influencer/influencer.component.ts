import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon'
import { RouterModule } from '@angular/router';
import { Servicios } from '../../../models/servicios';
import { ServiciosService } from '../../../services/servicios.service';


@Component({
  selector: 'app-influencer',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule],
  templateUrl: './influencer.component.html',
  styleUrl: './influencer.component.css'
})

export class InfluencerComponent implements OnInit {
  dataSource: MatTableDataSource<Servicios> = new MatTableDataSource();
  
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  constructor(private Ss: ServiciosService) {}
  ngOnInit(): void {
  
    this.Ss.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.Ss.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  
}

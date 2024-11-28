import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CheckpointModel } from 'src/app/core/models/checkpoint.model';
import { CheckpointService } from 'src/app/core/services/checkpoint/checkpoint.service';

@Component({
  selector: 'app-checkpoint-page',
  templateUrl: './checkpoint-page.component.html',
  styleUrls: ['./checkpoint-page.component.scss'],
})
export class CheckpointPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'sonda',
    'uo',
    'campo',
    'poco',
    'intervencao',
    'simulado',
    'concluido',
    'avaliacao',
    'prazo',
  ];
  dataSource: MatTableDataSource<CheckpointModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private checkpointService: CheckpointService) {
    this.dataSource = new MatTableDataSource<CheckpointModel>();
  }

  ngOnInit(): void {
    this.getCheckpointData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCheckpointData(): void {
    this.checkpointService.getAll().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

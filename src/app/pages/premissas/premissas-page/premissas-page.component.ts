import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PremissaModel } from 'src/app/core/models/premissa.model';
import { PremissaService } from 'src/app/core/services/premissas/premissa.service';

import { PremissasDialogComponent } from '../premissas-dialog/premissas-dialog.component';
@Component({
  selector: 'app-premissas-page',
  templateUrl: './premissas-page.component.html',
  styleUrls: ['./premissas-page.component.scss'],
})
export class PremissasPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'version', 'type', 'associate', 'cycle', 'description'];
  dataSource: MatTableDataSource<PremissaModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private premissaService: PremissaService,
    public dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource<PremissaModel>();
  }

  ngOnInit(): void {
    this.getCheckpointData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCheckpointData(): void {
    this.premissaService.getAll().subscribe(data => {
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

  openDialog(): void {
    const dialogRef = this.dialog.open(PremissasDialogComponent, {
      width: '800px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The modal was closed');
    });
  }
}

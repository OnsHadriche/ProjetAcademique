import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ArticleService } from '../article.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { Article } from 'src/Modeles/Article';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['1', '2', '3', '4', '5'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private AS: ArticleService, private dialog: MatDialog) {}
  tabArticles: Article[] = [];
  getAllData(): void {
    this.AS.GETALL().subscribe((res) => {
      this.tabArticles = res;
      this.dataSource = new MatTableDataSource<any>(this.tabArticles);
      this.dataSource.paginator = this.paginator;
    });
  }
  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource<any>(this.AS.tab1);
    this.getAllData();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: ' ',
      type: ' ',
      titre: ' ',
      date: ' ',
      sourcePDF: ' ',
      lien: ' ',
    };

    this.dialog.open(ArticleFormComponent, dialogConfig);

    const dialogRef = this.dialog.open(ArticleFormComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe((data) => console.log('Dialog output:', data));
  }
  selectedElement?:Article
  openDialog2(element: Article):void {
    this.selectedElement=element;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: this.selectedElement.id,
      type:this.selectedElement.type,
      titre: this.selectedElement.titre,
      date: this.selectedElement.date,
      sourcePDF: this.selectedElement.sourcePDF,
      lien: this.selectedElement.lien,

    };

    this.dialog.open(ArticleFormComponent, dialogConfig);

    const dialogRef = this.dialog.open(ArticleFormComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe((data) => console.log('Dialog output:', data));
  }
  // openDialog2(id: string): void {
  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   this.AS.getArticleById(id).subscribe((r) => {(dialogConfig.data = r)
  //   console.log(r)}
  // );

  //   this.dialog.open(ArticleFormComponent, dialogConfig);

  //   const dialogRef = this.dialog.open(ArticleFormComponent, dialogConfig);

  //   dialogRef
  //     .afterClosed()
  //     .subscribe((data) => console.log('Dialog output:', data));
  // }

  delete(id: string): void {
    //1 ouvrir la boite de dialogue
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '400px',
      width: '600px',
    });
    //2 attendre le resultat de l'utilisateur

    //3 if click sur confirm=>
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

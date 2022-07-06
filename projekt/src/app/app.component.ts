import { Component, ViewChild } from '@angular/core';
import { DataService } from './service/dataService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(MatPaginator, { static: true}) private readonly paginator!: MatPaginator;

  selectedIndex: number = 0;
  dataSource:any = [];
  displayedColumns: any = [];
  tableData:any = [];
  showBox: boolean = false;
  boxTitle: string = "";
  anlegen:boolean = false;
  updaten:boolean = false;
  newEntry: any;

  product: any = [
    "","","","","","","","","","","","","","",""
  ];  
  
  constructor(
		private data: DataService,
  ) {

  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
		this.data.getAll().subscribe(
			(data: any) => {
        this.displayedColumns = data[0];
        data.shift();
        this.tableData = data;
        console.log(data)
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;

      }
		);
  }

  editArticle(val:any) {
    this.boxTitle = "Artikel ändern";
    this.product = val;
    this.showBox = true;
    this.updaten = true;
  }

  newArticle() {
    this.boxTitle = "Neuer Artikel";
    this.product = [
      "","","","","","","","","","","","","","",""
    ];
    this.showBox = true;
    this.anlegen = true;
  }

  updateData() {
    let newData: any = [this.displayedColumns];
    newData = newData.concat(this.dataSource.data);
    this.data.update(newData).subscribe(
      (data: any) => {
        this.getData();
        console.log(data);
        this.cancel();
      }
    );
  }

  createNew() {
    let newData:any = this.dataSource.data;
    if(this.product.length < 16) {
      this.product.push("");
    }
    newData = newData.concat([this.product]);
    if(this.product[0] != "") {
      this.data.update(newData).subscribe(
        (data: any) => {
          this.getData();
          console.log(data);
          this.cancel();
        }
      );
    }
  }

  cancel(){
    this.product = [
      "","","","","","","","","","","","","","",""
    ];
    this.showBox = false;
    this.anlegen = false;
    this.updaten = false;
  }

	onTabChange(e:any) {
		this.selectedIndex = e;
	}

}

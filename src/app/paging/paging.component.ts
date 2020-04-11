import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-paging",
  templateUrl: "./paging.component.html",
  styleUrls: ["./paging.component.css"]
})
export class PagingComponent implements OnInit {
  page: number = 1;

  @Output() newPage = new EventEmitter();

  previousClicked() {
    if (this.page > 1) {
      this.newPage.emit((this.page -= 1));
    }
  }

  nextClicked() {
    this.newPage.emit((this.page += 1));
    console.log(this.page);
  }

  constructor() {}

  ngOnInit(): void {}
}

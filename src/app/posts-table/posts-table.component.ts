import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { PostService } from "../post.service";
import { Router } from "@angular/router";
import { BlogPost } from "../BlogPost";
@Component({
  selector: "app-posts-table",
  templateUrl: "./posts-table.component.html",
  styleUrls: ["./posts-table.component.css"]
})
export class PostsTableComponent implements OnInit {
  @Output() btnClicked = new EventEmitter();
  constructor(private postData: PostService, private router: Router) {}
  blogPosts: Array<BlogPost> = [];
  ngOnInit(): void {
    this.postData.getAllPosts().subscribe(data => (this.blogPosts = data));
  }

  rowClicked(e, id) {
    console.log(id);
    this.router.navigate(["/admin/post", id]);
  }
}

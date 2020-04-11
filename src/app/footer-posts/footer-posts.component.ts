import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { BlogPost } from "../BlogPost";
import { PostService } from "../post.service";
@Component({
  selector: "app-footer-posts",
  templateUrl: "./footer-posts.component.html",
  styleUrls: ["./footer-posts.component.css"]
})
export class FooterPostsComponent implements OnInit {
  constructor(private postData: PostService) {}
  posts: Array<BlogPost>;

  ngOnInit(): void {
    this.postData.getPosts(1, null, null).subscribe(
      data => (this.posts = data.slice(0, 3)),
      err => console.log("ERROR!!!!!!" + err.message)
    );
    
  }
}

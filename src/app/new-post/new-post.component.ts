import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { Router } from "@angular/router";
import { BlogPost } from "../BlogPost";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.css"]
})
export class NewPostComponent implements OnInit {
  blogPost: BlogPost = new BlogPost();
  tags: string;
  constructor(private router: Router, private postData: PostService) {}

  ngOnInit(): void {}

  formSubmit(f: NgForm) {
    // this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());

    this.postData.newPost(this.blogPost).subscribe(
      data => (
        (this.blogPost = data),
        (this.blogPost.isPrivate = false),
        //this.blogPost.postDate = new Date().toLocaleDateString,
        (this.blogPost.postedBy = "WEB422 Student"),
        (this.blogPost.views = 10)
      )
    );
    this.router.navigate(["/admin"]);
    console.log(f.value);
  }
}

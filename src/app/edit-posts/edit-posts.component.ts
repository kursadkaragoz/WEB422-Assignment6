import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { Router, ActivatedRoute } from "@angular/router";
import { BlogPost } from "../BlogPost";
import { NgForm } from "@angular/forms";
@Component({
  selector: "app-edit-posts",
  templateUrl: "./edit-posts.component.html",
  styleUrls: ["./edit-posts.component.css"]
})
export class EditPostsComponent implements OnInit {
  blogPost: BlogPost;
  tags: string;
  constructor(
    private postData: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    this.postData
      .getPostById(id)
      .subscribe(
        data => (
          (this.blogPost = data), (this.tags = this.blogPost.tags.toString())
        )
      );
  }
  formSubmit(f: NgForm) {
    this.blogPost.tags =this.tags.split(",").map(tag => tag.trim());
    this.router.navigate(['/admin']);
    this.postData.updatePostById(this.blogPost._id, this.blogPost).subscribe(data => (this.blogPost= data));
    
  }

  deletePost(e, id) {
    this.postData.deletePostById(id).subscribe(data => (this.blogPost= data))
    //this.router.navigate(['/admin']);
    console.log(id);
  }
}

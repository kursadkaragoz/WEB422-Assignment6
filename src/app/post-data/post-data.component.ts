import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BlogPost } from "../BlogPost";
import { Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "../post.service";

@Component({
  selector: "app-post-data",
  templateUrl: "./post-data.component.html",
  styleUrls: ["./post-data.component.css"]
})
export class PostDataComponent implements OnInit {
  post: BlogPost;
  querySub: any;
  commentName: string;
  commentText: string;

  private postSub;
  constructor(private route: ActivatedRoute, private postData: PostService) {}

  ngOnInit() {
    let id = this.route.snapshot.params["id"];
    this.postSub = this.postData
      .getPostById(id)
      .subscribe(
        data => (
          (this.post = data),
          this.post.views++,
          this.postData.updatePostById(this.post._id, this.post).subscribe()
        )
      );
  }
  submitComment(f: NgForm) {
    var obj = {
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString()
    };
    this.post.comments.push(obj);
    this.postData
      .updatePostById(this.post._id, this.post)
      .subscribe(data => (this.post = data));
    //Once the updatePostById() has completed (ie: in the first "subscribe" callback method), reset the values of this.commentName & this.commentText
    this.commentName = null;
    this.commentText = null;
  }

  ngOnDestroy() {
    if (this.querySub) this.querySub.unsubscribe();
  }
}

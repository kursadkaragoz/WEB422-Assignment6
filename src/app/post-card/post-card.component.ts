import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { BlogPost } from "../BlogPost";
import { ActivatedRoute } from "@angular/router";
import { PostService } from '../post.service';
@Component({
  selector: "app-post-card",
  templateUrl: "./post-card.component.html",
  styleUrls: ["./post-card.component.css"]
})
export class PostCardComponent implements OnInit {
  blogPosts: Array<BlogPost>;
  private postsSub;
  page: number = 1;
  tag: string = null;
  category: string = null;
  querySub: any;
  @Input() post: BlogPost;
  hi: string = "";
  constructor(private route: ActivatedRoute, private postData: PostService) {}

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params => {
      if (params["tag"]) {
        this.tag = params["tag"];
        this.category = null;
      } else {
        this.tag = null;
      }
      if (params["category"]) {
        this.category = params["category"];
        this.tag = null;
      } else {
        this.category = null;
      }
      this.getPage(+params["page"] || 1);
    });
  }

  getPage(num) {
    this.postsSub = this.postData
      .getPosts(this.page, this.tag, this.category)
      .subscribe(
        data => (this.blogPosts = data),
        err => console.log("ERROR!!!!!!" + err.message)
      );
  }

  ngOnDestroy() {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
}
}

import { Component, OnInit, Input } from "@angular/core";
import { PostService } from "../post.service";
import { BlogPost } from "../BlogPost";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"]
})
export class BlogComponent implements OnInit {
  blogPosts: Array<BlogPost>;
  @Input() page: number = 2;
  tag: string = null;
  category: string = null;
  querySub: any;

  private postsSub;

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
    console.log(this.page);
  }

  ngOnDestroy() {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }
}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { BlogComponent } from "./blog/blog.component";
import { PostComponent } from "./post/post.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PostCardComponent } from "./post-card/post-card.component";
import { PostsTableComponent } from "./posts-table/posts-table.component";
import { EditPostsComponent } from "./edit-posts/edit-posts.component";
import { NewPostComponent } from "./new-post/new-post.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "blog", component: BlogComponent },
  { path: "post/:id", component: PostComponent },
  { path: "post-card", component: PostCardComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "admin", component: PostsTableComponent },
  { path: "admin/post/:id", component: EditPostsComponent },
  { path: "admin/newPost", component: NewPostComponent },
  { path: "**", component: PageNotFoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error = null;
  @ViewChild('postForm') form: NgForm;
  private errorSubscription: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.fetchPosts();
    this.listenToError();
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  listenToError() {
    this.errorSubscription = this.postService.error.subscribe(data => this.error = data);
  }

  onCreatePost(postData: Post) {
    this.postService.creatPost(postData);
    this.form.reset();
    setTimeout(() => {
      this.fetchPosts();
    }, 1000);
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => this.loadedPosts = []);
  }

  onHandleError(): void {
    this.error = null;
  }

  fetchPosts() {
    this.isFetching = true;

    this.postService.getPosts().subscribe((data: Post[]) => {
      data?.length > 0 ? this.loadedPosts = data : this.loadedPosts = [];
    }, error => {
      this.error = error?.error?.error;
      this.isFetching = false;
    }, () => this.isFetching = false);
  }
}

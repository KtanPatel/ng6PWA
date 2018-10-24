import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Item } from './api.service';

import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Angular PWA Demo App';
  // update: boolean;
  items: Array<Item>;
  joke: any;
  constructor(private apiService: ApiService, private swUpdate: SwUpdate, private snackbar: MatSnackBar) {
    if (!this.swUpdate.isEnabled) {
      console.log('Nope 🙁');
    }
    this.swUpdate.available.subscribe(evt => {
      // this.update = true;
      // this.swUpdate.activateUpdate().then(() => document.location.reload());
      const snack = this.snackbar.open('Update Available', 'Reload');

      snack
        .onAction()
        .subscribe(() => {
          window.location.reload();
        });

      // snack.setTimeout(() => {
      //   snack.dismiss();
      // }, 6000);
    });
  }
  ngOnInit(): void {
    this.getJokes();
    this.fetchData();
  }
  fetchData() {
    this.apiService.fetch().subscribe((data: Array<Item>) => {
      console.log(data);
      this.items = data;
    }, (err) => {
      console.log(err);
    });
  }
  getJokes() {
    this.apiService.gimmeJokes().subscribe(res => {
      this.joke = res;
    });
  }
}

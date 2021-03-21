import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError} from 'rxjs';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  posts: Observable<any>|undefined

  urlAPI = "https://restgraphql.azurewebsites.net/";

  isLoading = true;

  produits: any[]|undefined;

  constructor(private http: HttpClient) { 
  }

  ngOnInit(): void {
    console.log("test");
    var liste;
    var url = this.urlAPI;
    url = url.concat('produit');
    this.posts = this.http.get(url);
    this.posts.subscribe((value) => {
       this.produits = value["produit"];
       this.isLoading = false;
       console.log(value);
    });
  }

}

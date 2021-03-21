import { Component, OnInit, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError} from 'rxjs';
import { Injectable } from '@angular/core'; 

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {

  @Input() nom: string|undefined;
  @Input() prix: string|undefined;
  @Input() poids: string|undefined;
  prixTotal = 0;
  numeroCarte: number|undefined;
  posts: Observable<any>|undefined

  urlAPI = "https://restgraphql.azurewebsites.net/";


  constructor(private http: HttpClient) {
  }

  onTotalClicked(){
    //this.prixTotal = 0;
    console.log("bien cliqué");
    var url = this.urlAPI;
    url = url.concat('soap/' + this.prix?.toString() + "/" + this.poids?.toString() );
    this.posts = this.http.get(url);
    this.posts.forEach(async (value) => {
      this.prixTotal = await value[0];
      console.log(this.prixTotal);
    });
  }

  onCommandClicked(){
    console.log("ça marche");
    var numAValider = this.numeroCarte?.toString();
    var url = this.urlAPI;
    url = url.concat('verification' + "/" + this.numeroCarte?.toString());
    this.posts = this.http.get(url);
    this.posts.forEach(async (value) => {
      var res = await value["result"];
      console.log(res);
    })
  }

  ngOnInit(): void {
  }

}

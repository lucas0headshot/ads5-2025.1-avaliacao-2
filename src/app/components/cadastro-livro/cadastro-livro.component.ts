import { Component, Input, OnInit } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonInput, IonItem, IonSelect, IonSelectOption, IonTextarea } from "@ionic/angular/standalone";
import { Autor } from 'src/types/Autor';
import { Livro } from 'src/types/Livro';

@Component({
  selector: 'app-cadastro-livro',
  templateUrl: './cadastro-livro.component.html',
  styleUrls: ['./cadastro-livro.component.scss'],
  imports: [IonTextarea, IonIcon, IonButton, IonInput, IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonSelect, IonSelectOption]
})
export class CadastroLivroComponent  implements OnInit {

  @Input() livro!: Livro;

  public autores: Autor[] = [];

  constructor() { }

  ngOnInit() {}

}

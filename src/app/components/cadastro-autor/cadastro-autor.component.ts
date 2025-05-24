import { Component, Input, OnInit } from '@angular/core';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonSelect, IonSelectOption, IonCard, IonCardContent, IonCardTitle, IonCardHeader } from "@ionic/angular/standalone";
import { Autor } from 'src/types/Autor';

@Component({
  selector: 'app-cadastro-autor',
  templateUrl: './cadastro-autor.component.html',
  styleUrls: ['./cadastro-autor.component.scss'],
  imports: [IonCardHeader, IonCardTitle, IonCardContent, IonCard, IonIcon, IonButton, IonInput, IonContent, IonItem, IonSelect, IonSelectOption]
})
export class CadastroAutorComponent  implements OnInit {

  @Input() autor!: Autor

  constructor() { }

  ngOnInit() {}

}

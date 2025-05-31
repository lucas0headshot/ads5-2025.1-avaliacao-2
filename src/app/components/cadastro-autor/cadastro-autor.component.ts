import { Component, EventEmitter, inject, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonSelect, IonSelectOption, IonCard, IonCardContent, IonCardTitle, IonCardHeader } from "@ionic/angular/standalone";
import { AutorService } from 'src/app/services/autor/autor.service';
import { Autor } from 'src/types/Autor';

@Component({
  selector: 'app-cadastro-autor',
  templateUrl: './cadastro-autor.component.html',
  styleUrls: ['./cadastro-autor.component.scss'],
  imports: [IonCardHeader, IonCardTitle, IonCardContent, IonCard, IonIcon, IonButton, IonInput, IonContent, IonItem, IonSelect, IonSelectOption, FormsModule]
})
export class CadastroAutorComponent {
  private service: AutorService = inject(AutorService);

  constructor() {
    this.autor = {
      nome: '',
      sobrenone: '',
      dataNascimento: new Date(),
      email: '',
      nacionalidade: 'brasileiro',
    }
  }

  @Input() autor!: Autor;

  @Input() criadoOuAtualizado = (): any => {};

  criarOuAtualizar(): void
  {
    if (!this.autor || !this.autor.nome || !this.autor.sobrenone || !this.autor.dataNascimento || !this.autor.email) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    this.service.createOrUpdate(this.autor);
    this.criadoOuAtualizado();
  }
}

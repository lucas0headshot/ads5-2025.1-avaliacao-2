import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonInput, IonItem, IonSelect, IonSelectOption, IonTextarea } from "@ionic/angular/standalone";
import { AutorService } from 'src/app/services/autor/autor.service';
import { LivroService } from 'src/app/services/livro/livro.service';
import { Autor } from 'src/types/Autor';
import { Livro } from 'src/types/Livro';

@Component({
  selector: 'app-cadastro-livro',
  templateUrl: './cadastro-livro.component.html',
  styleUrls: ['./cadastro-livro.component.scss'],
  imports: [IonTextarea, IonIcon, IonButton, IonInput, IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonSelect, IonSelectOption]
})
export class CadastroLivroComponent implements OnInit {
  constructor() {
    this.livro = {
      id: "",
      autor: { nome: '', sobrenone: '', nacionalidade: 'brasileiro', dataNascimento: new Date(), email: '' },
      titulo: '',
      subtitulo: '',
      dataPublicacao: new Date(),
      editora: '',
    }
  }
  
  @Input() livro!: Livro;

  public autores: Autor[] = [];

  private autorService: AutorService = inject(AutorService);
  private livroService: LivroService = inject(LivroService);

  @Input() criadoOuAtualizado = (): void => {};

  ngOnInit(): void
  {
    this.carregarAutores();
  }

  private async carregarAutores(): Promise<void>
  {
    this.autores = await this.autorService.findAll();
  }

  criarOuAtualizar(): void
  {
    if (!this.livro || !this.livro.titulo || !this.livro.autor || !this.livro.dataPublicacao || !this.livro.editora) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    this.livroService.createOrUpdate(this.livro);
    this.criadoOuAtualizado();
  }
}

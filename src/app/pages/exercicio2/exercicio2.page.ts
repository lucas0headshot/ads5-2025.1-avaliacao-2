import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonLabel, IonItem, IonButton, IonIcon, IonText, ModalController } from '@ionic/angular/standalone';
import { Observable, of } from 'rxjs';
import { Livro } from 'src/types/Livro';
import { CadastroLivroComponent } from 'src/app/components/cadastro-livro/cadastro-livro.component';
import { LivroService } from 'src/app/services/livro/livro.service';

@Component({
  selector: 'app-exercicio2',
  templateUrl: './exercicio2.page.html',
  styleUrls: ['./exercicio2.page.scss'],
  standalone: true,
  imports: [IonText, IonIcon, IonButton, IonItem, IonLabel, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, AsyncPipe]
})
export class Exercicio2Page implements OnInit {
  public livros$!: Observable<Livro[]>;
  
  private modalController = inject(ModalController)

  private service: LivroService = inject(LivroService);

  ngOnInit(): void
  {
    this.carregarTodos();
  }

  private carregarTodos(): void
  {
    this.livros$ = this.service.findAll();
  }

  public async abrirAdicionar(livro?: Livro) {
    if (!livro) {
      livro = {
        id: "",
        autor: { nome: '', sobrenone: '', nacionalidade: 'brasileiro', dataNascimento: new Date(), email: '' },
        titulo: '',
        subtitulo: '',
        dataPublicacao: new Date(),
        editora: '',
      };
    }

    const modal = await this.modalController.create({
      component: CadastroLivroComponent,
      breakpoints: [0.5, 0.75, 0.95],
      initialBreakpoint: 0.75,
      componentProps: {
        livro: livro
      }
    })

    modal.present()
    modal.onDidDismiss().then(() => this.carregarTodos());
  }

  private fecharErecarregar(): void
  {
    this.carregarTodos();
    this.modalController.dismiss();
  }

  editar(livro: Livro): void
  {
    this.abrirAdicionar(livro);
  }
  
  excluir(livro: Livro): void
  {
    if (!confirm(`Você tem certeza que deseja excluir o livro "${livro.titulo}"?`)) 
      return;

    this.service.delete(livro)
      .subscribe({
        next: () => {
          this.fecharErecarregar();
          alert('Livro excluído com sucesso!');
        }
        ,error: (err) => {
          console.error('Erro ao excluir livro:', err);
          alert('Erro ao excluir livro. Tente novamente mais tarde.');
        }
      });
    this.carregarTodos();
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from 'src/types/Livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private http = inject(HttpClient);
  private readonly API_URL = "http://172.16.86.132:3000/livros";

  public findAll(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.API_URL);
  }

  public findById(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.API_URL}/${id}`);
  }

  public create(livro: Livro): Observable<void> {
    return this.http.post<void>(this.API_URL, livro);
  }

  public createOrUpdate(livro: Livro): Observable<void> {
    if (livro.id)
      return this.http.put<void>(`${this.API_URL}/${livro.id}`, livro);

    return this.http.post<void>(this.API_URL, livro);
  }

  public save(livro: Livro): Observable<void> {
    if (livro.id)
      return this.http.put<void>(`${this.API_URL}/${livro.id}`, livro);

    return this.http.post<void>(this.API_URL, livro);
  }

  public delete(livro: Livro): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${livro.id}`);
  }
}

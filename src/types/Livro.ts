import { Autor } from "./Autor"

export type Livro = {
    id: string,
    titulo: string,
    subtitulo?: string,
    sinopse?: string,
    dataPublicacao: Date,
    autor: Partial<Autor>,
    editora: string
}
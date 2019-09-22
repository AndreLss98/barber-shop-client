interface conversa {
    minhasMensagens: {
        mensagen: string,
        hora: string
    }[],
    barbeiroMensagens: {
        mensagen: string,
        hora: string
    }[]
}

export interface chat {
    nome: string,
    conversas: conversa
}
// api/ask-guide.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

// A forma mais direta de ler a variável no ambiente Vercel
const API_KEY = process.env.VITE_GEMINI_API_KEY;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Verificação de segurança: Apenas aceitamos requisições POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  // Verificação de segurança: Garantir que a chave da API foi carregada
  if (!API_KEY) {
    console.error("ERRO GRAVE: A chave da API do Gemini não está configurada nas Variáveis de Ambiente da Vercel.");
    return res.status(500).json({ error: 'Erro de configuração do servidor.' });
  }

  try {
    const { locationName, question } = req.body;
    if (!locationName || !question) {
      return res.status(400).json({ error: 'Nome do local e pergunta são obrigatórios.' });
    }
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = `
      Você é "Iara", uma guia turística historiadora, apaixonada e especialista na cidade de Manaus. Seu tom é amigável e informativo.
      Um usuário está a visitar o local: "${locationName}".
      Ele fez a seguinte pergunta: "${question}".
      Responda à pergunta de forma concisa e interessante. Se a pergunta for fora de tópico, gentilmente o traga de volta ao assunto.
    `;

    const result = await model.generateContent(prompt);
    const answer = result.response.text();
    
    // Enviando a resposta de volta para o frontend
    return res.status(200).json({ answer });

  } catch (error: any) {
    console.error('[ERRO DA API GEMINI]', error);
    return res.status(500).json({ error: `Desculpe, a IA encontrou um erro: ${error.message}` });
  }
}
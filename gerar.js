// API PixUp - rota gerar
export default async function handler(req, res) {
  try {
    const { valor, descricao } = req.query;

    if (!valor) {
      return res.status(400).json({ erro: "Informe o valor" });
    }

    // Substitua pela sua API_KEY da PixUp
    const API_KEY = process.env.PIXUP_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({ erro: "PIXUP_API_KEY não configurada" });
    }

    const resposta = await fetch("https://api.pixup.com.br/checkout/pix", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        amount: Number(valor),
        description: descricao || "Pagamento via Pix"
      })
    });

    const dados = await resposta.json();
    res.status(200).json(dados);

  } catch (err) {
    res.status(500).json({ erro: "Erro interno", detalhes: err.message });
  }
}

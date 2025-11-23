// gera.js
import axios from "axios";

const PIXUP_API_KEY = "7f89d83944144f540b4120d449e114d14760806517bd875b2a001a61cb80e169";

async function gerarPix(valor, descricao = "Pagamento") {
  try {
    const response = await axios.post(
      "https://api.pixup.com.br/pix/qrcode",
      {
        valor: valor,
        descricao: descricao
      },
      {
        headers: {
          Authorization: `Bearer ${PIXUP_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;
  } catch (erro) {
    console.error("Erro ao gerar PIX:", erro.response?.data || erro);
    return null;
  }
}

// Exemplo de uso:
(async () => {
  const pagamento = await gerarPix(69.90, "Compra de Árvore de Natal");

  if (pagamento) {
    console.log("QR Code Base64:", pagamento.qrcode);
    console.log("Pix Copia e Cola:", pagamento.copiaecola);
  }
})();

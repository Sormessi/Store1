const express = require('express');
const router = express.Router();
const axios = require('axios');

// Endpoint para manejar la compra
router.post('/purchase', async (req, res) => {
  const { cart } = req.body;

  // Aquí puedes agregar la lógica para enviar la información de la compra al servidor de Minecraft
  try {
    // Ejemplo de solicitud al servidor de Minecraft
    await axios.post('http://your_minecraft_server_url/command', { command: '/give @a diamond' });
    res.status(200).send('Command executed successfully');
  } catch (error) {
    res.status(500).send('Error executing command');
  }
});

module.exports = router;

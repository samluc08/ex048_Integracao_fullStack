const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());
app.use(express.static('public'));

let tarefas = [], nextId = 1;

app.get('/api/tarefas', (req, res) => {
  res.status(200).json(tarefas);
});

app.post('/api/tarefas', (req, res) => {
  const { titulo } = req.body;

  if (!titulo || typeof titulo !== 'string' || !titulo.trim()) {
    return res.status(400).json({ erro: 'Campo "titulo" é obrigatório.' });
  }

  const tarefa = { id: nextId++, titulo: titulo.trim() };
  tarefas.push(tarefa);
  res.status(201).json(tarefa);
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
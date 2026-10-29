const db = require('../data/tickets');

function listar(req, res) {
    let resultados = db.obtenerTodos();
    const { estado, tecnicoAsignado } = req.query;

    if (estado) {
        resultados = resultados.filter(t => t.estado.toLowerCase() === estado.toLowerCase());
    }
    if (tecnicoAsignado) {
        resultados = resultados.filter(t => t.tecnicoAsignado.toLowerCase().includes(tecnicoAsignado.toLowerCase()));
    }

    res.json(resultados);
}

function obtener(req, res) {
    const id = parseInt(req.params.id);
    const ticket = db.obtenerPorId(id);
    if (!ticket) {
        return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    res.json(ticket);
}

function crear(req, res) {
    const { titulo, descripcion, prioridad, tecnicoAsignado } = req.body;
    if (!titulo) {
        return res.status(400).json({ error: 'El campo título es obligatorio' });
    }
    const nuevo = db.crear({ titulo, descripcion, prioridad, tecnicoAsignado });
    res.status(201).json(nuevo);
}

function actualizar(req, res) {
    const id = parseInt(req.params.id);
    const actualizado = db.actualizar(id, req.body);
    if (!actualizado) {
        return res.status(404).json({ error: 'Ticket no encontrado para actualizar' });
    }
    res.json(actualizado);
}

function eliminar(req, res) {
    const id = parseInt(req.params.id);
    const eliminado = db.eliminar(id);
    if (!eliminado) {
        return res.status(404).json({ error: 'Ticket no encontrado para eliminar' });
    }
    res.status(204).send();
}

function listarTecnicos(req, res) {
    res.json(db.obtenerTecnicos());
}

module.exports = { listar, obtener, crear, actualizar, eliminar, listarTecnicos };

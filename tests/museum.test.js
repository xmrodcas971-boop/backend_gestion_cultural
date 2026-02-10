const request = require('supertest');

jest.mock('../services/museumService', () => ({
  getAllMuseums: jest.fn(),
  getMuseumById: jest.fn(),
  createMuseum: jest.fn(),
  updateMuseum: jest.fn(),
  deleteMuseum: jest.fn(),
  getMuseumsByBudgetRange: jest.fn(),
  getMuseumsBetweenDates: jest.fn(),
  getMuseumsDataGraph: jest.fn(),
}));

jest.mock('../services/roomService', () => ({
  getAllRooms: jest.fn(),
  getRoomById: jest.fn(),
  createRoom: jest.fn(),
  updateRoom: jest.fn(),
  deleteRoom: jest.fn(),
  // any other methods used by routes/controllers can be added here
}));

const museumService = require('../services/museumService');
const app = require('../index');

describe('Museums API', () => {
  const sampleMuseum = {
    museum_id: 1,
    name: 'Museo de Arte Contemporáneo',
    city: 'Sevilla',
    annual_budget: '500000.00',
    is_public: true,
    opening_date: '2010-05-20',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/museums', () => {
    test('Devuelve todos los museos (200)', async () => {
      museumService.getAllMuseums.mockResolvedValue([sampleMuseum]);

      const res = await request(app).get('/api/museums');

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(Array.isArray(res.body.datos)).toBe(true);
      expect(res.body.datos[0].name).toBe(sampleMuseum.name);
      expect(res.body.mensaje).toMatch(/recuperados correctamente/i);
    });
  });

  describe('GET /api/museums/:id', () => {
    test('Recupera un museo existente (200)', async () => {
      museumService.getMuseumById.mockResolvedValue(sampleMuseum);

      const res = await request(app).get('/api/museums/1');

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.datos.name).toBe(sampleMuseum.name);
    });

    test('Muestra 404 si no existe (404)', async () => {
      museumService.getMuseumById.mockResolvedValue(null);

      const res = await request(app).get('/api/museums/999');

      expect(res.status).toBe(404);
      expect(res.body.ok).toBe(false);
      expect(res.body.datos).toBeNull();
      expect(res.body.mensaje).toMatch(/no encontrado/i);
    });
  });

  describe('POST /api/museums', () => {
    test('Crea un museo (201)', async () => {
      const payload = {
        name: sampleMuseum.name,
        city: sampleMuseum.city,
        annual_budget: 500000.0,
        is_public: true,
        opening_date: sampleMuseum.opening_date,
      };

      museumService.createMuseum.mockResolvedValue({ ...payload, museum_id: 2 });

      const res = await request(app).post('/api/museums').send(payload);

      expect(res.status).toBe(201);
      expect(res.body.ok).toBe(true);
      expect(res.body.datos.museum_id).toBeDefined();
      expect(res.body.datos.name).toBe(payload.name);
    });
  });

  describe('PUT /api/museums/:id', () => {
    test('Actualiza un museo existente (200)', async () => {
      museumService.updateMuseum.mockResolvedValue([1]);

      const res = await request(app).put('/api/museums/1').send({ name: 'Nuevo' });

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.mensaje).toMatch(/actualizado correctamente/i);
    });

    test('Actualiza devuelve 404 si no existe (404)', async () => {
      museumService.updateMuseum.mockResolvedValue([0]);

      const res = await request(app).put('/api/museums/999').send({ name: 'Nuevo' });

      expect(res.status).toBe(404);
      expect(res.body.ok).toBe(false);
      expect(res.body.mensaje).toMatch(/no encontrado/i);
    });
  });

  describe('DELETE /api/museums/:id', () => {
    test('Borra un museo existente (204)', async () => {
      museumService.deleteMuseum.mockResolvedValue(1);

      const res = await request(app).delete('/api/museums/1');

      expect(res.status).toBe(204);
      expect(res.body).toEqual({});
    });

    test('Borra devuelve 404 si no existe (404)', async () => {
      museumService.deleteMuseum.mockResolvedValue(0);

      const res = await request(app).delete('/api/museums/999');

      expect(res.status).toBe(404);
      expect(res.body.ok).toBe(false);
      expect(res.body.mensaje).toMatch(/no encontrado/i);
    });
  });

  describe('GET /api/museums/budget', () => {
    test('Parametros obligatorios faltantes (400)', async () => {
      const res = await request(app).get('/api/museums/budget');

      expect(res.status).toBe(400);
      expect(res.body.mensaje).toMatch(/presupuesto mínimo y máximo/i);
    });

    test('Min mayor que max (400)', async () => {
      const res = await request(app).get('/api/museums/budget?min=300&max=200');

      expect(res.status).toBe(400);
      expect(res.body.mensaje).toMatch(/no puede ser mayor/i);
    });

    test('Devuelve museos en rango (200)', async () => {
      museumService.getMuseumsByBudgetRange.mockResolvedValue([sampleMuseum]);

      const res = await request(app).get('/api/museums/budget?min=100&max=600000');

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.datos[0].annual_budget).toBe(sampleMuseum.annual_budget);
    });

    test('No hay museos en rango (404)', async () => {
      museumService.getMuseumsByBudgetRange.mockResolvedValue([]);

      const res = await request(app).get('/api/museums/budget?min=1&max=2');

      expect(res.status).toBe(404);
      expect(res.body.ok).toBe(false);
    });
  });

  describe('GET /api/museums/between', () => {
    test('Faltan parámetros (400)', async () => {
      const res = await request(app).get('/api/museums/between');

      expect(res.status).toBe(400);
      expect(res.body.mensaje).toMatch(/Debe indicar fecha de inicio/i);
    });

    test('Fecha inicio posterior a fin (400)', async () => {
      const res = await request(app).get('/api/museums/between?from=2022-01-01&to=2010-01-01');

      expect(res.status).toBe(400);
      expect(res.body.mensaje).toMatch(/no puede ser posterior/i);
    });

    test('Devuelve museos entre fechas (200)', async () => {
      museumService.getMuseumsBetweenDates.mockResolvedValue([sampleMuseum]);

      const res = await request(app).get('/api/museums/between?from=2000-01-01&to=2025-01-01');

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.datos[0].opening_date).toBe(sampleMuseum.opening_date);
    });

    test('No hay museos en rango de fechas (404)', async () => {
      museumService.getMuseumsBetweenDates.mockResolvedValue([]);

      const res = await request(app).get('/api/museums/between?from=2000-01-01&to=2000-02-01');

      expect(res.status).toBe(404);
      expect(res.body.ok).toBe(false);
    });
  });

  describe('GET /api/museums/graph', () => {
    test('Devuelve datos para gráfico (200)', async () => {
      const graphData = [ { museum_id: 1, total: '2', 'museum.name': 'Nombre' } ];
      museumService.getMuseumsDataGraph.mockResolvedValue(graphData);

      const res = await request(app).get('/api/museums/graph');

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(Array.isArray(res.body.datos)).toBe(true);
      expect(res.body.datos[0].total).toBeDefined();
    });
  });
});

const request = require('supertest');

// Mock services before requiring the app to avoid DB connections/open handles
jest.mock('../services/roomService', () => ({
  getAllRooms: jest.fn(),
  getRoomById: jest.fn(),
  createRoom: jest.fn(),
  updateRoom: jest.fn(),
  deleteRoom: jest.fn(),
  getRoomsByAreaRange: jest.fn(),
}));

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

const roomService = require('../services/roomService');
const app = require('../index');

describe('Rooms API', () => {
  const sampleRoom = {
    room_id: 20,
    name: 'Sala de Arte Contemporáneo',
    capacity: 120,
    area: '350.50',
    is_climatized: true,
    opening_date: '2015-03-10',
    museum_id: 21,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/rooms', () => {
    test('Devuelve todas las salas (200)', async () => {
      roomService.getAllRooms.mockResolvedValue([sampleRoom]);

      const res = await request(app).get('/api/rooms');

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(Array.isArray(res.body.datos)).toBe(true);
      expect(res.body.datos[0].name).toBe(sampleRoom.name);
      expect(res.body.datos[0].capacity).toBe(sampleRoom.capacity);
    });
  });

  describe('GET /api/rooms/:id', () => {
    test('Recupera una sala existente (200) y estructura de datos', async () => {
      roomService.getRoomById.mockResolvedValue(sampleRoom);

      const res = await request(app).get('/api/rooms/20');

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      const r = res.body.datos;
      expect(r.room_id).toBe(sampleRoom.room_id);
      expect(typeof r.capacity).toBe('number');
      expect(parseFloat(r.area)).toBeCloseTo(parseFloat(sampleRoom.area));
      expect(r.is_climatized).toBe(true);
      expect(r.museum_id).toBe(sampleRoom.museum_id);
    });

    test('Devuelve 404 si no existe (404)', async () => {
      roomService.getRoomById.mockResolvedValue(null);

      const res = await request(app).get('/api/rooms/999');

      expect(res.status).toBe(404);
      expect(res.body.ok).toBe(false);
      expect(res.body.datos).toBeNull();
      expect(res.body.mensaje).toMatch(/no encontrada/i);
    });
  });

  describe('POST /api/rooms', () => {
    test('Crea una sala (201) y valida valores', async () => {
      const payload = {
        name: sampleRoom.name,
        capacity: sampleRoom.capacity,
        area: parseFloat(sampleRoom.area),
        is_climatized: sampleRoom.is_climatized,
        opening_date: sampleRoom.opening_date,
        museum_id: sampleRoom.museum_id,
      };

      roomService.createRoom.mockResolvedValue({ ...payload, room_id: 21 });

      const res = await request(app).post('/api/rooms').send(payload);

      expect(res.status).toBe(201);
      expect(res.body.ok).toBe(true);
      expect(res.body.datos.room_id).toBeDefined();
      expect(res.body.datos.capacity).toBe(payload.capacity);
      expect(typeof res.body.datos.is_climatized).toBe('boolean');
    });
  });

  describe('PUT /api/rooms/:id', () => {
    test('Actualiza sala existente (200)', async () => {
      roomService.updateRoom.mockResolvedValue([1]);

      const res = await request(app).put('/api/rooms/20').send({ name: 'Sala Nueva' });

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.mensaje).toMatch(/actualizada correctamente/i);
    });

    test('Actualiza devuelve 404 si no existe (404)', async () => {
      roomService.updateRoom.mockResolvedValue([0]);

      const res = await request(app).put('/api/rooms/999').send({ name: 'Sala Nueva' });

      expect(res.status).toBe(404);
      expect(res.body.ok).toBe(false);
      expect(res.body.mensaje).toMatch(/no encontrada/i);
    });
  });

  describe('DELETE /api/rooms/:id', () => {
    test('Borra una sala existente (204)', async () => {
      roomService.deleteRoom.mockResolvedValue(1);

      const res = await request(app).delete('/api/rooms/20');

      expect(res.status).toBe(204);
      expect(res.body).toEqual({});
    });

    test('Borra devuelve 404 si no existe (404)', async () => {
      roomService.deleteRoom.mockResolvedValue(0);

      const res = await request(app).delete('/api/rooms/999');

      expect(res.status).toBe(404);
      expect(res.body.ok).toBe(false);
      expect(res.body.mensaje).toMatch(/no encontrada/i);
    });
  });

  describe('GET /api/rooms/area', () => {
    test('Faltan parámetros (400)', async () => {
      const res = await request(app).get('/api/rooms/area');

      expect(res.status).toBe(400);
      expect(res.body.mensaje).toMatch(/area mínimo y máximo/i);
    });

    test('Min mayor que max (400)', async () => {
      const res = await request(app).get('/api/rooms/area?min=300&max=200');

      expect(res.status).toBe(400);
      expect(res.body.mensaje).toMatch(/no puede ser mayor/i);
    });

    test('Devuelve salas en rango (200) y comprueba valores', async () => {
      roomService.getRoomsByAreaRange.mockResolvedValue([sampleRoom]);

      const res = await request(app).get('/api/rooms/area?min=200&max=500');

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.datos[0].area).toBe(sampleRoom.area);
      expect(res.body.datos[0].capacity).toBe(sampleRoom.capacity);
    });

    test('No hay salas en rango (404)', async () => {
      roomService.getRoomsByAreaRange.mockResolvedValue([]);

      const res = await request(app).get('/api/rooms/area?min=1&max=2');

      expect(res.status).toBe(404);
      expect(res.body.ok).toBe(false);
    });
  });
});

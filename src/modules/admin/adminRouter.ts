import { Router, Request, Response } from 'express';
import { DB } from '../../models/db';
import { Scheduler } from '../../services/scheduler';
import { SEOManager } from '../../services/seoService';

const router = Router();

// Retrieve full SEO stats
router.get('/stats', (req: Request, res: Response) => {
  try {
    const stats = DB.getSeoPageStats();
    const submissions = DB.getIndexSubmissions();
    res.json({ status: 'success', data: { stats, submissions } });
  } catch (err: any) {
    res.status(500).json({ status: 'error', message: err?.message || err });
  }
});

// Retrieve scheduler cron tasks
router.get('/tasks', (req: Request, res: Response) => {
  try {
    const tasks = DB.getSchedulerTasks();
    res.json({ status: 'success', data: tasks });
  } catch (err: any) {
    res.status(500).json({ status: 'error', message: err?.message || err });
  }
});

// Trigger dynamic job processing
router.post('/trigger-task', async (req: Request, res: Response) => {
  const { taskId } = req.body;
  if (!taskId) {
     res.status(400).json({ status: 'error', message: 'Missing taskId' });
     return;
  }

  try {
    const logs = await Scheduler.executeTask(taskId);
    res.json({ status: 'success', message: `Task ${taskId} executed`, data: { logs } });
  } catch (err: any) {
    res.status(500).json({ status: 'error', message: err?.message || err });
  }
});

// Get articles
router.get('/articles', (req: Request, res: Response) => {
  try {
    res.json({ status: 'success', data: DB.getArticles() });
  } catch (err: any) {
    res.status(500).json({ status: 'error', message: err?.message || err });
  }
});

// Get companies
router.get('/companies', (req: Request, res: Response) => {
  try {
    res.json({ status: 'success', data: DB.getCompanies() });
  } catch (err: any) {
    res.status(500).json({ status: 'error', message: err?.message || err });
  }
});

// Get cities
router.get('/cities', (req: Request, res: Response) => {
  try {
    res.json({ status: 'success', data: DB.getCities() });
  } catch (err: any) {
    res.status(500).json({ status: 'error', message: err?.message || err });
  }
});

// Get industries
router.get('/industries', (req: Request, res: Response) => {
  try {
    res.json({ status: 'success', data: DB.getIndustries() });
  } catch (err: any) {
    res.status(500).json({ status: 'error', message: err?.message || err });
  }
});

// Get products
router.get('/products', (req: Request, res: Response) => {
  try {
    res.json({ status: 'success', data: DB.getProducts() });
  } catch (err: any) {
    res.status(500).json({ status: 'error', message: err?.message || err });
  }
});

export default router;
